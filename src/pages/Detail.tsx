import CommentContainer from "../Components/Comment/CommentContainer";
import MyTasksCard from "../Components/Main/MyTasksCard";
import TimeStampCard from "../Components/Main/TimeStampCard";
import { useUserStore } from "../config/useUserStore";
const Detail = () => {
  const { user_id } = useUserStore((state) => state);
  return (
    <>
      <div style={{ display: "flex" }}>
        <TimeStampCard />
        <MyTasksCard myId={user_id as string} />
        <CommentContainer />
      </div>
    </>
  );
};
export default Detail;
