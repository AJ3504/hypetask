import { create } from "zustand";

type ModalStore = {
  addTaskModalVisible: boolean;
  changeAddTaskModalstatus: () => void;
  alertModalVisible: boolean;
  changeAlertModalstatus: (status: boolean) => void;
};

export const useModalStore = create<ModalStore>()((set) => ({
  addTaskModalVisible: false,
  changeAddTaskModalstatus: () =>
    set((state) => ({ addTaskModalVisible: !state.addTaskModalVisible })),
  alertModalVisible: false,
  changeAlertModalstatus: (status) =>
    set((state) => ({ alertModalVisible: status })),
}));