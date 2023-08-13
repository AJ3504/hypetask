import { useMainTabStore } from "../zustand/useMainTabStore";
import DailyCalender from "../components/main/DailyCalender";
import ExplorePeople from "../components/main/ExplorePeople";
import { useCurrentUserStore } from "../zustand/useCurrentUserStore";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getFollowers } from "../api/users";
import { Followers } from "../Types";

const Main = () => {
  const today = new Date().toISOString().slice(0, 10);
  const { setCurrentUserId, setCurrentUserFollowers } = useCurrentUserStore();

  const { data: currentUser } = useQuery(["currentUser"], async () => {
    const currentUserData = await getCurrentUser();
    setCurrentUserId(currentUserData as string);
  });

  const { data: followers } = useQuery(
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

  console.log("팔로워들", followers);

  const { currentTab } = useMainTabStore();
  return <>{currentTab === "main" ? <DailyCalender /> : <ExplorePeople />}</>;
};

export default Main;
