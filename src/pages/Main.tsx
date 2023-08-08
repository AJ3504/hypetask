import { styled } from "styled-components";
import { ContainerStyle } from "../common/CommonStyle";

const Main = () => {
  return (
    <>
      <ContainerStyle>
        <StNonTaskContainer>
          <StLifeQuoteContainer>
            He who can no longer pause to wonder and stand rapt in awe, is as
            good as dead; his eyes are closed.{" "}
          </StLifeQuoteContainer>
          <StModalBtn>일정추가</StModalBtn>
        </StNonTaskContainer>
        {/* -------------------------------------------------------- */}
        <StTaskContainer style={{ border: "solid" }}>
          <StMyTaskContainer style={{ backgroundColor: "#faeede" }}>
            <StMyCalendar>Calendar</StMyCalendar>
            <StMyTaskDetail>MyTaskDetail</StMyTaskDetail>
          </StMyTaskContainer>
          <StOthersTaskContainer style={{ backgroundColor: "#faeede" }}>
            others
          </StOthersTaskContainer>
        </StTaskContainer>
      </ContainerStyle>
    </>
  );
};

export default Main;

export const StNonTaskContainer = styled.div`
  padding: 10px;
  display: flex;
`;
export const StLifeQuoteContainer = styled.div`
  margin-right: auto;
`;
export const StModalBtn = styled.button`
  margin-left: auto;
`;
//----------------------------------------------//
export const StTaskContainer = styled.div`
  display: flex;
`;
export const StMyTaskContainer = styled.div`
  display: flex;
  margin-right: 20px;
  padding: 10px;
`;
export const StMyCalendar = styled.div`
  margin-right: 10px;
`;
export const StMyTaskDetail = styled.div``;

//----------------------------------------------//
export const StOthersTaskContainer = styled.div`
  display: flex;
  padding: 10px;
`;
