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

// -fullName: 구글로그인(o) 일반로그인(x)
// -token: 일반로그인(o) 구글로그인(x)
