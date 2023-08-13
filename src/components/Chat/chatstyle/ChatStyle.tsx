import { styled } from "styled-components";

export const ST = {
  TabContainer: styled.section`
    margin-top: 30px;
    display: inline-block;
  `,
  TabContainerInner: styled.div`
    display: flex;
    align-items: center;
    /* border: solid; */
    border-radius: 2px;
    background-color: #262286;
    padding: 3px;
  `,
  OpenChatTab: styled.span`
    margin-left: "20px";
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
  `,
  MyChatTab: styled.span`
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    margin-left: 5px;
    &:hover {
      background-color: #6b8e23;
      color: white;
    }
  `,
};

export const SB = {
  ChatContainer: styled.div`
    background-color: #ffffff8f;
    display: flex;
    justify-content: center;
    min-height: 100vh;
  `,
  ChatContainerInner: styled.section`
    border-width: 3px;
    border-radius: 5px;
    width: 60%;
    margin-top: 40px;
    margin-bottom: auto;
    padding: 20px;
  `,
  RoomInfoContainer: styled.section`
    display: flex;
    justify-content: center;
    border: solid;
  `,
  RoomNameLabel: styled.label`
    font-size: 18px;
    font-weight: bold;
    margin-top: 6px;
    margin-right: 6px;
  `,
  RoomNameInput: styled.input`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s, transform 0.3s;

    &:focus {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      transform: scale(1.02);
      outline: none;
    }
  `,
  RoomPWInput: styled.input`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s, transform 0.3s;

    &:focus {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      transform: scale(1.02);
      outline: none;
    }
  `,
  RoomPWLabel: styled.label`
    font-size: 18px;
    font-weight: bold;
    margin-left: 25px;
    margin-top: 6px;
    margin-right: 6px;
  `,
  Button: styled.button`
    margin-left: 20px;
    background-color: #4f6529;
    color: white;
    border: none;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.5s, border-color 0.5s;

    &:hover {
      background-color: #5a7e1a;
      border: 1px solid #5a7e1a;
    }
  `,

  //
  EnterChatContainerInner: styled.section`
    border-width: 3px;
    border-radius: 5px;
    width: 90%;
    margin: 40px auto;
    padding: 20px;
  `,
};
