import { create } from "zustand";

type ModalStore = {
  addTaskModalVisible: boolean;
  changeAddTaskModalstatus: () => void;
};

export const useModalStore = create<ModalStore>()((set) => ({
  addTaskModalVisible: false,
  changeAddTaskModalstatus: () =>
    set((state) => ({ addTaskModalVisible: !state.addTaskModalVisible })),
}));
