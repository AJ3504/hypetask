import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getQuotes } from "../../api/getQuotes";
import { styled } from "styled-components";
import { useModalStore } from "../../config/useModalStore";
import { useMainTabStore } from "../../config/useMainTabStore";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Header = () => {
  const { data: quotes } = useQuery(["quotes"], async () => {
    const quotesData = await getQuotes();
    return quotesData;
  });

  const { changeAddTaskModalstatus, changeSearchModalstatus } = useModalStore();
  const { currentTab } = useMainTabStore();

  const headerBtnHandler = () => {
    if (currentTab === "main") {
      changeAddTaskModalstatus();
    } else if (currentTab === "explore") {
      changeSearchModalstatus();
    }
  };

  return (
    <>
      <S.Header>
        <div>{quotes?.advice}</div>
        {/* <button onClick={headerBtnHandler}>버튼</button> */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={headerBtnHandler}
          style={{ backgroundColor: "#344CB7" }}
          size="small"
        >
          추가
        </Button>
      </S.Header>
    </>
  );
};

export default Header;
const S = {
  Header: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background-color: #262286;
    height: 55px;
    width: 100%;
    z-index: 2;
    padding-right: 10px;
    padding-left: 20px;
  `,
};
