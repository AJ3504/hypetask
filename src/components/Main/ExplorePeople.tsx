import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../api/users";
import { useCurrentUserStore } from "../../config/useCurrentUserStore";
import OtherTasksCard from "./OtherTasksCard";
import { styled } from "styled-components";
import TimeStampCard from "./TimeStampCard";
import Header from "./Header";
import { useModalStore } from "../../config/useModalStore";
import SearchModal from "../modal/SearchModal";

const ExplorePeople = () => {
  // const today = new Date().toISOString().slice(0, 10);
  const today = "2023-08-12";

  const { data: users } = useQuery(
    ["users"],
    async () => {
      const usersData = await getAllUser();
      return usersData;
    },
    { select: (usersData) => usersData.map((userData) => userData.user_id) }
  );

  const { currentUserId } = useCurrentUserStore();
  const { searchModalVisible } = useModalStore();

  const filteredUsers = users?.filter((userId) => userId !== currentUserId);

  return (
    <>
      {searchModalVisible ? <SearchModal /> : null}
      <Header />
      <S.Container>
        <S.CalenderContainer>
          <TimeStampCard />
        </S.CalenderContainer>
        <S.FollowersCalenderContainer>
          <OtherTasksCard userIds={filteredUsers as string[]} today={today} />;
        </S.FollowersCalenderContainer>
      </S.Container>
    </>
  );
};

export default ExplorePeople;

interface styleProps {
  height?: number;
  top?: number;
}

const S = {
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background-color: white;
    height: 100px;
    width: 100%;
    z-index: 2;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: row;
  `,
  CalenderContainer: styled.div`
    display: flex;
    flex-direction: row;
    background-color: azure;
    padding: 10px;
    margin-top: 100px;
  `,
  TaskContainer: styled.div`
    background-color: beige;
    min-width: 400px;
    position: relative;
    margin: 0 10px;
  `,
  FollowersCalenderContainer: styled.div`
    display: flex;
    flex-direction: row;
    background-color: azure;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 10px;
    margin-top: 100px;
  `,
  TaskBox: styled.div<styleProps>`
    height: ${(props) => props.height}px;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;

    position: absolute;
    top: ${(props) => props.top}px;
  `,
  Task: styled.div`
    background-color: red;
    height: 100%;
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};
