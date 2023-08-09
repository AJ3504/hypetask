import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "../components/Chat/ChatRoom";

const Chat = () => {
  // 상단 hooks
  const navigate = useNavigate();

  const userToken = localStorage.getItem("userToken");

  // const [isAuth, setIsAuth] = useState(userToken);
  const [room, setRoom] = useState<string | undefined>();

  const roomInputRef = useRef<HTMLInputElement | null>(null);

  if (!userToken) {
    alert("로그인 해주세요!");
    navigate("/");
    return null;
  }

  return (
    <div>
      {room ? (
        <ChatRoom />
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
