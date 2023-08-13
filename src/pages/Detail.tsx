import React from "react";
import CommentContainer from "../components/Comment/CommentContainer";
import MyTasksCard from "../components/Main/MyTasksCard";
import TimeStampCard from "../components/Main/TimeStampCard";
import { useUserStore } from "../config/useUserStore";
import { today } from "../consts/consts";
const Detail = () => {
  const { user_id } = useUserStore((state) => state);
  return (
    <>
      <div style={{ display: "flex" }}>
        <TimeStampCard />
        {user_id ? (
          <MyTasksCard myId={user_id} today={today} />
        ) : (
          <>로그인하세요</>
        )}

        <CommentContainer />
      </div>
    </>
  );
};
export default Detail;
