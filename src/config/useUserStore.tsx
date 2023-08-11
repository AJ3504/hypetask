import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../Types";
import { devtools } from "zustand/middleware";
const StorageKey = "userStoreKey";
type UserStore = {
  user_id: string | null;
  user: User | null;
  accessToken: string | null;
  setUserId: (uset_id: string) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
};
const store = (set: any) => ({
  user_id: "",
  user: null,
  accessToken: null,
  setUserId: (user_id: string) => set({ user_id: user_id }),
  setAccessToken: (accessToken: string) => set({ accessToken: accessToken }),
  setUser: (user: User) => set({ user: user }),
});
const persistStore = persist<UserStore>(store, {
  name: StorageKey,
});
export const useUserStore = create(devtools(persistStore));
