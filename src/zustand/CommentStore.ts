import { create } from "zustand";
import type { CommentStoreType } from "./types";
import * as cApi from "../api/comments";
import { devtools } from "zustand/middleware";

const store = (set: any, get: any) => ({
  comment: [],
  parentCommentContainerWidth: 700,
  isLoading: false,
  numOfComment: 0,
  fetchComments: async (task_id: string, page: number) => {
    set({ isLoading: true });
    set({ comment: await cApi.getComments(task_id, page) });
    set({ isLoading: false });
  },
  fetchReplys: async (comment_id: string, page: number) => {
    let c = [...get().comment];
    const fetchedReplys = await cApi.getReplys(comment_id, page);
    for (let i = 0; i < c.length; i++) {
      if (c[i].comment_id === comment_id) {
        for (let j = 0; j < fetchedReplys.length; j++) {
          c[i].replys.push(fetchedReplys[j]);
        }
      }
    }
    set({ comment: c });
    return fetchedReplys.length;
  },
  setParentCommentContainerWidth(width: number) {
    set({ parentCommentContainerWidth: width });
  },
  setNumOfComment: async (task_id: string) => {
    set({ numOfComment: await cApi.getNumOfComments(task_id) });
  },
});

export const useCommentStore = create<CommentStoreType>(store);

export const useCommentStoreDev = create(devtools(store));
