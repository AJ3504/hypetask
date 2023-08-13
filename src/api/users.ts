import { User } from "../Types";
import supabase from "../config/supabaseClient";

export interface Followers {
  from: string;
  to: string;
  follow_id: string;
}

export const getFollowers = async (
  myId: string
): Promise<Followers[] | null> => {
  const { data: followers } = await supabase
    .from("followers")
    .select("*")
    .eq("from", myId);
  return followers;
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.identities![0].id;
};

export const getAllUser = async (): Promise<User[]> => {
  const { data: allUser } = await supabase.from("profiles").select("*");
  return allUser as User[];
};

export const addFollower = async (from: string, to: string): Promise<void> => {
  await supabase
    .from("followers")
    .insert([{ from: from, to: to }])
    .select();
};

export const deleteFollower = async (
  from: string,
  to: string
): Promise<void> => {
  await supabase.from("followers").delete().eq("from", from).eq("to", to);
};

export const addUser = async (userUid: string, metadata: any) => {
  const { data, error } = await supabase.from("profiles").insert({
    user_id: userUid,
    username: metadata.username!,
    img_url: metadata.avatar_url!,
  });
  console.log(data);
  if (error) {
    console.error(error);
  }
};
export const checkUser = async (user_id: string) => {
  const result = await supabase
    .from("profiles")
    .select("count")
    .eq("user_id", user_id!);
  return result.data![0].count;
};
