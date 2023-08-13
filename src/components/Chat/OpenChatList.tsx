// import { Chats } from "../../Types";

// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getChats } from "../../api/chats";
// import { styled } from "styled-components";

// type ChatRoomProps = {
//   room: string;
//   roomPW: string;
// };

// const OpenChatList: React.FC<ChatRoomProps> = (props) => {
//   const { room } = props;
//   const { roomPW } = props;

//   // useInfiniteQuery
//   const fetchChatsForPage = async ({ pageParam = 0 }): Promise<Chats[]> => {
//     const response = await getChats({ room, roomPW, pageParam });
//     // console.log(response);
//     return response;
//   };

//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//     isFetching,
//   } = useInfiniteQuery({
//     queryKey: ["chats", room],
//     queryFn: ({ pageParam }) => fetchChatsForPage({ pageParam }),
//     getNextPageParam: (_lastPage, pages) => {
//       // 현재페이지 < 총 페이지수일때만 다음 페이지 가져옴
//       if (pages[pages.length - 1]?.length >= 5) {
//         return pages.length + 1;
//       } else {
//         return undefined;
//       }
//     },
//   });

//   // Event Handler
//   const prettierCreatedAt = (createdAt: string) => {
//     const date = new Date(createdAt);
//     const options: Intl.DateTimeFormatOptions = {
//       // year: "numeric",
//       // month: "long",
//       // day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       // second: "numeric",
//     };
//     return new Intl.DateTimeFormat("en-US", options).format(date);
//   };

//   const fetchMore = () => {
//     if (!hasNextPage) return;
//     fetchNextPage();
//   };

//   return (
//     <>
//       <StMessages>
//         {isFetching && !isFetchingNextPage ? "Fetching..." : null}
//         {data?.pages &&
//           data.pages.map((page) =>
//             page.map((chat) => (
//               <StMessage key={chat.chat_id}>
//                 <StUser>{chat.username}:</StUser> {chat.text}
//                 <br />
//                 <StDate>{prettierCreatedAt(chat.created_at)}</StDate>
//               </StMessage>
//             ))
//           )}
//       </StMessages>
//       <button onClick={fetchMore}>더보기</button>
//     </>
//   );
// };

// export default OpenChatList;

// //-----------------------------------//

// export const StMessages = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 100%;
//   height: 80%;
//   overflow-y: auto;
//   padding: 10px;
//   margin-bottom: 10px;
// `;
// export const StMessage = styled.div`
//   display: flex;
//   align-items: flex-start;
//   margin-bottom: 10px;
// `;
// export const StUser = styled.span`
//   font-weight: bold;
//   margin-right: 10px;
//   color: #333;
// `;
// export const StDate = styled.span`
//   font-size: 10px;
//   margin-left: 5px;
//   color: lightgray;
//   position: relative;
//   top: 3px;
// `;

import React from "react";

const OpenChatList = () => {
  return <div>OpenChatList</div>;
};

export default OpenChatList;
