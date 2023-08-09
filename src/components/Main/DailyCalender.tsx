import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Tasks, getFollowersTasks, getMyTasks } from "../../api/tasks";
import { useQuery } from "@tanstack/react-query";
import { Followers, getFollowers } from "../../api/users";

const DailyCalender = () => {
  // 1. 현재 로그인된 유저의 uid를 가지고 와서 uid와 현재 날짜를 이용해 task들을 가져오기
  // 2. 현재 로그인된 유저가 팔로우하는 사람들의 목록 가져오기
  // 3. 팔로우한 사람들의 uid와 현재 날짜를 이용해 팔로워들의 task 가져오기
  const today = new Date().toISOString().slice(0, 10);
  const myId = "ae06168e-38d9-4a05-a2d6-41e5c0a7aac6";

  const { data: tasks } = useQuery(["tasks"], async () => {
    const tasksData = await getMyTasks(myId, today);
    return tasksData;
  });

  const { data: followers } = useQuery(
    "followers",
    async () => {
      const followersData = await getFollowers(myId);
      return followersData;
    },
    {
      select: (followers: Followers[] | null) =>
        followers?.map((follower: Followers) => follower.from),
    }
  );
  console.log("팔로워들", followers);

  const { data: followersTasks } = useQuery(
    "followersTasks",
    async () => {
      const followersTasksData = await getFollowersTasks(today, followers!);
      return followersTasksData;
    },
    { enabled: !!followers }
  );

  return (
    <S.CalenderContainer>
      <S.TimeStampContainer>
        {Array.from({ length: 25 }, (_, i) => (
          <S.TimeStamp key={i}>{`${i}:00`}</S.TimeStamp>
        ))}
      </S.TimeStampContainer>
      <S.TaskContainer>
        {tasks &&
          tasks.map((task) => {
            const endHour = task.end_time;
            const startHour = task.start_time;
            const height = (endHour - startHour) * 80;
            const top = startHour * 80;
            return (
              <S.TaskBox height={height} top={top}>
                <S.Task>
                  <p>{task.title}</p>
                </S.Task>
              </S.TaskBox>
            );
          })}
      </S.TaskContainer>
      {followers &&
        followers.map((follower: string) => {
          console.log("팔로워", follower);
          const followerTasks = followersTasks?.filter(
            (followersTask) => followersTask.user_id === follower
          );
          console.log("팔로워의 태스크들", followerTasks);
          return (
            <S.TaskContainer>
              {followerTasks?.map((followerTask: Tasks) => {
                console.log("팔로워의 태스크", followerTask);
                const endHour = followerTask.end_time;
                const startHour = followerTask.start_time;
                const height = (endHour - startHour) * 80;
                const top = startHour * 80;
                return (
                  <S.TaskBox height={height} top={top}>
                    <S.Task>
                      <p>{followerTask.title}</p>
                    </S.Task>
                  </S.TaskBox>
                );
              })}
            </S.TaskContainer>
          );
        })}
    </S.CalenderContainer>
  );
};

export default DailyCalender;

interface styleProps {
  height: number;
  top: number;
}

const S = {
  CalenderContainer: styled.div`
    display: flex;
    flex-direction: row;
    background-color: azure;
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
    width: 400px;
    position: relative;
    margin: 10px;
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
