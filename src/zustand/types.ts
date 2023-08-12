import type { Comment } from "../Types";
export type CommentStoreType = {
  parentCommentContainerWidth: number;
  comment: Comment[] | null;
  numOfComment: number | null;
  isLoading: boolean;
  changeOccured: boolean;
  fetchComments: (date: string, user_id: string, page: number) => Promise<void>;
  fetchReplys: (comment_id: string, page: number) => Promise<number>;
  setParentCommentContainerWidth: (width: number) => void;
  setNumOfComment: (user_id: string, date: string) => Promise<void>;
  writeComment: (data: Comment) => Promise<void>;
};
