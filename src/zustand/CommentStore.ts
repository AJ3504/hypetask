import { create } from "zustand";
import type { CommentStoreType } from "./types";
export const useCommentStore = create<CommentStoreType>((set, get) => ({
  comment: [],
  parentCommentContainerWidth: 600,
  fetchComments: async (task_id) => {},
  setParentCommentContainerWidth(width) {
    set({ parentCommentContainerWidth: width });
  },
}));
