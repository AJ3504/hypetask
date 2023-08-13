import { create } from "zustand";

type RoomStore = {
  room: string;
  roomPW: string;
  setRoom: (room: string) => void;
  setRoomPW: (roomPW: string) => void;
};

export const useRoomStore = create<RoomStore>((set) => ({
  room: "",
  roomPW: "",
  setRoom: (room) => set({ room }),
  setRoomPW: (roomPW) => set({ roomPW }),
}));
