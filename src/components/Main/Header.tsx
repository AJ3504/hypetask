import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "../../api/getQuotes";
import { styled } from "styled-components";
import { useModalStore } from "../../zustand/useModalStore";
import { useMainTabStore } from "../../zustand/useMainTabStore";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import S from "./mainStyles";

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
          {currentTab === "main" ? "추가" : "검색"}
        </Button>
      </S.Header>
    </>
  );
};

export default Header;
