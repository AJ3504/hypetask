import { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatRoom from "../components/Chat/ChatRoom";
import { useUserStore } from "../components/Authentication/Login";
import { useRoomStore } from "../config/useRoomStore";

const Chat = () => {
  // 상단 hooks
  const navigate = useNavigate();

  // zustand - state
  const accessToken = useUserStore((state) => state.accessToken);

  // useStates
  // const [room, setRoom] = useState<string | undefined>("");
  // const [roomPW, setRoomPW] = useState<string | undefined>("");
  const room = useRoomStore((state) => state.room);
  const roomPW = useRoomStore((state) => state.roomPW);
  const setRoom = useRoomStore((state) => state.setRoom);
  const setRoomPW = useRoomStore((state) => state.setRoomPW);

  const roomInputRef = useRef<HTMLInputElement | null>(null);
  const roomPWInputRef = useRef<HTMLInputElement | null>(null);
  const [activeTab, setActiveTab] = useState<"openChat" | "myChat">("openChat");

  // console.log(accessToken);
  if (!accessToken) {
    alert("로그인 해주세요!");

    setTimeout(() => {
      navigate("/first-main");
    }, 500);

    return null;
  }

  // Event Handler
  const handleTabChange = (tab: "myChat" | "openChat") => {
    setActiveTab(tab);
  };

  return (
    <>
      <div
        className="상단_오픈채팅목록_페이지"
        style={{ border: "solid", borderRadius: "10px", marginTop: "30px" }}
      >
        <section className="탭">
          <div style={{ display: "flex" }}>
            <span
              style={{
                backgroundColor:
                  activeTab === "openChat" ? "darkolivegreen" : "transparent",
                marginLeft: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleTabChange("openChat");
                navigate("/chat/openChat");
              }}
            >
              Open Chat
            </span>
            {/* ---- */}
            <span
              style={{
                backgroundColor:
                  activeTab === "myChat" ? "darkolivegreen" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                handleTabChange("myChat");
                navigate("/chat/myChat");
              }}
            >
              My Chat
            </span>
          </div>
        </section>
      </div>
      {/* --------------------------------------------- */}
      <div
        className="하단_채팅방입장_페이지"
        style={{ border: "solid", borderRadius: "10px", marginTop: "30px" }}
      >
        {!room || !roomPW ? (
          <section>
            <label>Enter Room Name:</label>
            <input ref={roomInputRef} />
            {/* ---------------------------- */}
            <label style={{ marginLeft: "20px" }}>Enter Room Password:</label>
            <input ref={roomPWInputRef} type="password" />
            <button
              onClick={() => {
                if (roomInputRef.current && roomPWInputRef.current) {
                  setRoom(roomInputRef.current.value);
                  setRoomPW(roomPWInputRef.current.value);
                }
              }}
              style={{ marginLeft: "20px" }}
            >
              Enter Chat
            </button>
          </section>
        ) : (
          <ChatRoom room={room} roomPW={roomPW} />
        )}
      </div>
    </>
  );
};

export default Chat;
