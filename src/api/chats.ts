import { Chats } from "../Types";
import supabase from "../config/supabaseClient";

// 1. 실시간 채팅방
export const getRealTimeChats = async ({
  room,
  roomPW,
}: {
  room: string;
  roomPW: string;
}) => {
  const response = await supabase
    .from("chats")
    .select("* ,user:user_id(*)")
    .eq("roomName", room)
    .eq("roomPW", roomPW)
    .order("created_at");
  // console.log(""response);
  return response.data;
};

export const addChat = async ({
  newMessage,
  room,
  roomPW,
  userId,
}: {
  newMessage: string;
  room: string;
  roomPW: string;
  userId: string;
}) => {
  const response = await supabase
    .from("chats")
    .insert([
      { text: newMessage, roomName: room, roomPW: roomPW, user_id: userId },
    ])
    .select();
  return response;
};

// 2. 채팅내역 리스트방
export const getChats = async ({
  room,
  roomPW,
  pageParam,
}: {
  room: string;
  roomPW: string;
  pageParam: number;
}): Promise<Chats[]> => {
  const itemsPerPage = 5;
  const startIndex = pageParam * itemsPerPage;
  const endIndex = startIndex + itemsPerPage - 1;

  const response = await supabase // 여기서의 reponse: 그냥 data가 아니라 pages 데이터
    .from("chats")
    .select("*")
    .eq("roomName", room)
    .eq("roomPW", roomPW)
    .range(startIndex, endIndex)
    .order("created_at");

  console.log(response.data); // 만약 총 챗개수가 15개라면, 3개 덩어리로 잘라져서 옴 -> response.data = [ 0: [{}, {}, {}, {}, {}], 1: [{}, {}, {}, {}, {}], 2: [{}, {}, {}, {}, {}] ]
  return response.data as Chats[];
};
