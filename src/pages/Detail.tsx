
import CommentContainer from "../components/Comment/CommentContainer";
import MyTasksCard from "../components/Main/MyTasksCard";
import TimeStampCard from "../components/Main/TimeStampCard";

import { useUserStore } from "../zustand/useUserStore";
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
