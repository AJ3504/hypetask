import supabase from "../config/supabaseClient";

export const getTasks = async (date: string) => {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("date", date);
  return tasks;
};
