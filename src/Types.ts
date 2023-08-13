export interface Chats {
  chat_id: string;
  text: string;
  created_at: string;
  user_id: string;
  texter: string;
  roomName: string;
}

export type Comment = {
  user_id: string;
  comment_id?: string;
  task_id?: string;
  created_at?: string;
  comment: string;
  ref_step: number;
  ref_id?: string | null;
  time_ref?: number;
  replys?: Comment[];
  num_of_reply?: number;
  user?: User;
  date: string;
  checked?: boolean;
  ref_user_id: string;
};
export type User = {
  user_id: string;
  created_at: string;
  name: string;
  img_url: string;
  email: string;
  username: string;
};

export interface Days {
  day_id: string;
  created_at: string;
  time: string;
  user_id: string;
}
export interface Followers {
  from: string;
  to: string;
  follow_id: string;
}
export interface Likes {
  like_id: string;
  task_id: string;
  user_id: string;
  created_at: string;
}
export interface Tasks {
  todo_id: string;
  created_at: string;
  days_id: string;
  desc: string;
  title: string;
  done: boolean;
}
