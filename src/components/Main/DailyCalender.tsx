import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Followers, getCurrentUser, getFollowers } from "../../api/users";
import { useModalStore } from "../../config/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import MytasksCard from "./MyTasksCard";
import TimeStampCard from "./TimeStampCard";

import { useCurrentUserStore } from "../../config/useCurrentUserStore"
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import FollowerTasksCard from "./OtherTasksCard";
import Header from "./Header"

const DailyCalender = () => {
  const today = new Date().toISOString().slice(0, 10);
  const { setCurrentUserId } = useCurrentUserStore();

  const { data: currentUser } = useQuery(["currentUser"], async () => {
    const currentUserData = await getCurrentUser();
    setCurrentUserId(currentUserData as string);
    return currentUserData;
  });

  const { data: followers } = useQuery(
    ["followers"],
    async () => {
      const followersData = await getFollowers(currentUser!);
      return followersData;
    },
    {
      select: (followers: Followers[] | null) =>
        followers?.map((follower: Followers) => follower.to),
    }
  );

  console.log(followers);

  const { addTaskModalVisible } = useModalStore();

  return (
    <>
      {addTaskModalVisible ? (
        <AddTaskModal todayDefault={true} myId={currentUser!} />
      ) : null}
      <S.Header>
        <div>{quotes?.advice}</div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={changeAddTaskModalstatus}
          style={{ backgroundColor: "#344CB7" }}
          size="small"
        >
          추가
        </Button>
      </S.Header>
      <Header />
      <S.Container>
        <S.CalenderContainer>
          <TimeStampCard />
          <MytasksCard today={today} myId={currentUser!} />
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
