import supabase from "../config/supabaseClient";
export async function follow(): Promise<string> {
  const result = await supabase
    .from("users")
    .insert({ name: "muhammad", img_url: "wfew" });
  return result.toString();
}
