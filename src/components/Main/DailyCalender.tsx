import { useModalStore } from "../../zustand/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import { useUserStore } from "../../config/useUserStore";
import Header from "./Header";
import TimeStampCard from "./TimeStampCard";
import MyTasksCard from "./MyTasksCard";
import OtherTasksCard from "./OtherTasksCard";
import { useCurrentFollowerStore } from "../../zustand/useCurrentFollowerStore";
import S from "./MainStyles";

const DailyCalender = () => {
  const { user_id } = useUserStore();
  const { addTaskModalVisible } = useModalStore();
  const { currentUserFollowers } = useCurrentFollowerStore();

  return (
    <>
      {addTaskModalVisible ? (
        <AddTaskModal todayDefault={true} myId={user_id!} />
      ) : null}
      <Header />
      <S.Container>
        <S.CalenderContainer>
          <TimeStampCard />
          <MyTasksCard myId={user_id!} />
        </S.CalenderContainer>
        <S.FollowersCalenderContainer>
          {currentUserFollowers &&
            currentUserFollowers.map(() => {
              return <OtherTasksCard userIds={currentUserFollowers} />;
            })}
        </S.FollowersCalenderContainer>
      </S.Container>
    </>
  );
};

export default DailyCalender;
