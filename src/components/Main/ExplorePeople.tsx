import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../api/users";
import { useCurrentUserStore } from "../../zustand/useCurrentUserStore";
import { styled } from "styled-components";

import { useModalStore } from "../../zustand/useModalStore";
import SearchModal from "../modal/SearchModal";
import Header from "./Header";
import TimeStampCard from "./TimeStampCard";
import OtherTasksCard from "./OtherTasksCard";
import S from "./mainStyles";

const ExplorePeople = () => {
  // const today = new Date().toISOString().slice(0, 10);
  const today = "2023-08-12";

  // 모든 유저
  const { data: users, isLoading } = useQuery(
    ["users"],
    async () => {
      const usersData = await getAllUser();
      return usersData;
    },
    { select: (usersData) => usersData.map((userData) => userData.user_id) }
  );

  const { currentUserId, currentUserFollowers } = useCurrentUserStore();
  const { searchModalVisible } = useModalStore();

  if (isLoading) {
    return <div style={{ backgroundColor: "#262286" }}>로딩중...</div>;
  }

  const exceptUser = [...currentUserFollowers, currentUserId];
  const fillteredUsers = [...(users as string[])];

  exceptUser?.forEach((user) => {
    const index = fillteredUsers?.indexOf(user);
    fillteredUsers.splice(index, 1);
  });

  console.log("여기", fillteredUsers);

  return (
    <>
      {searchModalVisible ? <SearchModal /> : null}
      <Header />
      <S.Container>
        <S.CalenderContainer>
          <TimeStampCard />
        </S.CalenderContainer>
        <S.FollowersCalenderContainer>
          <OtherTasksCard userIds={fillteredUsers} />;
        </S.FollowersCalenderContainer>
      </S.Container>
    </>
  );
};

export default ExplorePeople;
