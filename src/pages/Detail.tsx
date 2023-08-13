import CommentContainer from "../components/Comment/CommentContainer";
import MyTasksCard from "../components/main/MyTasksCard";
import TimeStampCard from "../components/main/TimeStampCard";

const Detail = () => {
  console.log(new Date().toISOString()); //9시간
  return (
    <>
      <div style={{ display: "flex" }}>
        <TimeStampCard />

        <MyTasksCard myId="2d99d192-6ec8-4404-bc60-c0b680f45757" />
        <CommentContainer />
      </div>
    </>
  );
};
export default Detail;
