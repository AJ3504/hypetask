import { useMainTabStore } from "../zustand/useMainTabStore";
import DailyCalender from "../components/main/DailyCalender";
import ExplorePeople from "../components/main/ExplorePeople";
import { useCurrentFollowerStore } from "../zustand/useCurrentFollowerStore";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getFollowers } from "../api/users";
import { Followers } from "../Types";
import { useUserStore } from "../config/useUserStore";

const Main = () => {
  const { setCurrentUserFollowers } = useCurrentFollowerStore();
  const { setUserId } = useUserStore();

  const { data: currentUser } = useQuery(["currentUser"], async () => {
    const currentUserData = await getCurrentUser();
    setUserId(currentUserData as string);
  });

  const { data: followers, isLoading } = useQuery(
    ["followers"],
    async () => {
      const followersData = await getFollowers(currentUser!);
      setCurrentUserFollowers(followers as string[]);
      return followersData;
    },
    {
      enabled: !!currentUser,
      select: (data: Followers[]) => data.map((follower) => follower.to),
    }
  );

  const { currentTab } = useMainTabStore();

  if (isLoading) {
    return <div>로딩중...!</div>;
  }
  return <>{currentTab === "main" ? <DailyCalender /> : <ExplorePeople />}</>;
};

export default Main;
