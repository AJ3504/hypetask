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
import { BsTextRight } from "react-icons/bs";
import { useMainTabStore } from "../../zustand/useMainTabStore";
import { addFollower, deleteFollower } from "../../api/users";
import S from "./MainStyles";
import { useUserStore } from "../../config/useUserStore";
import TaskDetail from "./TaskDetail";

interface OtherTasksCardProps {
  userIds: string[];
}

const OtherTasksCard = ({ userIds }: OtherTasksCardProps) => {
  const today = new Date().toISOString().slice(0, 10);
  const { user_id } = useUserStore();
  const { currentTab, setCurrentTab } = useMainTabStore();

  const { data: followersTasks } = useQuery(
    ["followerTasks"],
    async () => {
      const followerTasksData = await getFollowerTasks(today, userIds!);
      return followerTasksData;
    },
    { enabled: !!user_id }
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
      {userIds?.map((userId) => (
        <S.TaskContainer key={userId}>
          <S.TaskBox
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <S.Text>{userId}</S.Text>
            <span>
              {currentTab === "explore" ? (
                <button
                  onClick={() => followBtnHandler(user_id as string, userId)}
                >
                  팔로우
                </button>
              ) : (
                <button
                  onClick={() =>
                    deleteFollowBtnHandler(user_id as string, userId)
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
                            <S.DoneCheckBtn
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
                            </S.DoneCheckBtn>
                            <p>{followerTask.title}</p>
                            <span
                              onClick={() =>
                                updateDetailOnMutation.mutate({
                                  taskId: followerTask.task_id!,
                                  on: followerTask.detail_on!,
                                })
                              }
                            >
                              <BsTextRight size="20" />
                            </span>
                          </S.Task>
                        )}
                      </S.TaskBox>
                    ) : (
                      <S.TaskBox top={380}>
                        <S.Task>
                          <S.Text>오늘의 할 일이 없습니다!</S.Text>
                        </S.Task>
                      </S.TaskBox>
                    )}
                  </div>
                );
              })}
        </S.TaskContainer>
      ))}
    </>
  );
};

export default OtherTasksCard;
