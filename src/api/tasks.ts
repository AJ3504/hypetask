import supabase from "../config/supabaseClient";

export interface Tasks {
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
}

export const getMyTasks = async (
  myId: string,
  date: string
): Promise<Tasks[] | null> => {
  console.log(myId, date);
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", myId)
    .eq("date", date);
  return tasks as Tasks[];
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
  console.log(result);
  return result;
}

export const updateTask = async (newTask: Tasks): Promise<void> => {
  await supabase
    .from("tasks")
    .update({
      title: newTask.title,
      desc: newTask.desc,
      date: newTask.date,
      start_time: newTask.start_time,
      end_time: newTask.end_time,
      user_id: newTask.user_id,
      detail_on: false,
    })
    .eq("task_id", newTask.task_id)
    .select();
};

export const updateDone = async ({
  taskId,
  done,
}: {
  taskId: string;
  done: boolean;
}): Promise<void> => {
  await supabase
    .from("tasks")
    .update({ done: !done })
    .eq("task_id", taskId)
    .select();
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await supabase.from("tasks").delete().eq("task_id", taskId);
};

export const updateDetailOn = async ({
  taskId,
  on,
}: {
  taskId: string;
  on: boolean;
}): Promise<void> => {
  await supabase
    .from("tasks")
    .update({ detail_on: !on })
    .eq("task_id", taskId)
    .select();
};
