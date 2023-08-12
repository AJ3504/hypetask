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
  pageParam,
}: {
  room: string;
  pageParam: number;
}): Promise<Chats[]> => {
  const itemsPerPage = 5;
  const response = await supabase
    .from("chats")
    .select("*")
    .eq("roomName", room)
    .range(pageParam * itemsPerPage, (pageParam + 1) * itemsPerPage - 1)
    .order("created_at", { ascending: false });

  // console.log(response);
  return response.data as Chats[];
};

export const addChat = async ({
  newMessage,
  room,
}: {
  newMessage: string;
  room: string;
}) => {
  const response = await supabase
    .from("chats")
    .insert([{ text: newMessage, roomName: room }])
    .select();
  // console.log(response);
};

// 커밋용
