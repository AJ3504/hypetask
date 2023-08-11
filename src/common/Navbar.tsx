import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { getMyTasks } from "../api/tasks";
import AlertModal, { MyComment } from "../components/modal/AlertModal";
import { useModalStore } from "../config/useModalStore";
import { getMyComments } from "../api/comments";
import supabase from "../config/supabaseClient";
import { useCurrentUserStore } from "../config/useCurrentUserStore";

export function Navbar() {
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
    }
  );
  console.log(myComments);

  const signOutBtnHandler = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const { alertModalVisible, changeAlertModalstatus } = useModalStore();

  const notCheckedMyComments = myComments?.filter(
    (myComment) => myComment.checked === false
  );

  console.log(notCheckedMyComments);

  return (
    <>
      <StNavBar>
        <StContainer>
          <StLeftNav>
            <StLeftNavInner>
              <Logo>
                <img src="로고" alt="HypeTask" width="60px" height="60px" />
              </Logo>
              <div style={{ paddingRight: "20px" }}>친구</div>
              <div>탐색</div>
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
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                />
                {notCheckedMyComments?.length! > 0 ? (
                  <StAlertPoint>🔴</StAlertPoint>
                ) : null}
              </StImageWrapper>

              <button onClick={signOutBtnHandler}>로그아웃</button>
              <Link to="/chat" style={{ marginLeft: "10px" }}>
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
  margin-bottom: 30px;
  padding-bottom: 5px;
  background-color: #050174dd;
  z-index: 999;
`;
export const StContainer = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
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
`;
export const StRightNav = styled.div`
  padding: 0.5rem 1rem;
  color: rgba(0, 0, 0, 0.55);
  text-decoration: none;
  margin-left: auto;
`;
export const StRightNavInner = styled.div`
  display: flex;
`;
export const StImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const StAlertPoint = styled.span`
  position: absolute;
  color: red;
  right: 163px;
  top: 5px;
  font-size: 8px;
`;
