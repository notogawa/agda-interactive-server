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

main :: IO ()
main = do
  let port = 3000 -- とりあえずポート3000番で。
  let setting = Warp.setPort port Warp.defaultSettings
  putStrLn $ "start server port=" ++ show port
  Warp.runSettings setting simpleWSWaiApp

simpleWSWaiApp :: Wai.Application
simpleWSWaiApp = WaiWS.websocketsOr WS.defaultConnectionOptions simpleWSServerApp simpleWaiApp

simpleWaiApp :: Wai.Application
simpleWaiApp req respond = do
  putStrLn . show . Wai.pathInfo $ req -- とりあえずリクエストのパスとか表示してみる。
  respond $ Wai.responseFile Status.status200 [] "index.html" Nothing

-- websocketのリクエストを処理するアプリケーション
simpleWSServerApp :: WS.ServerApp
simpleWSServerApp pdconn = do
  putStrLn "Websocket Request received"
  -- ここで、websocketのリクエストをpathなどに応じてacceptRequestするか、
  -- rejectRequestするかなどを判断・処理する。
  -- リクエストの情報はpendingRequestを使用してpdconnから取得できる。
  -- TODO: agda --interactive
  conn <- WS.acceptRequest pdconn
  handles@(hin, hout, _herr, _ph) <- runInteractiveCommand "agda --interactive -i. -i/usr/share/agda-stdlib"
  _ <- readOutput hout ""
  hSetBuffering hin NoBuffering
  hSetBuffering hout NoBuffering
  -- リクエストをacceptしたらメッセージループに入る。
  -- リクエスト内容に応じて異なるメッセージループを使い分けることもできる。
  -- また、接続直後のメッセージのみ特別な処理をしたり、
  -- 接続直後に一方的にメッセージを送り付けるような処理をしたりする場合は、
  -- メッセージループに入る前に処理してしまうことも可能。
  wsMessageLoop conn handles

readOutput :: Handle -> BS.ByteString -> IO (Maybe BS.ByteString)
readOutput h x = do
  eof <- hIsEOF h
  if eof
    then return Nothing
    else do
      line <- BS.hGetNonBlocking h 1024
      BS.putStr line
      let x' = x <> line
      if BS.isSuffixOf "\nMain> " x' then return $ Just x' else readOutput h x'

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

wsMessageLoop :: WS.Connection -> (Handle, Handle, Handle, ProcessHandle) -> IO ()
wsMessageLoop conn handles@(hin, hout, herr, ph) = do
  msgData <- WS.receiveData conn
  print msgData
  case JSON.decode msgData of
    Nothing  -> putStrLn "ERROR"
    Just msg -> case messageType msg of
                  "source"  -> putStrLn "source"
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
                        wsMessageLoop conn handles
                  _ -> putStrLn "ERROR"
