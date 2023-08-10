import React from "react";

import { styled } from "styled-components";
import Introduce from "../components/Authentication/Introduce";
import Login from "../components/Authentication/Login";
const FirstMain: React.FC = () => {
  return (
    <FirstMainContainer>
      <ContentContainer>
        <Introduce />

        <Login />
      </ContentContainer>
    </FirstMainContainer>
  );
};

export const FirstMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
`;
export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export default FirstMain;
