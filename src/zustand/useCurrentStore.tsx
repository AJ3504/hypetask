import { create } from "zustand";

type CurrentStore = {
  currentUserFollowers: string[];
  setCurrentUserFollowers: (ids: string[]) => void;
  currentDetailId: string;
  setCurrentDetailId: (id: string) => void;
};

export const useCurrentStore = create<CurrentStore>()((set) => ({
  currentUserFollowers: [],
  setCurrentUserFollowers: (ids) =>
    set((state) => ({ currentUserFollowers: ids })),
  currentDetailId: "",
  setCurrentDetailId: (id) => set((state) => ({ currentDetailId: id })),
}));
