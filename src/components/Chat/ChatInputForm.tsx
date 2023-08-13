import { FormEvent, Fragment, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Chats } from "../../Types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChat, getChats } from "../../api/chats";
import { styled } from "styled-components";

type ChatRoomProps = {
  room: string;
};

const ChatInputForm: React.FC<ChatRoomProps> = (props) => {
  const { room } = props;
  // useStates + hooks
  const [newMessage, setNewMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  return (
    <StNewMessageForm onSubmit={handleSubmit}>
      <StNewMessageInput
        placeholder="메세지를 입력해주세요..."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <StSendButton type="submit">전송</StSendButton>

      {formError && <p className="error">{formError}</p>}
    </StNewMessageForm>
  );
};

export default ChatInputForm;

//-----------------------------------//

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
