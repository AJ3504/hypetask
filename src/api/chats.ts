import { Chats } from "../Types";
import supabase from "../config/supabaseClient";

//원래
// const originalGetChats = async ({ room }: { room: string }) => {
//   const response = await supabase
//     .from("chats")
//     .select("*")
//     .eq("roomName", room);
//   // console.log(response);
//   return response.data;
// };

// const {
//   isLoading,
//   isError,
//   data: chats,
// } = useQuery(["chats", room], () => getChats({ room }));
// // console.log(chats);
// useEffect(() => {
//   if (chats) {
//     setMessages(chats);
//   }
// }, [chats]);

export const getChats = async ({
  room,
  page,
}: {
  room: string;
  page: number;
}): Promise<Chats[]> => {
  const response = await supabase
    .from("chats")
    .select("*")
    .eq("roomName", room);
  // .range(page * 2, (page + 1) * 2 - 1) // url?page=1과 비슷한 로직
  // .order("created_at", { ascending: false });

  // console.log(response);
  return response.data as Chats[];
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
