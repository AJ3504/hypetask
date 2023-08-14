import { styled } from "styled-components";

export const StChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid #b4b4cd;
  background-color: #f2f3fd8f;
`;

export const StHeader = styled.div`
  background-color: #3b5998;
  color: white;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
`;
export const StMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 80%;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
`;
export const StMessage = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;
export const StUser = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #333;
`;
export const StText = styled.span`
  color: black;
`;
export const StDate = styled.span`
  font-size: 10px;
  margin-left: 5px;
  color: lightgray;
  position: relative;
  top: 3px;
`;
export const StNewMessageForm = styled.form`
  display: flex;
  width: 100%;
  padding: 10px;
`;
export const StNewMessageInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  padding: 10px;
  border-radius: 5px 0 0 5px;
`;
export const StSendButton = styled.button`
  border: none;
  outline: none;
  background: #3b5998;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
