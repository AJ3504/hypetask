import React from "react";
import { ContentContainer, FirstMainContainer } from "./FirstMain";
import Profile from "../components/Mypage/Profile";
import MyCalender from "../Components/Mypage/MyCalendar";

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
