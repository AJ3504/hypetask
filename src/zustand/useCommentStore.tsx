import { create } from "zustand";

type CommentStore = {
  myComments: Comment[];
  setMyComments: (myComments: Comment[]) => void;
};

export const useCommentStore = create<CommentStore>()((set) => ({
  myComments: [],
  setMyComments: (myComments) => set((state) => ({ myComments: myComments })),
}));
