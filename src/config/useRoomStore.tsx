import { create } from "zustand";

type RoomStore = {
  room: string | undefined;
  roomPW: string | undefined;
  setRoom: (room: string) => void;
  setRoomPW: (roomPW: string) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  room: "",
  roomPW: "",
  setRoom: (room) => set({ room }),
  setRoomPW: (roomPW) => set({ roomPW }),
}));
