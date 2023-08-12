import supabase from "../config/supabaseClient";

export const getChats = async ({ room }: { room: string }) => {
  const response = await supabase
    .from("chats")
    .select("*")
    .eq("roomName", room);
  // console.log(response);
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

// 커밋용
