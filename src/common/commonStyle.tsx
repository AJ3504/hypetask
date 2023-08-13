import { styled } from "styled-components";

export const containerStyle = styled.div`
  width: "100%";
  height: "100vh";
`;

export const SButton = styled.button`
  color: #000000c1;
  font-weight: bolder;
  background-color: #ece8e8;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.2s ease;
  font-family: "NanumSquareNeo-Variable", sans-serif;
  padding: 6px 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #a8b0c4da;
  }
`;
