import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { IntroduceContainer } from "./Introduce";
import { styled } from "styled-components";
import BarChart from "./AchievementChart";

const Profile: React.FC = () => {
  const achievementData = [
    { item: "초심자", achievement: 10 },
    { item: "노력왕", achievement: 30 },
    { item: "도전왕", achievement: 50 },
    { item: "희망왕", achievement: 70 },
    { item: "열정왕", achievement: 90 },

    { item: "완벽왕", achievement: 100 },
  ];
  return (
    <MyProfileContainer>
      마이 페이지
      <div className="myProfile">
        <div>사용자 이름 님</div>

        <div>사용자 정보 불러오는 중...</div>
      </div>
      <div className="followInfo">팔로잉: 팔로워:</div>
      <div className="achievementRate">목표 달성률</div>
      <BarChart achievementData={achievementData} />
    </MyProfileContainer>
  );
};

export default Profile;
const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  border-radius: 20px;
  height: 600px;
  width: 300px;
`;
