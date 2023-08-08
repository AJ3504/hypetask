import { styled } from "styled-components";

export const containerStyle = styled.div`
  width: "100%";
  height: "100vh";
`;

export const CommonButton = styled.button`
  color: #000000c1;

  background-color: #ece8e8;
  border: none;
  margin-bottom: 15px;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.2s ease;
  font-family: "NanumSquareNeo-Variable", sans-serif;
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  &:hover {
    background-color: #a8b0c4da;
  }
`;
