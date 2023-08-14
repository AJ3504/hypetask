import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../api/users";
import { useModalStore } from "../../zustand/useModalStore";
import SearchModal from "../modal/SearchModal";
import { useCurrentStore } from "../../zustand/useCurrentStore";
import Header from "./Header";
import S from "./MainStyles";
import TimeStampCard from "./TimeStampCard";
import OtherTasksCard from "./OtherTasksCard";
import { useUserStore } from "../../zustand/useUserStore";

const ExplorePeople = () => {
  // 모든 유저
  const { data: users, isLoading } = useQuery(
    ["users"],
    async () => {
      const usersData = await getAllUser();
      return usersData;
    },
    { select: (usersData) => usersData.map((userData) => userData.user_id) }
  );

  const { currentUserFollowers } = useCurrentStore();
  const user_id = useUserStore((state) => state.user_id);
  const { searchModalVisible } = useModalStore();

  if (isLoading) {
    return <div style={{ backgroundColor: "#262286" }}>로딩중...</div>;
  }

  const exceptUser = [...currentUserFollowers, user_id];
  const fillteredUsers = [...(users as string[])];

  exceptUser?.forEach((user) => {
    const index = fillteredUsers?.indexOf(user as string);
    fillteredUsers.splice(index, 1);
  });

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
