import { styled } from "styled-components";

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
    background-color: #262286;
    height: 100px;
    width: 100%;
    z-index: 99;
    padding: 0 30px;
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
    background-color: #f3f3f3;
    border-radius: 3px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

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
    background-color: #262286;
    height: 100%;
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 15px;
  `,
  TimeStampContainer: styled.div`
    background-color: #f3f3f3;
    border-radius: 2px;
    margin: 0 20px;
    padding: 9px;
    color: black;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  `,
  Text: styled.span`
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    color: black;
  `,
  TimeStamp: styled.p`
    height: 80px;
  `,
  DoneCheckBtn: styled.button`
    background-color: transparent;
    color: white;
    border: none;
  `,
  TaskDetailBox: styled.div`
    background-color: #262286;
    border-radius: 10px;
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    border-radius: 3px;
  `,
};
export default S;
