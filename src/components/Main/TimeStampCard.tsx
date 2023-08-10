import React from "react";
import { styled } from "styled-components";

const TimeStampCard = () => {
  return (
    <S.TimeStampContainer>
      <S.TimeStamp>Time</S.TimeStamp>
      {Array.from({ length: 25 }, (_, i) => (
        <S.TimeStamp key={i}>{`${i}:00`}</S.TimeStamp>
      ))}
    </S.TimeStampContainer>
  );
};

export default TimeStampCard;

const S = {
  TimeStampContainer: styled.div`
    background-color: antiquewhite;
    margin: 0 30px;
  `,
  TimeStamp: styled.p`
    height: 80px;
  `,
};
