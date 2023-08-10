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
import { useUserStore } from "../components/Authentication/Login";

const Router = () => {
  const accessToken = useUserStore((state) => state.accessToken);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/first-main" element={<FirstMain />} />
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/my-page/:id" element={<Mypage />} />
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
