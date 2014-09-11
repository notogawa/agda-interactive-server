{-# LANGUAGE OverloadedStrings #-}
module Main where

import qualified Network.Wai as Wai
import qualified Network.Wai.Handler.Warp as Warp
import qualified Network.Wai.Handler.WebSockets as WaiWS
import qualified Network.WebSockets as WS
import qualified Network.HTTP.Types.Status as Status
import System.IO
import System.Process
import qualified Data.ByteString as BS
import qualified Data.Text as T
import qualified Data.Text.IO as T
import qualified Data.Text.Encoding as T
import Data.Monoid
import qualified Data.Aeson as JSON
import Control.Applicative
import Control.Concurrent
import Control.Monad
import Control.Monad.State
import System.IO.Temp

import qualified Agda.TypeChecking.Monad as Agda
import qualified Agda.Interaction.Response as Agda
import qualified Agda.Interaction.InteractionTop as Agda
import qualified Agda.Interaction.Highlighting.Precise as Agda

instance JSON.ToJSON Agda.CompressedFile where


top :: WS.Connection -> String -> Agda.TCM ()
top conn dir = do
  Agda.setInteractionOutputCallback $ response conn
  _ <- dispatch conn dir `runStateT` Agda.initCommandState
  return ()

dispatch :: WS.Connection -> String -> Agda.CommandM ()
dispatch conn dir = liftIO (WS.receiveData conn) >>= dispatch' . JSON.decode where
    src = dir ++ "/Main.agda"
    run = Agda.runInteraction . Agda.IOTCM src Agda.NonInteractive Agda.Indirect
    dispatch' Nothing = error ""
    dispatch' (Just msg) =
        case messageType msg of
          "source"  -> do
            liftIO $ T.writeFile src $ messageBody msg
            run (Agda.Cmd_load src [dir, "/usr/share/agda-stdlib"])
            dispatch conn dir
          "command" -> do
            run (Agda.Cmd_metas)
            dispatch conn dir
          _ -> error ""

response :: WS.Connection -> Agda.Response -> Agda.TCM ()
response _conn (Agda.Resp_HighlightingInfo highlightingInfo moduleToSource) = liftIO $ print ("Resp_HighlightingInfo", highlightingInfo, moduleToSource)
response _conn (Agda.Resp_Status status) = liftIO $ print (Agda.sShowImplicitArguments status, Agda.sChecked status)
response _conn (Agda.Resp_JumpToError filePath n) = liftIO $ print (filePath, n)
response _conn (Agda.Resp_InteractionPoints interactionIds) = liftIO $ print interactionIds
response _conn (Agda.Resp_GiveAction interactionId giveResult) = liftIO $ putStrLn "Resp_GiveAction"
response _conn (Agda.Resp_MakeCase makeCaseVariant ss) = liftIO $ putStrLn "Resp_MakeCase"
response _conn (Agda.Resp_SolveAll interactionIdAndExprs) = liftIO $ print interactionIdAndExprs
response  conn (Agda.Resp_DisplayInfo displayInfo) = liftIO $ WS.sendTextData conn $ T.pack $ toMsg displayInfo where
    toMsg (Agda.Info_CompilationOk) = "Info_CompilationOk"
    toMsg (Agda.Info_Constraints constraints) = constraints
    toMsg (Agda.Info_AllGoals allGoals) = allGoals
    toMsg (Agda.Info_Error e) = e -- When an error message is displayed this constructor should be used, if appropriate.
    toMsg (Agda.Info_Intro doc) = show doc -- Info_Intro denotes two different types of errors TODO: split these into separate constructors
    toMsg (Agda.Info_Auto auto) = auto -- Info_Auto denotes either an error or a success (when Resp_GiveAction is present) TODO: split these into separate constructors
    toMsg (Agda.Info_ModuleContents doc) = show doc
    toMsg (Agda.Info_WhyInScope doc) = show doc
    toMsg (Agda.Info_NormalForm doc) = show doc
    toMsg (Agda.Info_GoalType doc) = show doc
    toMsg (Agda.Info_CurrentGoal doc) = show doc
    toMsg (Agda.Info_InferredType doc) = show doc
    toMsg (Agda.Info_Context doc) = show doc
    toMsg (Agda.Info_HelperFunction doc) = show doc
response  conn (Agda.Resp_RunningInfo _debugLebel message) = liftIO $ WS.sendTextData conn $ T.pack message
response _conn (Agda.Resp_ClearRunningInfo) = return ()
response _conn (Agda.Resp_ClearHighlighting) = return ()

main :: IO ()
main = do
  let port = 3000
  let setting = Warp.setPort port Warp.defaultSettings
  putStrLn $ "start server port=" ++ show port
  Warp.runSettings setting simpleWSWaiApp

simpleWSWaiApp :: Wai.Application
simpleWSWaiApp = WaiWS.websocketsOr WS.defaultConnectionOptions simpleWSServerApp simpleWaiApp

simpleWaiApp :: Wai.Application
simpleWaiApp req respond = do
  case Wai.pathInfo $ req of
    ["agda.js"] -> respond $ Wai.responseFile Status.status200 [] "agda.js" Nothing
    _           -> respond $ Wai.responseFile Status.status200 [] "index.html" Nothing

spawnPingThread :: WS.Connection -> Int -> IO ThreadId
spawnPingThread conn interval =
    forkIO $ forever $ do
      threadDelay $ 1000 * 1000 * interval
      WS.sendPing conn ("" :: BS.ByteString)

runAgda :: FilePath -> IO (Handle, Handle, Handle, ProcessHandle)
runAgda dir = do
  let cmd = "agda --interactive -i" ++ dir ++" -i/usr/share/agda-stdlib"
  handles@(hin, hout, _herr, _ph) <- runInteractiveCommand cmd
  _ <- readOutput hout ""
  hSetBuffering hin  NoBuffering
  hSetBuffering hout NoBuffering
  return handles

simpleWSServerApp :: WS.ServerApp
simpleWSServerApp pdconn = do
  putStrLn "Websocket Request received"
  conn <- WS.acceptRequest pdconn
  _ <- spawnPingThread conn 10
  withSystemTempDirectory "ais" $ \dir -> do
    _ <- Agda.runTCMTop $ top conn dir
    return ()
    -- handles <- runAgda dir
    -- wsMessageLoop conn handles dir

readOutput :: Handle -> BS.ByteString -> IO (Maybe BS.ByteString)
readOutput h x = do
  eof <- hIsEOF h
  if eof
    then return Nothing
    else do
      line <- BS.hGetNonBlocking h 1024
      BS.putStr line
      let x' = x <> line
      if BS.isSuffixOf "Main> " x' then return $ Just $ BS.take (BS.length x' - 6) x' else readOutput h x'

