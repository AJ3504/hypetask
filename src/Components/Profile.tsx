import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { IntroduceContainer } from "./Introduce";
import { styled } from "styled-components";

const Profile: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const session = await supabase.auth.signInWithOAuth();
        if (session) {
          const { data, error } = await supabase
            .from("users")
            .select("name")
            .eq("user_id", session)
            .single();

          if (error) {
            console.error("Error fetching user name:", error);
          } else {
            setUserName(data.name);
          }
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <MyProfileContainer>
      마이 페이지
      <div className="myProfile">
        {userName ? (
          <div>{userName}님</div>
        ) : (
          <div>사용자 정보 불러오는 중...</div>
        )}
      </div>
      <div className="followInfo">팔로잉: 팔로워:</div>
      <div className="achievementRate">목표 달성률</div>
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
