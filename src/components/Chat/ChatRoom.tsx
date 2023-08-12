import { FormEvent, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Chats } from "../../Types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useUserStore } from "../Authentication/Login";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addChat, getChats } from "../../api/chats";
import { styled } from "styled-components";

type ChatRoomProps = {
  room: string;
};

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
  const { room } = props;
  // useStates + hooks
  const [newMessage, setNewMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Chats[]>([]);
  const queryClient = useQueryClient();
  const fullName = useUserStore((state) => state.fullName);

  // useInfiniteQuery
  // getChats -> fetchChats 재정의
  const fetchChatsForPage = async ({ pageParam = 0 }): Promise<Chats[]> => {
    const response = await getChats({ room, page: pageParam });
    // console.log(response);
    return response;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["chats", room],
    queryFn: ({ pageParam }) => fetchChatsForPage({ pageParam }), // pageParam을 매개변수로 받아서 fetchChatsForPage를 호출
    getNextPageParam: (lastPage) => {
      // console.log("getNextPageParam 함수 호출>");
      // console.log("lastPage> ", lastPage);
      if (lastPage[0]?.lastPage.page < lastPage[0]?.lastPage.total_pages) {
        return lastPage[0].lastPage.page + 1;
      }
    }, // fetchChatsForPage의 response -> 캐시 context 속 pages [], pageParams [] 속에 들어감
  });
  console.log("data>", data);

  // Post
  const addMutation = useMutation(addChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chats", room]); // dB onsuccess시, 쿼리컨텍스트 속 stale data를 새것으로 교체해줘
    },
  });

  // Event Handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage) {
      setFormError("메시지를 정확히 입력해주세요!");
      return;
    }

    addMutation.mutate({ newMessage, fullName, room });
    setNewMessage("");
  };

  const prettierCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      // year: "numeric",
      // month: "long",
      // day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <StChatApp>
      <StHeader>
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </StHeader>
      <StMessages>
        {/* {data.map((chat) => (
          <StMessage key={chat.chat_id}>
            <StUser>{chat.texter}:</StUser> {chat.text}
            <br />
            <StDate>{prettierCreatedAt(chat.created_at)}</StDate>
          </StMessage>
        ))} */}
      </StMessages>
      <button onClick={fetchMore}>더보기</button>
      <StNewMessageForm onSubmit={handleSubmit}>
        <StNewMessageInput
          placeholder="메세지를 입력해주세요..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <StSendButton type="submit">전송</StSendButton>

        {formError && <p className="error">{formError}</p>}
      </StNewMessageForm>
    </StChatApp>
  );
};

export default ChatRoom;

export const StChatApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid #3b5998;
  background-color: #b4b4cd;
`;

export const StHeader = styled.div`
  background-color: #3b5998;
  color: white;
  width: 100%;
  text-align: center;
`;
export const StMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 80%;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
`;
export const StMessage = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
`;
export const StUser = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #333;
`;
export const StDate = styled.span`
  font-size: 10px;
  margin-left: 5px;
  color: lightgray;
  position: relative;
  top: 3px;
`;
export const StNewMessageForm = styled.form`
  display: flex;
  width: 100%;
  padding: 10px;
`;
export const StNewMessageInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  padding: 10px;
  border-radius: 5px 0 0 5px;
`;
export const StSendButton = styled.button`
  border: none;
  outline: none;
  background: #3b5998;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
