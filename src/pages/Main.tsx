import React from "react";
import { useMainTabStore } from "../zustand/useMainTabStore";

import DailyCalender from "../components/Main/DailyCalender";
import ExplorePeople from "../components/Main/ExplorePeople";

import { useCurrentFollowerStore } from "../zustand/useCurrentFollowerStore";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getFollowers } from "../api/users";
import { Followers } from "../Types";
import { useUserStore } from "../zustand/useUserStore";

const Main = () => {
  const { setCurrentUserFollowers } = useCurrentFollowerStore();
  const { setUserId, user_id } = useUserStore();

  const { data: followers, isLoading } = useQuery(
    ["followers"],
    async () => {
      const followersData = await getFollowers(user_id!);
      let temp: string[] = [];
      for (let i = 0; i < followersData.length; i++) {
        temp.push(followersData[i].to);
      }
      setCurrentUserFollowers(temp);
      return followersData;
    },
    {
      enabled: !!user_id,
    }
  );

  const { currentTab } = useMainTabStore();

  if (isLoading) {
    return <div>로딩중...!</div>;
  }
  return <>{currentTab === "main" ? <DailyCalender /> : <ExplorePeople />}</>;
};

export default Main;
