import { styled } from "styled-components";
import S from "./mainStyles";

const TimeStampCard = () => {
  return (
    <S.TimeStampContainer>
      <S.TimeStamp>
        <S.Text>Time</S.Text>
      </S.TimeStamp>
      {Array.from({ length: 25 }, (_, i) => (
        <S.TimeStamp key={i}>
          <S.Text>{`${i}:00`}</S.Text>
        </S.TimeStamp>
      ))}
    </S.TimeStampContainer>
  );
};

export default TimeStampCard;
