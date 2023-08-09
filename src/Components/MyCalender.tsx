import React from "react";
import { LoginContainer } from "./Login";
import { styled } from "styled-components";

const MyCalender: React.FC = () => {
  return <MyCalenderContainer>Calender</MyCalenderContainer>;
};

export default MyCalender;
const MyCalenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  border-radius: 20px;
  height: 600px;
  width: 500px;
`;
