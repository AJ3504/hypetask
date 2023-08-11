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
    .eq("to", myId);
  return followers;
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.identities![0].id;
};
