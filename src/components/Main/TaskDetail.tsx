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
import { useModalStore } from "../../zustand/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import S from "./mainStyles";
import { useUserStore } from "../../zustand/useUserStore";

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

      <S.DetailBtnBox>
        {user_id === task?.user_id ? (
          <>
            <S.DetailBtn
              onClick={changeAddTaskModalstatus}
              style={{ cursor: "pointer" }}
            >
              <BiPencil />
            </S.DetailBtn>
            <S.DetailBtn
              onClick={() => deleteTaskMutaion.mutate(task?.task_id!)}
              style={{ cursor: "pointer" }}
            >
              <BsTrash3 />
            </S.DetailBtn>
          </>
        ) : null}

        <S.DetailBtn
          onClick={() =>
            updateDetailOnMutation.mutate({
              taskId: task?.task_id!,
              on: task?.detail_on!,
            })
          }
          style={{ cursor: "pointer" }}
        >
          <AiOutlineCloseCircle />
        </S.DetailBtn>
      </S.DetailBtnBox>
      <S.ContentsBox>
        <S.Contents style={{ marginBottom: "10px" }}>
          <S.ContentsImo>
            <MdTitle size="25" />
          </S.ContentsImo>
          <S.ContentsText fontSize={20}>{task?.title}</S.ContentsText>
        </S.Contents>

        <S.Contents>
          <S.ContentsImo>
            <BiTimeFive size="20" />
          </S.ContentsImo>
          <S.ContentsText>
            {task?.start_time}:00 ~ {task?.end_time}:00
          </S.ContentsText>
        </S.Contents>

        <S.Contents>
          <S.ContentsImo>
            <BsTextLeft size="20" />
          </S.ContentsImo>
          <S.ContentsText>{task?.desc}</S.ContentsText>
        </S.Contents>
        <S.Contents>
          <S.ContentsImo>
            <AiOutlineCheckCircle size="20" />
          </S.ContentsImo>
          <S.ContentsText>{task?.done ? "완료" : "미완료"}</S.ContentsText>
        </S.Contents>
      </S.ContentsBox>
    </S.TaskDetailBox>
  );
};

export default TaskDetail;
