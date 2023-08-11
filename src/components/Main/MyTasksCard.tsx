import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyTasks, updateDetailOn, updateDone } from "../../api/tasks";
import { styled } from "styled-components";
import { useModalStore } from "../../config/useModalStore";
import { queryClient } from "../../App";
import AddTaskModal from "../modal/AddTaskModal";
import TaskDetail from "./TaskDetail";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useUserStore } from "../../config/useUserStore";
import { useNavigate } from "react-router-dom";

export interface TasksProps {
  today: string;
  myId: string;
}

const MyTasksCard = ({ today, myId }: TasksProps) => {
  const navigate = useNavigate();
  const { data: myTasks } = useQuery(["myTasks"], async () => {
    const tasksData = await getMyTasks(myId, today);
    return tasksData;
  });

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
          My Task
        </S.TaskBox>
        {myTasks &&
          myTasks.map((task) => {
            const endHour = task.end_time;
            const startHour = task.start_time;
            const height = (endHour - startHour) * 80;
            const top = (startHour + 1) * 80;
            return (
              <S.TaskBox height={height} top={top}>
                {task.detail_on ? (
                  <TaskDetail task={task} />
                ) : (
                  <S.Task>
                    <button
                      onClick={() =>
                        updateDoneMutation.mutate({
                          taskId: task.task_id!,
                          done: task.done!,
                        })
                      }
                    >
                      {task.done ? (
                        <MdOutlineCheckBox size="25" />
                      ) : (
                        <MdCheckBoxOutlineBlank size="25" />
                      )}
                    </button>
                    <p>{task.title}</p>
                    <span
                      onClick={() =>
                        updateDetailOnMutation.mutate({
                          taskId: task.task_id!,
                          on: task.detail_on!,
                        })
                      }
                    >
                      <BsSearch size="25" />
                    </span>
                  </S.Task>
                )}
              </S.TaskBox>
            );
          })}{" "}
      </S.TaskContainer>
    </>
  );
};

export default MyTasksCard;

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
