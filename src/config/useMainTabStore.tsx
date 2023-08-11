import { create } from "zustand";

type MainTabStore = {
  currentTab: string;
  setCurrentTab: (id: string) => void;
};

export const useMainTabStore = create<MainTabStore>()((set) => ({
  currentTab: "main",
  setCurrentTab: (currentTab) => set((state) => ({ currentTab: currentTab })),
}));
