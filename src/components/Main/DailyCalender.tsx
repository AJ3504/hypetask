import { styled } from "styled-components";
import {
  Tasks,
  getFollowersTasks,
  updateDetailOn,
  updateDone,
} from "../../api/tasks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Followers, getFollowers } from "../../api/users";
import { useModalStore } from "../../config/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import { getQuotes } from "../../api/getQuotes";
import MytasksCard from "./MyTasksCard";
import TimeStampCard from "./TimeStampCard";
import TaskDetail from "./TaskDetail";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { queryClient } from "../../App";

const DailyCalender = () => {
  const today = new Date().toISOString().slice(0, 10);
  const myId = "ae06168e-38d9-4a05-a2d6-41e5c0a7aac6";

  const { data: quotes } = useQuery(["quotes"], async () => {
    const quotesData = await getQuotes();
    return quotesData;
  });

  const { data: followers } = useQuery(
    ["followers"],
    async () => {
      const followersData = await getFollowers(myId);
      return followersData;
    },
    {
      select: (followers: Followers[] | null) =>
        followers?.map((follower: Followers) => follower.from),
    }
  );

  const { data: followersTasks } = useQuery(
    ["followersTasks"],
    async () => {
      const followersTasksData = await getFollowersTasks(today, followers!);
      return followersTasksData;
    },
    { enabled: !!followers }
  );

  const { addTaskModalVisible, changeAddTaskModalstatus } = useModalStore();

  const updateDoneMutation = useMutation(
    ({ taskId, done }: { taskId: string; done: boolean }) =>
      updateDone({ taskId, done }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followersTasks"]);
      },
    }
  );

  const updateDetailOnMutation = useMutation(
    ({ taskId, on }: { taskId: string; on: boolean }) =>
      updateDetailOn({ taskId, on }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followersTasks"]);
      },
    }
  );

  return (
    <>
      {addTaskModalVisible ? <AddTaskModal todayDefault={true} /> : null}
      <S.Header>
        <div>{quotes?.advice}</div>
        <button onClick={changeAddTaskModalstatus}>버튼</button>
      </S.Header>
      <S.Container>
        <S.CalenderContainer>
          <TimeStampCard />
          <MytasksCard today={today} myId={myId} />
        </S.CalenderContainer>
        <S.FollowersCalenderContainer>
          {followers &&
            followers.map((follower: string) => {
              const followerTasks = followersTasks?.filter(
                (followersTask) => followersTask.user_id === follower
              );
              if (followerTasks && followerTasks.length > 0)
                return (
                  <S.TaskContainer>
                    {followerTasks &&
                      followerTasks?.map((followerTask: Tasks) => {
                        const endHour = followerTask.end_time;
                        const startHour = followerTask.start_time;
                        const height = (endHour - startHour) * 80;
                        const top = (startHour + 1) * 80;
                        return (
                          <>
                            <S.TaskBox>{followerTask.user_id}</S.TaskBox>
                            <S.TaskBox height={height} top={top}>
                              {followerTask.detail_on ? (
                                <TaskDetail task={followerTask} />
                              ) : (
                                <S.Task>
                                  <button
                                    onClick={() =>
                                      updateDoneMutation.mutate({
                                        taskId: followerTask.task_id!,
                                        done: followerTask.done!,
                                      })
                                    }
                                  >
                                    {followerTask.done ? (
                                      <MdOutlineCheckBox size="25" />
                                    ) : (
                                      <MdCheckBoxOutlineBlank size="25" />
                                    )}
                                  </button>
                                  <p>{followerTask.title}</p>
                                  <span
                                    onClick={() =>
                                      updateDetailOnMutation.mutate({
                                        taskId: followerTask.task_id!,
                                        on: followerTask.detail_on!,
                                      })
                                    }
                                  >
                                    <BsSearch size="25" />
                                  </span>
                                </S.Task>
                              )}
                            </S.TaskBox>
                          </>
                        );
                      })}
                  </S.TaskContainer>
                );
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
    background-color: white;
    height: 100px;
    width: 100%;
    z-index: 99;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: row;
  `,
  CalenderContainer: styled.div`
    display: flex;
    flex-direction: row;
    background-color: azure;
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
