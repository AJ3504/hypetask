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
            path="/detail"
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
          {/* <Route
            path="chat"
            element={accessToken ? <Chat /> : <Navigate to="/first-main" />}
          /> */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
