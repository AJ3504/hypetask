import { Chats } from "../Types";
import supabase from "../config/supabaseClient";

export const getChats = async ({
  room,
  page,
}: {
  room: string;
  page: number;
}) => {
  const response = await supabase
    .from("chats")
    .select("*")
    .eq("roomName", room)
    .range(page * 20, (page + 1) * 20 - 1)
    .order("created_at", { ascending: false });

  console.log(response);
  return response.data;
};

export const addChat = async ({
  newMessage,
  fullName,
  room,
}: {
  newMessage: string;
  fullName: string;
  room: string;
}) => {
  const response = await supabase
    .from("chats")
    .insert([{ text: newMessage, texter: fullName, roomName: room }])
    .select();
  // console.log(response);
};
