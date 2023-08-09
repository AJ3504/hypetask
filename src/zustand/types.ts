import type { CommentType } from "../api/types";
export type CommentStoreType = {
  parentCommentContainerWidth: number;
  comment: CommentType[];
  fetchComments: (task_id: string) => void;
  setParentCommentContainerWidth: (width: number) => void;
};
