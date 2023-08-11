import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../Types";

const StorageKey = "userStoreKey";
type CurrentUserStore = {
  currentUserId: string;
  user: User | null;
  setCurrentUserId: (id: string) => void;
};

export const useCurrentUserStore = create(
  persist<CurrentUserStore>(
    (set) => ({
      currentUserId: "",
      user: null,
      setCurrentUserId: (id) => set((state) => ({ currentUserId: id })),
    }),
    {
      name: StorageKey,
    }
  )
);
