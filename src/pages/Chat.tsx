import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "../components/Chat/ChatRoom";
import { useUserStore } from "../zustand/useUserStore";

const Chat = () => {
  // 상단 hooks
  const navigate = useNavigate();

  // zustand - state
  const accessToken = useUserStore((state) => state.accessToken);

  // useStates
  const [room, setRoom] = useState<string | undefined>("");
  const roomInputRef = useRef<HTMLInputElement | null>(null);
  console.log(accessToken);

  if (!accessToken) {
    alert("로그인 해주세요!");

    setTimeout(() => {
      navigate("/first-main");
    }, 500);

    return null;
  }

  return (
    <div>
      {room ? (
        <ChatRoom room={room} />
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <br />
          <input ref={roomInputRef} />
          <br />
          <button
            onClick={() => {
              if (roomInputRef.current) {
                setRoom(roomInputRef.current.value);
              }
            }}
          >
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
