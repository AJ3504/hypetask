import React, { useState } from "react";
import { styled } from "styled-components";
import { useModalStore } from "../../zustand/useModalStore";
import useInput from "../../hooks/useInput";
import { useQuery } from "@tanstack/react-query";
import { addFollower, getAllUser } from "../../api/users";
import { User } from "../../Types";
import { useMainTabStore } from "../../zustand/useMainTabStore";
import { useUserStore } from "../../config/useUserStore";

const SearchModal = () => {
  const { changeSearchModalstatus } = useModalStore();
  const [keyWord, setKeyWord, onChangeKeyWord] = useInput("");
  const [searchedUsers, setSearchedUsers] = useState<User[]>();

  const { data: users } = useQuery(["users"], async () => {
    const usersData = await getAllUser();
    return usersData;
  });

  const user_id = useUserStore((state) => state.user_id);
  const { setCurrentTab } = useMainTabStore();

  const searchOnsubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const searchedUsers = users
      ?.filter((user) => user.user_id !== user_id)
      .filter((user) => user.username?.includes(keyWord));
    setSearchedUsers(searchedUsers);
  };

  const followBtnHandler = async (from: string, to: string) => {
    try {
      await addFollower(from, to);
      alert("팔로우 완료!");
      changeSearchModalstatus();
      setCurrentTab("main");
    } catch (error) {
      alert("error!");
    }
  };

  return (
    <S.ModalBackGround>
      <S.ModalContent>
        <form onSubmit={searchOnsubmitHandler}>
          <input
            onChange={onChangeKeyWord}
            placeholder="검색어를 입력해주세요"
            value={keyWord}
          />
          <button>검색</button>
        </form>
        {searchedUsers && searchedUsers.length > 0 ? (
          searchedUsers.map((searchedUser: User) => {
            return (
              <div>
                <span>{searchedUser.username}</span>
                <button
                  onClick={() => {
                    followBtnHandler(user_id!, searchedUser.user_id);
                  }}
                >
                  팔로우
                </button>
              </div>
            );
          })
        ) : (
          <div>
            <p>존재하지 않는 유저입니다.</p>
          </div>
        )}
      </S.ModalContent>
    </S.ModalBackGround>
  );
};

export default SearchModal;

const S = {
  ModalBackGround: styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(8px);
  `,
  ModalContent: styled.div`
    background-color: #fff;
    padding: 20px;
    width: 420px;
    height: 500px;
    border-radius: 10px;
  `,
};
