import React from "react";
import { styled } from "styled-components";

const TimeStampCard = () => {
  return (
    <S.TimeStampContainer>
      <S.TimeStamp>
        <S.TimeStampText>Time</S.TimeStampText>
      </S.TimeStamp>
      {Array.from({ length: 25 }, (_, i) => (
        <S.TimeStamp key={i}>
          <S.TimeStampText>{`${i}:00`}</S.TimeStampText>
        </S.TimeStamp>
      ))}
    </S.TimeStampContainer>
  );
};

export default TimeStampCard;

const S = {
  TimeStampContainer: styled.div`
    background-color: #f3f3f3;
    border-radius: 2px;
    margin: 0 20px;
    padding: 9px;
    color: black;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  `,
  TimeStampText: styled.span`
    font-size: 14px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  `,
  TimeStamp: styled.p`
    height: 80px;
  `,
};
