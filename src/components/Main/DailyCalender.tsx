import React, { useEffect } from "react";
import { styled } from "styled-components";
import { getTasks } from "../../api/tasks";
import { useQuery } from "@tanstack/react-query";

const DailyCalender = () => {
  // 1. 현재 로그인된 유저의 uid를 가지고 와서 uid와 현재 날짜를 이용해 task들을 가져오기
  // 2. 현재 로그인된 유저가 팔로우하는 사람들의 목록 가져오기
  // 3. 팔로우한 사람들의 uid와 현재 날짜를 이용해 팔로워들의 task 가져오기
  const today = new Date().toISOString().slice(0, 10);
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery(["tasks"], async () => {
    const tasksData = await getTasks(today);
    return tasksData;
  });
  console.log(tasks);

  return (
    <S.CalenderContainer>
      <S.TimeStampContainer>
        {Array.from({ length: 25 }, (_, i) => (
          <S.TimeStamp key={i}>{`${i}:00`}</S.TimeStamp>
        ))}
      </S.TimeStampContainer>

      {tasks &&
        tasks.map((task) => {
          const endHour = task.end_time;
          const startHour = task.start_time;
          const height = (endHour - startHour) * 80;
          const top = startHour * 80;
          return (
            <S.TaskContainer>
              <S.TaskBox height={height} top={top}>
                <S.Task>
                  <p>{task.title}</p>
                </S.Task>
              </S.TaskBox>{" "}
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
    justify-content: center;
  `,
};
