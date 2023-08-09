import React from "react";
import Profile from "../Components/Profile";
import MyCalender from "../Components/MyCalender";
import { ContentContainer, FirstMainContainer } from "./FirstMain";

const MyPage: React.FC = () => {
  return (
    <FirstMainContainer>
      <ContentContainer>
        <Profile />
        <MyCalender />
      </ContentContainer>
    </FirstMainContainer>
  );
};

export default MyPage;
