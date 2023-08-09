import { styled } from "styled-components";
import { Tasks, getFollowersTasks, getMyTasks } from "../../api/tasks";
import { useQuery } from "@tanstack/react-query";
import { Followers, getFollowers } from "../../api/users";
import { useModalStore } from "../../config/useModalStore";
import AddTaskModal from "../modal/AddTaskModal";
import { getQuotes } from "../../api/getQuotes";

const DailyCalender = () => {
  const today = new Date().toISOString().slice(0, 10);
  const myId = "ae06168e-38d9-4a05-a2d6-41e5c0a7aac6";

  const { data: tasks } = useQuery(["tasks"], async () => {
    const tasksData = await getMyTasks(myId, today);
    return tasksData;
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

  const { data: quotes } = useQuery(["quotes"], async () => {
    const quotesData = await getQuotes();
    return quotesData;
  });

  console.log(quotes);

  const { addTaskModalVisible, changeAddTaskModalstatus } = useModalStore();

  return (
    <>
      {addTaskModalVisible ? <AddTaskModal todayDefault={true} /> : null}
      <S.Header>
        <div>{quotes?.advice}</div>
        <button onClick={changeAddTaskModalstatus}>버튼</button>
      </S.Header>
      <S.Container>
        <S.CalenderContainer>
          <S.TimeStampContainer>
            <S.TimeStamp>Time</S.TimeStamp>
            {Array.from({ length: 25 }, (_, i) => (
              <S.TimeStamp key={i}>{`${i}:00`}</S.TimeStamp>
            ))}
          </S.TimeStampContainer>
          <S.TaskContainer>
            <S.TaskBox>My Task</S.TaskBox>
            {tasks &&
              tasks.map((task) => {
                const endHour = task.end_time;
                const startHour = task.start_time;
                const height = (endHour - startHour) * 80;
                const top = (startHour + 1) * 80;
                return (
                  <S.TaskBox height={height} top={top}>
                    <S.Task>
                      <p>{task.title}</p>
                    </S.Task>
                  </S.TaskBox>
                );
              })}
          </S.TaskContainer>
        </S.CalenderContainer>
        <S.FollowersCalenderContainer>
          {followers &&
            followers.map((follower: string) => {
              const followerTasks = followersTasks?.filter(
                (followersTask) => followersTask.user_id === follower
              );
              return (
                <S.TaskContainer>
                  {followerTasks?.map((followerTask: Tasks) => {
                    const endHour = followerTask.end_time;
                    const startHour = followerTask.start_time;
                    const height = (endHour - startHour) * 80;
                    const top = (startHour + 1) * 80;
                    return (
                      <>
                        <S.TaskBox>{followerTask.user_id}</S.TaskBox>
                        <S.TaskBox height={height} top={top}>
                          <S.Task>
                            <p>{followerTask.title}</p>
                          </S.Task>
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
  `,

  TimeStampContainer: styled.div`
    background-color: antiquewhite;
    margin: 0 30px;
  `,
  TimeStamp: styled.p`
    height: 80px;
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
    padding: 10px;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};
