import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Tasks,
  getFollowerTasks,
  updateDetailOn,
  updateDone,
} from "../../api/tasks";
import { queryClient } from "../../App";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { RiUserUnfollowLine } from "react-icons/ri";

import { MdOutlineCheckBox } from "react-icons/md";
import { BsTextRight } from "react-icons/bs";
import { useMainTabStore } from "../../zustand/useMainTabStore";
import { addFollower, deleteFollower, getAllUser } from "../../api/users";
import S from "./MainStyles";
import TaskDetail from "./TaskDetail";
import { today } from "../../consts/consts";
import { useUserStore } from "../../zustand/useUserStore";

interface OtherTasksCardProps {
  userIds: string[];
}

const OtherTasksCard = ({ userIds }: OtherTasksCardProps) => {
  const { user_id } = useUserStore();
  const { currentTab, setCurrentTab } = useMainTabStore();

  const { data: users, isLoading } = useQuery(["users"], async () => {
    const usersData = await getAllUser();
    return usersData;
  });

  const { data: followersTasks } = useQuery(
    ["followerTasks"],
    async () => {
      const followerTasksData = await getFollowerTasks(today, userIds!);
      return followerTasksData;
    },
    { enabled: !!user_id && !!userIds, refetchOnWindowFocus: false }
  );

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

  const addFollowMutation = useMutation(
    ({ from, to }: { from: string; to: string }) => addFollower(from, to),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followers"]);
      },
    }
  );

  const deleteFollowMutation = useMutation(
    ({ from, to }: { from: string; to: string }) => deleteFollower(from, to),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followers"]);
      },
    }
  );

  const followBtnHandler = async (from: string, to: string) => {
    try {
      addFollowMutation.mutate({ from, to });
      alert("팔로우 완료!");
      setCurrentTab("main");
    } catch (error) {
      alert("error!");
    }
  };

  const deleteFollowBtnHandler = async (from: string, to: string) => {
    try {
      deleteFollowMutation.mutate({ from, to });
      alert("팔로우 취소 완료!");
    } catch (error) {
      alert("error!");
    }
  };

  return (
    <>
      {followersTasks &&
        users &&
        userIds?.map((userId) => {
          const userFollowersTasks = followersTasks.filter(
            (task) => task.user_id === userId
          );
          const userOnlyIds = userFollowersTasks.length > 0 ? [] : [userId];
          const userArr = users.filter((user) => user.user_id === userId);

          return (
            <S.TaskContainer key={userId}>
              <S.TaskBox
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <S.Text>{userArr[0].username}</S.Text>
                <span>
                  {currentTab === "explore" ? (
                    <S.FollowBtn
                      onClick={() =>
                        followBtnHandler(user_id as string, userId)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <RiUserFollowLine size="20" color="white" />
                    </S.FollowBtn>
                  ) : (
                    <S.FollowBtn
                      onClick={() =>
                        deleteFollowBtnHandler(user_id as string, userId)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <RiUserUnfollowLine size="20" color="white" />
                    </S.FollowBtn>
                  )}
                </span>
              </S.TaskBox>
              {userFollowersTasks.map((followerTask: Tasks) => {
                const endHour = followerTask.end_time;
                const startHour = followerTask.start_time;
                const height = (endHour - startHour) * 80;
                const top = (startHour + 1) * 80;

                return (
                  <div key={followerTask.task_id}>
                    <S.TaskBox height={height} top={top}>
                      {followerTask.detail_on ? (
                        <TaskDetail task={followerTask} />
                      ) : (
                        <S.Task>
                          <S.DoneCheckBtn
                            onClick={() =>
                              updateDoneMutation.mutate({
                                taskId: followerTask.task_id!,
                                done: followerTask.done!,
                              })
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {followerTask.done ? (
                              <MdOutlineCheckBox size="30" />
                            ) : (
                              <MdCheckBoxOutlineBlank size="30" />
                            )}
                          </S.DoneCheckBtn>
                          <p style={{ fontSize: "18px", fontWeight: "600" }}>
                            {followerTask.title}
                          </p>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              updateDetailOnMutation.mutate({
                                taskId: followerTask.task_id!,
                                on: followerTask.detail_on!,
                              })
                            }
                          >
                            <BsTextRight size="30" />
                          </span>
                        </S.Task>
                      )}
                    </S.TaskBox>
                  </div>
                );
              })}
              {userOnlyIds.map((onlyUserId) => (
                <S.TaskBox key={onlyUserId} top={30}>
                  <S.Text style={{ color: "black", height: "20px" }}>
                    오늘의 할 일이 없습니다!
                  </S.Text>
                </S.TaskBox>
              ))}
            </S.TaskContainer>
          );
        })}
    </>
  );
};

export default OtherTasksCard;
