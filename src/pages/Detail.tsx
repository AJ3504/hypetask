import CommentContainer from "../components/Comment/CommentContainer";
import MyTasksCard from "../components/Main/MyTasksCard";
import TimeStampCard from "../components/Main/TimeStampCard";
import { useCurrentStore } from "../zustand/useCurrentStore";
const Detail = () => {
  const { currentDetailId } = useCurrentStore();

  return (
    <>
      <div style={{ display: "flex" }}>
        <TimeStampCard />
        <MyTasksCard myId={currentDetailId as string} />
        <CommentContainer />
      </div>
    </>
  );
};
export default Detail;
