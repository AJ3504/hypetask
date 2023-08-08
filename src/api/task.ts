import supabase from "../config/supabaseClient";
/**
 *
 * @string desc 내용
 * @string title 제목
 * @param start_time 시작시간 HH
 * @param end_time 종료시간 HH
 * @param user_id 제목
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
