import { create } from "zustand";
import type { CommentStoreType } from "./types";
import * as cApi from "../api/comments";
import { devtools } from "zustand/middleware";
import { Comment } from "../Types";
const store = (set: any, get: any) => ({
  comment: [],
  parentCommentContainerWidth: 700,
  isLoading: false,
  numOfComment: 0,
  fetchComments: async (date: string, user_id: string, page: number) => {
    set({ isLoading: true });
    set({ comment: await cApi.getComments(date, user_id, page) });
    set({ isLoading: false });
  },
  fetchReplys: async (comment_id: string, page: number) => {
    let c = [...get().comment];
    const fetchedReplys = await cApi.getReplys(comment_id, page);
    function find(commentArr: Comment[]) {}
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
  addComment: (comment: Comment, ref?: HTMLDivElement | null) => {},
  setParentCommentContainerWidth(width: number) {
    set({ parentCommentContainerWidth: width });
  },
  setNumOfComment: async (user_id: string, date: string) => {
    set({ numOfComment: await cApi.getNumOfComments(date, user_id) });
  },
});

export const useCommentStore = create<CommentStoreType>(store);

export const useCommentStoreDev = create(devtools(store));
