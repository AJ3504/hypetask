import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getMyTasks } from "../api/tasks";
import AlertModal, { MyComment } from "../components/modal/AlertModal";
import { useModalStore } from "../config/useModalStore";
import { getMyComments } from "../api/comments";
import supabase from "../config/supabaseClient";
import { useCurrentUserStore } from "../config/useCurrentUserStore";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useState } from "react";
import { useMainTabStore } from "../config/useMainTabStore";

export function Navbar() {
  const navigate = useNavigate();

  const { currentUserId } = useCurrentUserStore();
  const today = new Date().toISOString().slice(0, 10);

  const { data: myTaskIds } = useQuery(
    ["myTaskIds"],
    async () => {
      const tasksData = await getMyTasks(currentUserId, today);
      return tasksData;
    },
    {
      select: (myTasks) => myTasks?.map((myTask) => myTask.task_id),
      enabled: !!currentUserId,
    }
  );

  const { data: myComments } = useQuery(
    ["myComments"],
    async () => {
      const myCommentsData = await getMyComments(myTaskIds as string[]);
      return myCommentsData;
    },
    {
      select: (myComments) =>
        myComments?.map((myComment) => ({
          // username: myComment.username,
          created_at: myComment.created_at,
          checked: myComment.checked,
          comment: myComment.comment,
        })),
      enabled: !!myTaskIds,
    }
  );

  const signOutBtnHandler = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const { alertModalVisible, changeAlertModalstatus } = useModalStore();
  const { setCurrentTab } = useMainTabStore();

  const notCheckedMyComments = myComments?.filter(
    (myComment) => myComment.checked === false
  );

  console.log(notCheckedMyComments);

  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <>
      <StNavBar>
        <StContainer>
          <StLeftNav>
            <StLeftNavInner>
              <div
                onClick={() => {
                  if (location.pathname === "/") {
                    window.location.reload();
                  } else {
                    navigate("/");
                  }
                }}
              >
                <Logo>
                  <img
                    src="/logo.png"
                    alt="HypeTask"
                    width="90px"
                    height="40px"
                  />
                </Logo>
              </div>

              <div style={{ marginTop: "20px" }}>
                <span
                  style={{
                    paddingRight: "20px",
                    paddingLeft: "35px",
                    fontWeight: "bold",
                  }}
                >
                  친구
                </span>
                <span style={{ fontWeight: "bold" }}>탐색</span>
              </div>
            </StLeftNavInner>
          </StLeftNav>
          <StRightNav>
            <StRightNavInner>
              <StImageWrapper>
                <img
                  onClick={() => changeAlertModalstatus(true)}
                  src="https://www.studiopeople.kr/common/img/default_profile.png"
                  alt="img"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "11px",
                    cursor: "pointer",
                    borderRadius: "50%",
                    opacity: "0.8",
                  }}
                />
                {notCheckedMyComments?.length! > 0 ? (
                  <StAlertPoint>🔴</StAlertPoint>
                ) : null}
              </StImageWrapper>

              <Space direction="vertical">
                <Space wrap>
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    loading={loadings[1]}
                    style={{ backgroundColor: "#344CB7" }}
                    onClick={() => {
                      enterLoading(1);
                      signOutBtnHandler();
                    }}
                  >
                    로그아웃
                  </Button>
                </Space>
              </Space>
              <Link
                to="/chat"
                style={{
                  marginLeft: "16px",
                  marginTop: "10px",
                  textDecoration: "none",
                  color: "#c5c4d7dd",
                  fontWeight: "bolder",
                }}
              >
                하입톡💬
              </Link>
            </StRightNavInner>
          </StRightNav>
        </StContainer>{" "}
      </StNavBar>
      {alertModalVisible ? (
        <AlertModal
          myTaskIds={myTaskIds as string[]}
          myComments={notCheckedMyComments as MyComment[]}
        />
      ) : null}
    </>
  );
}

export const StNavBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
`;
export const StContainer = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  background-color: #262286;
`;
export const StLeftNav = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  color: #c5c4d7dd;
  text-decoration: none;
  margin-right: auto;
`;
export const StLeftNavInner = styled.div`
  display: flex;
`;
export const Logo = styled.a`
  padding: 0;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
`;
export const StRightNav = styled.div`
  padding: 0.5rem 1rem;
  color: rgba(0, 0, 0, 0.55);
  text-decoration: none;
  margin-left: auto;
`;
export const StRightNavInner = styled.div`
  display: flex;
  margin-top: 9px;
`;
export const StImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const StButton = styled.div`
  color: #000000c1;
  font-weight: bold;
  background-color: #ece8e8;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.2s ease;
  font-family: "NanumSquareNeo-Variable", sans-serif;
  padding: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #a8b0c4da;
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StAlertPoint = styled.span`
  position: absolute;
  color: red;
  right: 163px;
  top: 5px;
  font-size: 8px;
`;
