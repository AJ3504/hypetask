import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../common/Layout";
import Main from "../pages/Main";
import Detail from "../pages/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:postId" element={<Detail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
