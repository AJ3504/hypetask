import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import Layout from "../common/Layout";
import Main from "../pages/Main";
import Detail from "../pages/Detail";
import Mypage from "../pages/Mypage";
import Register from "../pages/Register";
import FirstMain from "../pages/FirstMain";
import FindPassword from "../pages/FindPassword";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="first-main" element={<FirstMain />} />
          <Route path="/" element={<Main />} />
          <Route path="register" element={<Register />} />
          <Route path="findpassword" element={<FindPassword />} />

          <Route path="detail/:id" element={<Detail />} />
          <Route path="my-page/:id" element={<Mypage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
