export interface Comments {
  comment_id: string;
  task_id: string;
  user_id: string;
  created_at: string;
  comment: string;
  day_id: string;
}
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
  task_id: string;
  created_at: string;
  desc: string;
  title: string;
  done: boolean;
  start_time: string;
  end_time: string;
  date: string;
  user_id: string;
}
export interface Users {
  user_id: string;
  created_at: string;
  name: string;
  img_url: string;
}
