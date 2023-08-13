import React from "react";
import { styled } from "styled-components";

const Introduce: React.FC = () => {
  return (
    <IntroduceContainer>
      <IntroduceTitle>HYPETASK</IntroduceTitle>
      <div className="introduce-contents">
        임시 소개글 : 자기개발을 위해 모인 사람들과 함께 일정을 공유하고
        응원하면서, 각자의 task를 완수하도록 도움을 주는 프로젝트입니다.
      </div>
    </IntroduceContainer>
  );
};
export const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  border-radius: 20px;
  height: 400px;
  width: 300px;
`;
export const IntroduceTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
export default Introduce;