data Message =
    Message
    { messageType :: T.Text
    , messageBody :: T.Text
    } deriving (Eq, Show)

instance JSON.FromJSON Message where
    parseJSON (JSON.Object v) =
        Message
        <$> v JSON..: "type"
        <*> v JSON..: "body"
    parseJSON _ = mzero

sendCommand :: (Handle, Handle, Handle, ProcessHandle) -> T.Text -> IO (Maybe BS.ByteString)
sendCommand (hin, hout, _herr, _ph) command = do
  T.putStrLn command
  T.hPutStrLn hin command
  readOutput hout ""

quit :: (Handle, Handle, Handle, ProcessHandle) -> IO ()
quit (hin, hout, herr, ph) = do
  mapM_ hClose [hin, hout, herr]
  _ <- waitForProcess ph
  return ()

wsMessageLoop :: WS.Connection -> (Handle, Handle, Handle, ProcessHandle) -> FilePath -> IO ()
wsMessageLoop conn hs dir = go where
    src = dir ++ "/Main.agda"
    go = do
      msgData <- WS.receiveData conn
      case JSON.decode msgData of
        Nothing  -> putStrLn "ERROR"
        Just msg -> case messageType msg of
                      "source"  -> do
                        T.writeFile src $ messageBody msg
                        quit hs
                        handles <- runAgda dir
                        mline <- sendCommand handles $ T.pack $ ":load " ++ src
                        case mline of
                          Nothing -> quit hs
                          Just line -> do
                            WS.sendTextData conn $ T.decodeUtf8 line
                            wsMessageLoop conn handles dir
                      "command" -> do
                        mline <- sendCommand hs $ messageBody msg
                        case mline of
                          Nothing -> quit hs
                          Just line -> do
                            WS.sendTextData conn $ T.decodeUtf8 line
                            go
                      _ -> putStrLn "ERROR"
