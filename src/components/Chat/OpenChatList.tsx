import { Chats } from "../../Types";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getChats } from "../../api/chats";
import { useRoomStore } from "../../config/useRoomStore";
import {
  StDate,
  StHeader,
  StMessage,
  StMessages,
  StOpenChatListContainer,
  StText,
  StUser,
} from "./chatstyle/OpenChatListStyle";
import { useInView } from "react-intersection-observer";

const OpenChatList: React.FC = () => {
  // zustand - room, roomPW
  const room = useRoomStore((state) => state.room);
  const roomPW = useRoomStore((state) => state.roomPW);
  // console.log(room);
  // console.log(roomPW);

  // useInfiniteQuery
  const fetchChatsForPage = async ({ pageParam = 0 }): Promise<Chats[]> => {
    const response = await getChats({ room, roomPW, pageParam });
    // console.log(response);
    return response;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["chats", room],
      queryFn: ({ pageParam }) => fetchChatsForPage({ pageParam }),
      getNextPageParam: (_lastPage, pages) => {
        // 현재페이지 < 총 페이지수일때만 다음 페이지 가져옴
        if (pages[pages.length - 1]?.length >= 5) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  // Event Handler
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

  // const fetchMore = () => {
  //   if (!hasNextPage) return;
  //   fetchNextPage();
  // };

  return (
    <StOpenChatListContainer>
      <StHeader>
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </StHeader>
      <StMessages>
        {isFetching && !isFetchingNextPage ? "Fetching..." : null}
        {data?.pages &&
          data.pages.map((page) =>
            page.map((chat) => (
              <StMessage key={chat.chat_id}>
                <StUser>{chat.username}:</StUser> <StText>{chat.text}</StText>
                <br />
                <StDate>{prettierCreatedAt(chat.created_at)}</StDate>
              </StMessage>
            ))
          )}
      </StMessages>
      {/* <button onClick={fetchMore}>더보기</button> */}
      <div
        style={{
          textAlign: "center",
          color: "black",
          width: "100%",
          height: 50,
        }}
        ref={ref} // useInView에서 반환한 ref를 적용
      >
        더보기…
      </div>
    </StOpenChatListContainer>
  );
};

export default OpenChatList;
