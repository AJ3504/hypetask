import { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatRoom from "../components/Chat/ChatRoom";
import { useUserStore } from "../components/Authentication/Login";
import { useRoomStore } from "../config/useRoomStore";
import { SB, ST } from "../components/Chat/chatstyle/ChatStyle";

const Chat = () => {
  // 상단 hooks
  const navigate = useNavigate();

  // zustand
  const accessToken = useUserStore((state) => state.accessToken);
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
      <ST.TabContainer>
        <ST.TabContainerInner>
          <ST.OpenChatTab
            style={{
              padding: "3px",
              backgroundColor:
                activeTab === "openChat" ? "#4f6529" : "transparent",
            }}
            onClick={() => {
              handleTabChange("openChat");
              navigate("/chat/openChat");
            }}
          >
            Open Chat
          </ST.OpenChatTab>
          <ST.MyChatTab
            style={{
              padding: "3px",
              backgroundColor:
                activeTab === "myChat" ? "#4f6529" : "transparent",
            }}
            onClick={() => {
              handleTabChange("myChat");
              navigate("/chat/myChat");
            }}
          >
            My Chat
          </ST.MyChatTab>
        </ST.TabContainerInner>
      </ST.TabContainer>
      {/* --------------------------------------------- */}
      <SB.ChatContainer>
        <SB.ChatContainerInner>
          {!room || !roomPW ? (
            <SB.RoomInfoContainer>
              <SB.RoomNameLabel>Enter Room Name:</SB.RoomNameLabel>
              <SB.RoomNameInput ref={roomInputRef} />
              <SB.RoomPWLabel>Enter Room Password:</SB.RoomPWLabel>
              <SB.RoomPWInput ref={roomPWInputRef} type="password" />
              <SB.Button
                onClick={() => {
                  if (roomInputRef.current && roomPWInputRef.current) {
                    setRoom(roomInputRef.current.value);
                    setRoomPW(roomPWInputRef.current.value);
                  }
                }}
              >
                Enter Chat
              </SB.Button>
            </SB.RoomInfoContainer>
          ) : (
            <SB.EnterChatContainerInner>
              <ChatRoom />
            </SB.EnterChatContainerInner>
          )}
        </SB.ChatContainerInner>
      </SB.ChatContainer>
    </>
  );
};

export default Chat;
