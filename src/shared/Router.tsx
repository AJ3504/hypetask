import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import Layout from "../common/Layout";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import ResetPassword from "../pages/ResetPassword";
import FindPassword from "../pages/FindPassword";
import FirstMain from "../pages/FirstMain";
import PrivateRoute from "./PrivateRouter";
import ChatRoom from "../components/Chat/ChatRoom";
import OpenChatList from "../components/Chat/OpenChatList";
import MyChatList from "../components/Chat/MyChatList";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/first-main" element={<FirstMain />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route
            path="/detail/:id"
            element={
              <PrivateRoute>
                <Detail />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-page/:id"
            element={
              <PrivateRoute>
                <Mypage />
              </PrivateRoute>
            }
          />
          <Route path="/chat/*" element={<Chat />} />
          {/* 다음의 경로들에 대해서 OpenChatList와 MyChatList로 연결 */}
          <Route path="/chat/openChat" element={<OpenChatList />} />
          <Route path="/chat/myChat" element={<MyChatList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
