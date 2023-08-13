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
  task?: Tasks;
};
export type User = {
  user_id: string;
  created_at: string;
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
export type Tasks = {
  task_id: string | undefined;
  created_at?: string;
  title: string;
  desc: string;
  done?: boolean;
  start_time: number;
  end_time: number;
  date: string;
  user_id: string | undefined;
  detail_on?: boolean;
};
