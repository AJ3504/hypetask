import { FormEvent, Fragment, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Chats } from "../../Types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useUserStore } from "../Authentication/Login";
import {
  InfiniteData,
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
  const fetchChatsForPage = async ({ pageParam = 1 }): Promise<Chats[]> => {
    const response = await getChats({ room, pageParam });
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
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["chats", room],
    queryFn: ({ pageParam }) => fetchChatsForPage({ pageParam }),
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  console.log("data>", data);

  // Post
  const addMutation = useMutation(addChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chats", room]);
    },
  });

  // Event Handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage) {
      setFormError("메시지를 정확히 입력해주세요!");
      return;
    }

    addMutation.mutate({ newMessage, room });
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
        {isFetching && !isFetchingNextPage ? "Fetching..." : null}
        {data?.pages &&
          data.pages[0].map((chat) => (
            <StMessage key={chat.chat_id}>
              <StUser>{chat.username}:</StUser> {chat.text}
              <br />
              <StDate>{prettierCreatedAt(chat.created_at)}</StDate>
            </StMessage>
          ))}
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
