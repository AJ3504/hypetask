import { styled } from "styled-components";

interface TaskBoxProps {
  height?: number;
  top?: number;
}

interface ContentsTextProps {
  fontSize?: number;
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
  TaskBox: styled.div<TaskBoxProps>`
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
    font-size: 15px;
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
    padding: 10px;
  `,
  DetailBtnBox: styled.div`
    float: right;
  `,
  DetailBtn: styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: white;
    font-size: 20px;
  `,
  ContentsBox: styled.div`
    margin-top: 35px;
  `,
  ContentsImo: styled.span`
    margin-bottom: 10px;
  `,
  ContentsText: styled.span<ContentsTextProps>`
    margin: 4px 0 0 10px;
    font-size: ${(props) => (props ? props.fontSize : 10)}px;
  `,
  Contents: styled.div`
    display: flex;
    text-align: center;
  `,
  FollowBtn: styled.button`
    background-color: #262286;
    border: none;
    border-radius: 5px;
  `,
};
export default S;
