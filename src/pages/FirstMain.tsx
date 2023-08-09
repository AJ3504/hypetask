import React from "react";
import Login from "../components/Authentication/Login";
import Introduce from "../components/Authentication/Introduce";

const FirstMain: React.FC = () => {
  return (
    <div>
      <Introduce />
      <Login />
    </div>
  );
};

export default FirstMain;
