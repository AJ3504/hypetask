import { styled } from "styled-components";
import TaskDetail from "./TaskDetail";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Tasks,
  getFollowerTasks,
  updateDetailOn,
  updateDone,
} from "../../api/tasks";
import { queryClient } from "../../App";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useMainTabStore } from "../../config/useMainTabStore";
import { addFollower, deleteFollower } from "../../api/users";
import { useCurrentUserStore } from "../../config/useCurrentUserStore";

interface otherTasksCardProps {
  userIds: string[];
  today: string;
}

const OtherTasksCard = ({ userIds, today }: otherTasksCardProps) => {
  const { data: followersTasks } = useQuery(
    ["followerTasks"],
    async () => {
      const followerTasksData = await getFollowerTasks(today, userIds!);
      return followerTasksData;
    },
    { enabled: !!userIds }
  );

  console.log(userIds);
  console.log(followersTasks);

  const updateDoneMutation = useMutation(
    ({ taskId, done }: { taskId: string; done: boolean }) =>
      updateDone({ taskId, done }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followerTasks"]);
      },
    }
  );

  const updateDetailOnMutation = useMutation(
    ({ taskId, on }: { taskId: string; on: boolean }) =>
      updateDetailOn({ taskId, on }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followerTasks"]);
      },
    }
  );

  const followBtnHandler = async (from: string, to: string) => {
    try {
      await addFollower(from, to);
      alert("팔로우 완료!");
      setCurrentTab("main");
    } catch (error) {
      alert("error!");
    }
  };

  const deleteFollowBtnHandler = async (from: string, to: string) => {
    try {
      await deleteFollower(from, to);
      alert("팔로우 취소 완료!");
    } catch (error) {
      alert("error!");
    }
  };

  const { currentTab, setCurrentTab } = useMainTabStore();
  const { currentUserId } = useCurrentUserStore();

  return (
    <>
      {userIds?.map((userId) => (
        <div key={userId}>
          <S.TaskContainer>
            <S.TaskBox
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>{userId}</span>
              <span>
                {currentTab === "explore" ? (
                  <button
                    onClick={() => followBtnHandler(currentUserId, userId)}
                  >
                    팔로우
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      deleteFollowBtnHandler(currentUserId, userId)
                    }
                  >
                    팔로우 취소
                  </button>
                )}
              </span>
            </S.TaskBox>
            {followersTasks &&
              followersTasks
                .filter((followerTask) => followerTask.user_id === userId)
                .map((followerTask: Tasks) => {
                  const endHour = followerTask.end_time;
                  const startHour = followerTask.start_time;
                  const height = (endHour - startHour) * 80;
                  const top = (startHour + 1) * 80;

                  return (
                    <div key={followerTask.task_id}>
                      {followersTasks.length > 0 ? (
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
                      ) : (
                        <S.TaskBox top={80}>
                          <p>오늘의 할 일이 없습니다!</p>
                        </S.TaskBox>
                      )}
                    </div>
                  );
                })}
          </S.TaskContainer>
        </div>
      ))}
    </>
  );
};

export default OtherTasksCard;

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
    z-index: 2;
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
