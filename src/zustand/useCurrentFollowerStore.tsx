import { create } from "zustand";

type CurrentFollowerStore = {
  currentUserFollowers: string[];
  setCurrentUserFollowers: (ids: string[]) => void;
};

export const useCurrentFollowerStore = create<CurrentFollowerStore>()(
  (set) => ({
    currentUserFollowers: [],
    setCurrentUserFollowers: (ids) =>
      set((state) => ({ currentUserFollowers: ids })),
  })
);
