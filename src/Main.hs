{-# LANGUAGE OverloadedStrings #-}
module Main where

import qualified Network.Wai as Wai
import qualified Network.Wai.Handler.Warp as Warp
import qualified Network.Wai.Handler.WebSockets as WaiWS
import qualified Network.WebSockets as WS
import qualified Network.HTTP.Types.Status as Status
import qualified Network.HTTP.Types.Header as Header
import qualified Data.ByteString as BS
import qualified Data.ByteString.Char8 as BS8
import qualified Data.ByteString.Lazy as LBS
import qualified Data.Text as T
import qualified Data.Text.IO as T
import qualified Data.Text.Encoding as T
import qualified Data.Aeson as JSON
import Data.Monoid ( (<>) )
import Control.Applicative
import Control.Concurrent
import Control.Monad
import Control.Monad.State
import System.IO.Temp
import System.Directory

import qualified Agda.TypeChecking.Monad as Agda
import qualified Agda.Interaction.Response as Agda
import qualified Agda.Interaction.InteractionTop as Agda
import qualified Agda.Interaction.Highlighting.Precise as Highlight
import qualified Agda.Interaction.Highlighting.Range as Highlight
import qualified Agda.Syntax.Common as Agda
import qualified Agda.Syntax.Position as Agda

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
        case msg of
          MessageLoad source -> do
            liftIO $ do
              let newsrc = src ++ ".new"
              T.writeFile newsrc source
              copyFile newsrc src
            run (Agda.Cmd_load src [dir, "/usr/share/agda-stdlib"])
            dispatch conn dir
          MessageMetas -> do
            run (Agda.Cmd_metas)
            dispatch conn dir
          MessageSolveAll -> do
            run (Agda.Cmd_solveAll)
            dispatch conn dir
          MessageContext iid range expr -> do
            run (Agda.Cmd_goal_type_context (read "AsIs") iid range expr)
            dispatch conn dir
          MessageGive iid range expr -> do
            run (Agda.Cmd_give iid range expr)
            dispatch conn dir
          MessageRefine iid range expr -> do
            run (Agda.Cmd_refine iid range expr)
            dispatch conn dir
          MessageCase iid range expr -> do
            run (Agda.Cmd_make_case iid range expr)
            dispatch conn dir

response :: WS.Connection -> Agda.Response -> Agda.TCM ()
response  conn (Agda.Resp_HighlightingInfo highlightingInfo _moduleToSource) = liftIO $ WS.sendTextData conn $ T.decodeUtf8 $ LBS.toStrict $ JSON.encode res where
    res = JSON.object
      [ "type" JSON..= ("highlight" :: String)
      , "contents" JSON..=
        [ JSON.object
          [ "range" JSON..=
            JSON.object
            [ "from" JSON..= Highlight.from range
            , "to" JSON..= Highlight.to range
            ]
          , "meta" JSON..=
            JSON.object
            [ "aspect" JSON..= fromAspect (Highlight.aspect meta)
            , "otherAspects" JSON..= map show (Highlight.otherAspects meta)
            ]
          ]
        | (range, meta) <- Highlight.ranges highlightingInfo
        ]
      ]
    fromAspect :: Maybe Highlight.Aspect -> Maybe String
    fromAspect (Just (Highlight.Name nameKind _)) = fromNameKind nameKind
    fromAspect x = fmap show x
    fromNameKind :: Maybe Highlight.NameKind -> Maybe String
    fromNameKind (Just (Highlight.Constructor Agda.Inductive)) = Just "InductiveConstructor"
    fromNameKind (Just (Highlight.Constructor Agda.CoInductive)) = Just "CoinductiveConstructor"
    fromNameKind x = fmap show x

response _conn (Agda.Resp_Status _status) = return () -- liftIO $ print (Agda.sShowImplicitArguments status, Agda.sChecked status)
response _conn (Agda.Resp_JumpToError _filePath _n) = return () -- liftIO $ print (filePath, n)
response  conn (Agda.Resp_InteractionPoints interactionIds) = liftIO $ WS.sendTextData conn $ T.decodeUtf8 $ LBS.toStrict $ JSON.encode res where
    res = JSON.object
          [ "type" JSON..= ("metas" :: String)
          , "contents" JSON..=
            JSON.object
            [ "metas" JSON..= map fromEnum interactionIds
            ]
          ]
response  conn (Agda.Resp_GiveAction interactionId giveResult) = liftIO $ WS.sendTextData conn $ T.decodeUtf8 $ LBS.toStrict $ JSON.encode res where
    res = JSON.object
          [ "type" JSON..= ("give" :: String)
          , "contents" JSON..=
            JSON.object
            [ "meta" JSON..= fromEnum interactionId
            , "result" JSON..= case giveResult of
                                 Agda.Give_String str -> str
                                 Agda.Give_Paren      -> "Give_Paren"   -- TODO: fix
                                 Agda.Give_NoParen    -> "Give_NoParen" -- TODO: fix
            ]
          ]
response  conn (Agda.Resp_MakeCase _makeCaseVariant ss) = liftIO $ WS.sendTextData conn $ T.decodeUtf8 $ LBS.toStrict $ JSON.encode res where
    res = JSON.object
          [ "type" JSON..= ("case" :: String)
          , "contents" JSON..=
            JSON.object
            [ "meta" JSON..= ("" :: String)
            , "result" JSON..= ss
            ]
          ]
response _conn (Agda.Resp_SolveAll _interactionIdAndExprs) = return () -- liftIO $ print interactionIdAndExprs
response  conn (Agda.Resp_DisplayInfo displayInfo) = liftIO $ WS.sendTextData conn $ T.decodeUtf8 $ LBS.toStrict $ JSON.encode res where
    res = JSON.object
          [ "type" JSON..= ("displayInfo" :: String)
          , "contents" JSON..=
            JSON.object
            [ "information" JSON..= toMsg displayInfo
            ]
          ]
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
response  conn (Agda.Resp_RunningInfo debugLebel message) = liftIO $ WS.sendTextData conn $ T.decodeUtf8 $ LBS.toStrict $ JSON.encode res where
    res = JSON.object
          [ "type" JSON..= ("runningInfo" :: String)
          , "contents" JSON..=
            JSON.object
            [ "information" JSON..= message
            , "debugLevel" JSON..= debugLebel
            ]
          ]
response _conn (Agda.Resp_ClearRunningInfo) = return ()
response _conn (Agda.Resp_ClearHighlighting) = return ()

main :: IO ()
main = do
  let port = 3000
  let setting = Warp.setPort port Warp.defaultSettings
  let app = WaiWS.websocketsOr WS.defaultConnectionOptions appWebSocketAgda appStaticFiles
  Warp.runSettings setting app

appStaticFiles :: Wai.Application
appStaticFiles req respond =
    case Wai.pathInfo $ req of
      []   -> resFile "text/html" "public/index.html"
      path -> resFile (ct $ last path) (BS8.unpack $ "public" <> Wai.rawPathInfo req)
    where
      resFile contentType path = respond $ Wai.responseFile Status.status200 [(Header.hContentType, contentType)] path Nothing
      ct f | ".js" `T.isSuffixOf` f  = "application/javascript"
           | ".css" `T.isSuffixOf` f = "text/css"
           | ".png" `T.isSuffixOf` f = "image/png"
           | otherwise               = "text/html"

spawnPingThread :: WS.Connection -> Int -> IO ThreadId
spawnPingThread conn interval =
    forkIO $ forever $ do
      threadDelay $ 1000 * 1000 * interval
      WS.sendPing conn ("" :: BS.ByteString)

appWebSocketAgda :: WS.ServerApp
appWebSocketAgda req = do
  conn <- WS.acceptRequest req
  withSystemTempDirectory "ais" $ \dir -> do
    _ <- spawnPingThread conn 10
    _ <- Agda.runTCMTop $ top conn dir
    return ()

data Message = MessageLoad T.Text
             | MessageMetas
             | MessageSolveAll
             | MessageContext Agda.InteractionId Agda.Range String
             | MessageGive Agda.InteractionId Agda.Range String
             | MessageRefine Agda.InteractionId Agda.Range String
             | MessageCase Agda.InteractionId Agda.Range String
               deriving (Eq, Show)

instance JSON.FromJSON Message where
    parseJSON (JSON.Object v) = do
      t <- v JSON..: "type"
      case t :: T.Text of
        "load" -> MessageLoad
                  <$> (v JSON..: "contents" >>= (JSON..: "source"))
        "metas" -> return MessageMetas
        "solveAll" -> return MessageSolveAll
        "context" -> MessageContext
                     <$> fmap toEnum (v JSON..: "contents" >>= (JSON..: "meta"))
                     <*> return Agda.noRange
                     <*> (v JSON..: "contents" >>= (JSON..: "expr"))
        "give" -> MessageGive
                  <$> fmap toEnum (v JSON..: "contents" >>= (JSON..: "meta"))
                  <*> return Agda.noRange
                  <*> (v JSON..: "contents" >>= (JSON..: "expr"))
        "refine" -> MessageRefine
                    <$> fmap toEnum (v JSON..: "contents" >>= (JSON..: "meta"))
                    <*> return Agda.noRange
                    <*> (v JSON..: "contents" >>= (JSON..: "expr"))
        "case" -> MessageCase
                  <$> fmap toEnum (v JSON..: "contents" >>= (JSON..: "meta"))
                  <*> return Agda.noRange
                  <*> (v JSON..: "contents" >>= (JSON..: "expr"))
        _ -> mzero
    parseJSON _ = mzero
