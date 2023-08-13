import { FormEvent, Fragment, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addChat, getRealTimeChats } from "../../api/chats";
import { Chats } from "../../Types";
import { useRoomStore } from "../../config/useRoomStore";
import {
  StChatContainer,
  StDate,
  StHeader,
  StMessage,
  StMessages,
  StNewMessageForm,
  StNewMessageInput,
  StSendButton,
  StText,
  StUser,
} from "./chatstyle/ChatRoomStyle";

const ChatRoom: React.FC = () => {
  // useStates + hooks
  const [newMessage, setNewMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // zustand - room, roomPW
  const room = useRoomStore((state) => state.room);
  const roomPW = useRoomStore((state) => state.roomPW);

  // useQuery
  // Get
  const {
    isLoading,
    isError,
    data: chats,
  } = useQuery(["chats", room, roomPW], () =>
    getRealTimeChats({ room, roomPW })
  );
  // console.log(chats);

  // Post
  const addMutation = useMutation(addChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chats", room, roomPW]);
    },
  });

  if (isLoading || isLoading) {
    return <h1>로딩중입니다.</h1>;
  }

  if (isError || isError) {
    return <h1>오류가 발생했습니다.</h1>;
  }

  // Event Handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage) {
      setFormError("메시지를 정확히 입력해주세요!");
      return;
    }

    addMutation.mutate({ newMessage, room, roomPW });
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

  return (
    <StChatContainer>
      <StHeader>
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </StHeader>
      <StMessages>
        {chats?.map((chat) => (
          <StMessage key={chat.chat_id}>
            <StUser>{chat.username}:</StUser> <StText>{chat.text}</StText>
            <br />
            <StDate>{prettierCreatedAt(chat.created_at)}</StDate>
          </StMessage>
        ))}
      </StMessages>
      <StNewMessageForm onSubmit={handleSubmit}>
        <StNewMessageInput
          placeholder="메세지를 입력해주세요..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <StSendButton type="submit">전송</StSendButton>

        {formError && <p className="error">{formError}</p>}
      </StNewMessageForm>
    </StChatContainer>
  );
};

export default ChatRoom;
