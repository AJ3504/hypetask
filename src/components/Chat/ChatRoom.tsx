import { FormEvent, useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Chats } from "../../Types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useUserStore } from "../Authentication/Login";

const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [chats, setChats] = useState<Chats[] | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // fetching data
  useEffect(() => {
    const fetchChats = async () => {
      let { data: chats, error } = await supabase.from("chats").select("*");
      // console.log("chats>", chats);

      if (error) {
        setFetchError("데이터 불러오기 실패");
        setChats(null);
        console.log(error);
      }

      if (chats) {
        setChats(chats);
        setFetchError(null);
      }
    };

    fetchChats();
  }, []);

  // Event Handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!newMessage) {
        setFormError("메시지를 정확히 입력해주세요!");
        return;
      }
      const { data, error } = await supabase
        .from("chats")
        .insert([{ text: newMessage }])
        .select();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="메세지를 입력해주세요..."
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">전송</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default ChatRoom;
