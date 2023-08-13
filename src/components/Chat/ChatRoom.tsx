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
import { getChats } from "../../api/chats";
import { styled } from "styled-components";
import ChatInputForm from "./ChatInputForm";
import ChatLog from "./ChatLog";

type ChatRoomProps = {
  room: string;
};

const ChatRoom: React.FC<ChatRoomProps> = (props) => {
  const { room } = props;

  return (
    <StChatApp>
      <StHeader>
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </StHeader>
      <ChatLog room={room} />
      <ChatInputForm room={room} />
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
