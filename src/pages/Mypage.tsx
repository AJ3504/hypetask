import React from "react";
import { useState } from "react";
import Profile from "../Components/Profile";
import Calender from "../Components/Calender";
const MyPage: React.FC = () => {
  return (
    <div>
      <Profile />
      <Calender />
    </div>
  );
};

export default MyPage;
