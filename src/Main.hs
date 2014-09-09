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
import Control.Monad
import System.IO.Temp

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

simpleWSServerApp :: WS.ServerApp
simpleWSServerApp pdconn = do
  putStrLn "Websocket Request received"
  conn <- WS.acceptRequest pdconn
  withSystemTempDirectory "ais" $ \dir -> do
    let cmd = "agda --interactive -i" ++ dir ++" -i/usr/share/agda-stdlib"
    handles@(hin, hout, _herr, _ph) <- runInteractiveCommand cmd
    _ <- readOutput hout ""
    hSetBuffering hin  NoBuffering
    hSetBuffering hout NoBuffering
    let src = dir ++ "/Main.agda"
    writeFile src "module Main where"
    hPutStrLn hin $ ":load " <> src
    _ <- readOutput hout ""
    wsMessageLoop conn handles src

readOutput :: Handle -> BS.ByteString -> IO (Maybe BS.ByteString)
readOutput h x = do
  eof <- hIsEOF h
  if eof
    then return Nothing
    else do
      line <- BS.hGetNonBlocking h 1024
      BS.putStr line
      let x' = x <> line
      if BS.isSuffixOf "Main> " x' then return $ Just x' else readOutput h x'

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

wsMessageLoop :: WS.Connection -> (Handle, Handle, Handle, ProcessHandle) -> FilePath -> IO ()
wsMessageLoop conn handles@(hin, hout, herr, ph) src = do
  msgData <- WS.receiveData conn
  print msgData
  case JSON.decode msgData of
    Nothing  -> putStrLn "ERROR"
    Just msg -> case messageType msg of
                  "source"  -> do
                    putStrLn "source"
                    T.writeFile src $ messageBody msg
                    T.hPutStrLn hin $ ":reload"
                    _ <- readOutput hout ""
                    wsMessageLoop conn handles src
                  "command" -> do
                    putStrLn "command"
                    T.hPutStrLn hin $ messageBody msg
                    mline <- readOutput hout ""
                    case mline of
                      Nothing -> do
                        mapM_ hClose [hin, hout, herr]
                        _ <- waitForProcess ph
                        return ()
                      Just line -> do
                        WS.sendTextData conn $ T.decodeUtf8 line
                        wsMessageLoop conn handles src
                  _ -> putStrLn "ERROR"
