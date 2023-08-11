import supabase from "../config/supabaseClient";
export async function follow(): Promise<string> {
  const result = await supabase.from("auth.users").select("*");
  console.log(result);
  return result.toString();
}
