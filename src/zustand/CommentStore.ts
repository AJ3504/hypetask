import { create } from "zustand";
import type { CommentStoreType } from "./types";
import * as cApi from "../api/comments";
import { devtools } from "zustand/middleware";
import { Comment } from "../Types";
function findAndAppendCommentArr(
  c: Comment[],
  targetId: string,
  fetchedReplys: Comment[],
  level: number
) {
  for (let i = 0; i < c.length; i++) {
    if (!c || c.length === 0) {
      break;
    }
    if (c[i]!.comment_id === targetId) {
      let cm = [...c[i].replys!, ...fetchedReplys];
      c[i].replys = cm;
      break;
    }
    findAndAppendCommentArr(c[i].replys!, targetId, fetchedReplys, level + 1);
  }
}
function findAndAppendComment(c: Comment[], targetId: string, reply: Comment) {
  for (let i = 0; i < c.length; i++) {
    if (!c) {
      continue;
    }
    if (c[i]!.comment_id === targetId) {
      let cm = [...c[i].replys!, reply];
      c[i].replys = cm;
      c[i].num_of_reply!++;
      return;
    }
    findAndAppendComment(c[i].replys!, targetId, reply);
  }
}
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
    console.log(comment_id + "불림");
    let c: Comment[] = [...get().comment];
    const fetchedReplys = await cApi.getReplys(comment_id, page);
    findAndAppendCommentArr(c, comment_id, fetchedReplys, 0);
    console.log(c);
    set({ comment: c });
    return fetchedReplys.length;
  },
  setParentCommentContainerWidth(width: number) {
    set({ parentCommentContainerWidth: width });
  },
  setNumOfComment: async (user_id: string, date: string) => {
    set({ numOfComment: await cApi.getNumOfComments(date, user_id) });
  },
  writeComment: async (data: Comment) => {
    let insertedData = await cApi.writeComment(data);
    let c = [...get().comment];
    //누군가를 참조하는 댓글이면 맨아래에 붙인다
    if (insertedData.ref_id) {
      findAndAppendComment(c, insertedData.ref_id, insertedData);
      set({ comment: c });
      return;
    }
    //아니면 최상위에 붙인다
    c.unshift(insertedData);
    set({ comment: c });
  },
});

export const useCommentStore = create<CommentStoreType>(store);

export const useCommentStoreDev = create(devtools<CommentStoreType>(store));
