import React from "react";

import { useMainTabStore } from "../config/useMainTabStore";
import DailyCalender from "../components/Main/DailyCalender";
import ExplorePeople from "../components/Main/ExplorePeople";
import { useUserStore } from "../config/useUserStore";
const Main = () => {
  const { currentTab } = useMainTabStore();
  return <>{currentTab === "main" ? <DailyCalender /> : <ExplorePeople />}</>;
};

export default Main;
