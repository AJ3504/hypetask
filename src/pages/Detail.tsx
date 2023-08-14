import CommentContainer from "../components/Comment/CommentContainer";
import MyTasksCard from "../components/Main/MyTasksCard";
import TimeStampCard from "../components/Main/TimeStampCard";
import { useCurrentStore } from "../zustand/useCurrentStore";
import { useUserStore } from "../zustand/useUserStore";
const Detail = () => {
  const { user_id } = useUserStore((state) => state);
  const { currentDetailId, setCurrentDetailId } = useCurrentStore();

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
