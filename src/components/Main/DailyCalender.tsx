import { useModalStore } from "../../zustand/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import Header from "./Header";
import TimeStampCard from "./TimeStampCard";
import MyTasksCard from "./MyTasksCard";
import OtherTasksCard from "./OtherTasksCard";
import { useCurrentStore } from "../../zustand/useCurrentStore";
import S from "./MainStyles";
import { useUserStore } from "../../zustand/useUserStore";

const DailyCalender = () => {
  const { user_id } = useUserStore();
  const { addTaskModalVisible } = useModalStore();
  const { currentUserFollowers } = useCurrentStore();

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
