import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Followers, getCurrentUser, getFollowers } from "../../api/users";
import { useModalStore } from "../../config/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import MytasksCard from "./MyTasksCard";
import TimeStampCard from "./TimeStampCard";
import { useUserStore } from "../../config/useUserStore";
import { today } from "../../consts/consts";
import FollowerTasksCard from "./OtherTasksCard";
import Header from "./Header";

const DailyCalender = () => {
  const { user_id } = useUserStore();

  const { data: followers } = useQuery(
    ["followers"],
    async () => {
      const followersData = await getFollowers(user_id!);
      return followersData;
    },
    {
      select: (followers: Followers[] | null) =>
        followers?.map((follower: Followers) => follower.to),
    }
  );

  const { addTaskModalVisible } = useModalStore();

  return (
    <>
      {addTaskModalVisible ? (
        <AddTaskModal todayDefault={true} myId={user_id!} />
      ) : null}
      <Header />
      <S.Container>
        <S.CalenderContainer>
          <TimeStampCard />
          <MytasksCard today={today} myId={user_id!} />
        </S.CalenderContainer>
        <S.FollowersCalenderContainer>
          {followers &&
            followers.map((follower: string) => {
              return <FollowerTasksCard userIds={followers} today={today} />;
            })}
        </S.FollowersCalenderContainer>
      </S.Container>
    </>
  );
};

export default DailyCalender;

interface styleProps {
  height?: number;
  top?: number;
}

const S = {
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background-color: #262286;
    height: 55px;
    width: 100%;
    z-index: 2;
    padding-right: 10px;
    padding-left: 20px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: row;
  `,
  CalenderContainer: styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin-top: 100px;
  `,
  TaskContainer: styled.div`
    background-color: beige;
    min-width: 400px;
    position: relative;
    margin: 0 10px;
  `,
  FollowersCalenderContainer: styled.div`
    display: flex;
    flex-direction: row;
    background-color: azure;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 10px;
    margin-top: 100px;
  `,
  TaskBox: styled.div<styleProps>`
    height: ${(props) => props.height}px;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;

    position: absolute;
    top: ${(props) => props.top}px;
  `,
  Task: styled.div`
    background-color: red;
    height: 100%;
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};
