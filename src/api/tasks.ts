import supabase from "../config/supabaseClient";

export interface Tasks {
  task_id: string;
  created_at: string;
  title: string;
  desc: string;
  done: boolean;
  start_time: number;
  end_time: number;
  date: string;
  user_id: string;
}

export const getMyTasks = async (
  myId: string,
  date: string
): Promise<Tasks[] | null> => {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", myId)
    .eq("date", date);
  return tasks;
};

export const getFollowersTasks = async (
  date: string,
  userIds: string[]
): Promise<Tasks[] | null> => {
  console.log("111", date);
  console.log("sss", userIds);
  const { data: followersTasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("date", date)
    .in("user_id", userIds);
  console.log(followersTasks);
  return followersTasks;
};
