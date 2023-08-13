import { useModalStore } from "../../zustand/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";

import { useCurrentUserStore } from "../../zustand/useCurrentUserStore";
import Header from "./Header";
import TimeStampCard from "./TimeStampCard";
import MyTasksCard from "./MyTasksCard";
import OtherTasksCard from "./OtherTasksCard";
import S from "./mainStyles";

const DailyCalender = () => {
  const { addTaskModalVisible } = useModalStore();
  const { currentUserId, currentUserFollowers } = useCurrentUserStore();

  return (
    <>
      {addTaskModalVisible ? (
        <AddTaskModal todayDefault={true} myId={currentUserId!} />
      ) : null}
      <Header />
      <S.Container>
        <S.CalenderContainer>
          <TimeStampCard />
          <MyTasksCard myId={currentUserId!} />
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
