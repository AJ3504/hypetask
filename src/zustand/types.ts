import type { Comment } from "../Types";
export type CommentStoreType = {
  parentCommentContainerWidth: number;
  comment: Comment[] | null;
  numOfComment: number | null;
  isLoading: boolean;
  fetchComments: (task_id: string, page: number) => Promise<void>;
  fetchReplys: (comment_id: string, page: number) => Promise<number>;
  setParentCommentContainerWidth: (width: number) => void;
  setNumOfComment: (task_id: string) => Promise<void>;
};
