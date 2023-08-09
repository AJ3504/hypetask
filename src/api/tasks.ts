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
  const { data: followersTasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("date", date)
    .in("user_id", userIds);
  return followersTasks;
};

/**
 *
 * @param {string} desc 내용
 * @param {string} title 제목
 * @param {number} start_time 시작시간 HH
 * @param {number} end_time 종료시간 HH
 * @param {string} user_id 유저아이디
 * @returns 성공여부
 */
export async function addTask({
  desc,
  title,
  start_time,
  end_time,
  date,
  user_id,
}: {
  desc: string;
  title: string;
  start_time: number;
  end_time: number;
  date: string;
  user_id: string;
}) {
  let data = {
    desc: desc,
    title: title,
    start_time: start_time,
    end_time: end_time,
    date: date,
    user_id: user_id,
  };
  const result = await supabase.from("tasks").insert(data);
  return result;
}
