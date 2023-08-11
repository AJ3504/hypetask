import { create } from "zustand";
interface UserStore {
  fullName: string;
  accessToken: string | null;
  setFullName: (name: string) => void;
  setAccessToken: (token: string | null) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  fullName: "",
  accessToken: null,
  setFullName: (name) => set(() => ({ fullName: name })),
  setAccessToken: (token) => set(() => ({ accessToken: token })),
}));
