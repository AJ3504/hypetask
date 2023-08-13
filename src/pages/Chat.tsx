import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "../components/Chat/ChatRoom";
import { useUserStore } from "../components/Authentication/Login";

const Chat = () => {
  // 상단 hooks
  const navigate = useNavigate();

  // zustand - state
  const accessToken = useUserStore((state) => state.accessToken);

  // useStates
  const [room, setRoom] = useState<string | undefined>("");
  const [roomPW, setRoomPW] = useState<string | undefined>("");
  const roomInputRef = useRef<HTMLInputElement | null>(null);
  const roomPWInputRef = useRef<HTMLInputElement | null>(null);
  // console.log(accessToken);

  if (!accessToken) {
    alert("로그인 해주세요!");

    setTimeout(() => {
      navigate("/first-main");
    }, 500);

    return null;
  }

  return (
    <div>
      {room && roomPW ? (
        <ChatRoom room={room} roomPW={roomPW} />
      ) : (
        <div className="room">
          <label>Enter Room Name:</label>
          <br />
          <input ref={roomInputRef} />
          <br />
          {/* ---------------------------- */}
          <label>Enter Room Password:</label>
          <br />
          <input ref={roomPWInputRef} type="password" />
          <br />
          <button
            onClick={() => {
              if (roomInputRef.current && roomPWInputRef.current) {
                setRoom(roomInputRef.current.value);
                setRoomPW(roomPWInputRef.current.value);
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
