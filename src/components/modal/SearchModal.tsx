import React, { useState } from "react";
import { styled } from "styled-components";
import { useModalStore } from "../../zustand/useModalStore";
import useInput from "../../hooks/useInput";
import { useQuery } from "@tanstack/react-query";
import { addFollower, getAllUser } from "../../api/users";
import { User } from "../../Types";
import { useMainTabStore } from "../../zustand/useMainTabStore";
import { useUserStore } from "../../zustand/useUserStore";

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
        <form
          onSubmit={searchOnsubmitHandler}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
          }}
        >
          <input
            onChange={onChangeKeyWord}
            placeholder="검색어를 입력해주세요"
            value={keyWord}
            style={{ width: "300px", height: "30px", marginBottom: "20px" }}
          />
          <S.SearchBtn
            style={{
              height: "30px",
              width: "80px",
              marginLeft: "10px",
            }}
          >
            검색
          </S.SearchBtn>
        </form>
        {searchedUsers && searchedUsers.length > 0 ? (
          searchedUsers.map((searchedUser: User) => {
            return (
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "black" }}>{searchedUser.username}</span>
                <S.SearchBtn
                  onClick={() => {
                    followBtnHandler(user_id!, searchedUser.user_id);
                  }}
                  style={{ height: "30px", width: "60px" }}
                >
                  팔로우
                </S.SearchBtn>
              </div>
            );
          })
        ) : (
          <div>
            <p style={{ color: "black" }}>존재하지 않는 유저입니다.</p>
          </div>
        )}
      </S.ModalContent>
      <S.CloseBtn onClick={changeSearchModalstatus}> X </S.CloseBtn>
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
    overflow: auto;
    margin-right: 10px;
  `,
  SearchBtn: styled.button`
    background-color: #262286;
    color: white;
    border: none;
    border-radius: 7px;
  `,
  CloseBtn: styled.button`
    background-color: #262286;
    color: white;
    border: none;
    border-radius: 100px;
    width: 30px;
    height: 30px;
    margin-bottom: 450px;
    cursor: pointer;
  `,
};
