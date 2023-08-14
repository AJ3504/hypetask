import React from "react";
import { styled } from "styled-components";

const Introduce: React.FC = () => {
  return (
    <IntroduceContainer>
      <IntroduceTitle>HYPETASK</IntroduceTitle>
      <IntroduceContents>
        계획짜러가려면 어디로 가야돼요?
        <br />
        뉴칠스의 HYPETASK요. <br />
        HYPETASK는 일상의 작은 일들부터 큰 프로젝트까지 모두 관리할 수 있는
        서비스입니다. <br /> HYPETASK와 함께 일상을 체계적으로 관리해보세요! 😊
      </IntroduceContents>
    </IntroduceContainer>
  );
};
export const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background: rgba(255, 255, 250, 0.5);
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  border-radius: 20px;
  height: 400px;
  width: 300px;
  color: #29425d;
`;
export const IntroduceTitle = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 45px;
  text-align: center;
  font-style: italic;
  font-weight: 900;
  color: #29425d;
`;
export const IntroduceContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  line-height: 1.5;
  font-weight: 600;
`;
export default Introduce;
