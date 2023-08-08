import React from "react";
import styled from "styled-components";
type IModalProps = {};

const Modal: React.FC<IModalProps> = ({}) => {
  return <StModalBackGround>hello</StModalBackGround>;
};
const StModalBackGround = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;
