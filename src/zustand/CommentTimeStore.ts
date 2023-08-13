import { create } from "zustand";
import type { CommentTimeStoreType } from "./types";
import * as cApi from "../api/comments";
import { devtools } from "zustand/middleware";
import { Comment } from "../Types";
import type { Tasks } from "../Types";

const store = (set: any, get: any) => ({
  clickedTask: null,
  setClickedTime: (tasks: Tasks) => {
    set({ clickedTask: tasks });
  },
});
export const useCommentTimeStore = create<CommentTimeStoreType>(store);

export const useCommentTimeStoreDev = create(
  devtools<CommentTimeStoreType>(store)
);
