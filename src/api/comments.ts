import supabase from "../config/supabaseClient";

export const getComments = async (task_id: string) => {
  const result = await supabase
    .from("comments")
    .select("*")
    .eq("task_id", task_id)
    .eq("ref_step", 0); //대댓글은 안가져옴
  console.log(result);
  return result;
};

export const getReplyComments = async (task_id: string, comment_id: string) => {
  const result = await supabase
    .from("comments")
    .select("*")
    .eq("task_id", task_id)
    .eq("ref_id", comment_id);
  console.log(result);
  return result;
};
