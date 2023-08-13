import React from "react";
import { deleteTask, updateDetailOn } from "../../api/tasks";
import type { Tasks } from "../../Types";
import { styled } from "styled-components";
import { MdTitle } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { BsTextLeft } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { useModalStore } from "../../config/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import { useUserStore } from "../../config/useUserStore";

export interface TaskDetailProps {
  task: Tasks | undefined | null;
}
const TaskDetail = ({ task }: TaskDetailProps) => {
  const updateDetailOnMutation = useMutation(
    ({ taskId, on }: { taskId: string; on: boolean }) =>
      updateDetailOn({ taskId, on }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followerTasks"]);
        queryClient.invalidateQueries(["myTasks"]);
      },
    }
  );

  const deleteTaskMutaion = useMutation(
    (taskId: string) => deleteTask(taskId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myTasks"]);
        queryClient.invalidateQueries(["followerTasks"]);
        alert("삭제되었습니다!");
      },
    }
  );

  const { addTaskModalVisible, changeAddTaskModalstatus } = useModalStore();
  const { user_id } = useUserStore();
  return (
    <S.TaskDetailBox>
      {addTaskModalVisible ? (
        <AddTaskModal todayDefault={true} task={task!} myId={user_id!} />
      ) : null}

      <div>
        {user_id === task?.user_id ? (
          <>
            <span onClick={changeAddTaskModalstatus}>
              <BiPencil />
            </span>
            <span onClick={() => deleteTaskMutaion.mutate(task?.task_id!)}>
              <BsTrash3 />
            </span>
          </>
        ) : null}

        <span
          onClick={() =>
            updateDetailOnMutation.mutate({
              taskId: task?.task_id!,
              on: task?.detail_on!,
            })
          }
        >
          <AiOutlineCloseCircle />
        </span>
      </div>
      <div>
        <span>
          <MdTitle />
        </span>
        <span>{task?.title}</span>
      </div>
      <div>
        <span>
          <BiTimeFive />
        </span>
        <span>
          {task?.start_time}:00 ~ {task?.end_time}:00
        </span>
      </div>
      <div>
        <span>
          <BsTextLeft />
        </span>
        <span>{task?.desc}</span>
      </div>
      <div>
        <span>
          <AiOutlineCheckCircle />
        </span>
        <span>{task?.done ? "완료" : "미완료"}</span>
      </div>
    </S.TaskDetailBox>
  );
};

export default TaskDetail;

const S = {
  TaskDetailBox: styled.div`
    background-color: antiquewhite;
    width: 400px;
    height: 400px;
  `,
};
