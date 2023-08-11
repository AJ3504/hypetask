import React from "react";
import DailyCalender from "../components/main/DailyCalender";
import ExplorePeople from "../components/main/ExplorePeople";
import { useMainTabStore } from "../config/useMainTabStore";

const Main = () => {
  const { currentTab } = useMainTabStore();
  return <>{currentTab === "main" ? <DailyCalender /> : <ExplorePeople />}</>;
};

export default Main;
