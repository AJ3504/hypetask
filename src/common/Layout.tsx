import React from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
