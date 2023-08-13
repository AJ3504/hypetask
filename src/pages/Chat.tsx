import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "../components/Chat/ChatRoom";
import { useUserStore } from "../components/Authentication/Login";
import OpenChatList from "../components/Chat/OpenChatList";
import MyChatList from "../components/Chat/MyChatList";

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
      <div className="상단_채팅방입장">
        {room && roomPW ? (
          <ChatRoom room={room} roomPW={roomPW} />
        ) : (
          <section style={{ marginBottom: "30px" }}>
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
        )}
      </div>
      {/* --------------------------------------------- */}
      <div className="하단_오픈채팅목록" style={{ backgroundColor: "yellow" }}>
        <section className="탭">
          <div style={{ display: "flex" }}>
            <span
              style={{
                backgroundColor:
                  activeTab === "myChat" ? "darkolivegreen" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleTabChange("myChat")}
            >
              My Chat
            </span>
            <span
              style={{
                backgroundColor:
                  activeTab === "openChat" ? "darkolivegreen" : "transparent",
                marginLeft: "20px",
                cursor: "pointer",
              }}
              onClick={() => handleTabChange("openChat")}
            >
              Open Chat
            </span>
          </div>
        </section>
        {/* ------------------------------------------------------------------- */}
        <section className="활성화컴포넌트" style={{ border: "solid black" }}>
          {activeTab === "openChat" && (
            <OpenChatList room={room} roomPW={roomPW} />
          )}
          {activeTab === "myChat" && <MyChatList room={room} roomPW={roomPW} />}
        </section>
      </div>
    </>
  );
};

export default Chat;
