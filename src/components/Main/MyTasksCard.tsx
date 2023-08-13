import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyTasks, updateDetailOn, updateDone } from "../../api/tasks";
import { styled } from "styled-components";
import { useModalStore } from "../../zustand/useModalStore";
import { queryClient } from "../../App";
import AddTaskModal from "../modal/AddTaskModal";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { BsTextRight } from "react-icons/bs";
import S from "./MainStyles";
import { useNavigate } from "react-router-dom";
import { useCommentTimeStoreDev } from "../../zustand/CommentTimeStore";
import TaskDetail from "./TaskDetail";
import { today } from "../../consts/consts";
import { useUserStore } from "../../zustand/useUserStore";

export interface TasksProps {
  myId: string;
}

const MyTasksCard = ({ myId }: TasksProps) => {
  const navigate = useNavigate();
  const { data: myTasks } = useQuery(["myTasks"], async () => {
    const tasksData = await getMyTasks(myId, today);
    return tasksData;
  });
  const { setClickedTime } = useCommentTimeStoreDev();
  const { addTaskModalVisible, changeAddTaskModalstatus } = useModalStore();
  const { user_id } = useUserStore();

  const updateDoneMutation = useMutation(
    ({ taskId, done }: { taskId: string; done: boolean }) =>
      updateDone({ taskId, done }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myTasks"]);
      },
    }
  );

  const updateDetailOnMutation = useMutation(
    ({ taskId, on }: { taskId: string; on: boolean }) =>
      updateDetailOn({ taskId, on }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myTasks"]);
      },
    }
  );

  return (
    <>
      {addTaskModalVisible ? (
        <AddTaskModal todayDefault={true} myId={user_id!} />
      ) : null}
      <S.TaskContainer>
        <S.TaskBox
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/detail?uid=${user_id}&day=${today}`);
          }}
        >
          <S.Text>My Task</S.Text>
        </S.TaskBox>
        {myTasks &&
          myTasks.map((task) => {
            const endHour = task.end_time;
            const startHour = task.start_time;
            const height = (endHour - startHour) * 80;
            const top = (startHour + 1) * 80;
            return (
              <S.TaskBox
                height={height}
                top={top}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setClickedTime(task);
                }}
              >
                {task.detail_on ? (
                  <TaskDetail task={task} />
                ) : (
                  <S.Task>
                    <S.DoneCheckBtn
                      onClick={() =>
                        updateDoneMutation.mutate({
                          taskId: task.task_id!,
                          done: task.done!,
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {task.done ? (
                        <MdOutlineCheckBox size="30" />
                      ) : (
                        <MdCheckBoxOutlineBlank size="30" />
                      )}
                    </S.DoneCheckBtn>
                    <p style={{ fontSize: "18px", fontWeight: "600" }}>
                      {task.title}
                    </p>
                    <span
                      onClick={() =>
                        updateDetailOnMutation.mutate({
                          taskId: task.task_id!,
                          on: task.detail_on!,
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <BsTextRight size="30" />
                    </span>
                  </S.Task>
                )}
              </S.TaskBox>
            );
          })}
      </S.TaskContainer>
    </>
  );
};

export default MyTasksCard;
