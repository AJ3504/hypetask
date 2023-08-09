import { styled } from "styled-components";

export function Navbar() {
  return (
    <>
      <StNavBar>
        <StContainer>
          <StLeftNav>
            <StLeftNavInner>
              <img
                src="이미지_파일_경로.jpg"
                alt="logo img"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <div style={{ paddingRight: "20px" }}>친구</div>
              <div>탐색</div>
            </StLeftNavInner>
          </StLeftNav>
          <StRightNav>
            <StRightNavInner>
              <StImageWrapper>
                <img
                  src="이미지_파일_경로.jpg"
                  alt="img"
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
              </StImageWrapper>

              <div>로그아웃</div>
            </StRightNavInner>
          </StRightNav>
        </StContainer>
      </StNavBar>
    </>
  );
}

export const StNavBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  margin-bottom: 30px;
  background-color: #faf7e1;
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
  color: rgba(0, 0, 0, 0.55);
  text-decoration: none;
  margin-right: auto;
`;
export const StLeftNavInner = styled.div`
  display: flex;
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
