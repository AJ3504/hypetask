import React from "react";
import CommentContainer from "../components/Comment/CommentContainer";
import MyTasksCard from "../components/Main/MyTasksCard";
import TimeStampCard from "../components/Main/TimeStampCard";
import { Space } from "antd";
const Detail = () => {
  console.log(new Date().toISOString()); //9시간
  return (
    <>
      <div style={{ display: "flex" }}>
        <TimeStampCard />

        <MyTasksCard
          myId="2d99d192-6ec8-4404-bc60-c0b680f45757"
          today={new Date().toISOString().slice(0, 10)}
        />
        <CommentContainer />
      </div>
    </>
  );
};
export default Detail;
