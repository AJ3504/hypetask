export type userType = {
  user_id: string;
  created_at: string;
  name: string;
  img_url: string;
  email: string;
};
export type CommentType = {
  user?: userType;
  user_id?: string;
  comment_id?: string;
  task_id?: string;
  created_at?: string;
  comment?: string;
  ref_step: number;
  ref_id?: string;
  time_ref?: number;
};
