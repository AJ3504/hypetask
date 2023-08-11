import { getCurrentUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();

  const {
    data: currentUser,
    isError,
    isLoading,
  } = useQuery(["currentUser"], async () => {
    const currentUserData = await getCurrentUser();
    return currentUserData;
  });

  if (isLoading) {
    return <div>로딩중...!</div>;
  }

  if (!currentUser) {
    // 컴포넌트를 렌더링하지 않고, 대신에 로그인 페이지나 안내 페이지를 렌더링하는 것이 좋습니다.
    // 예: return <LoginPage />;
    alert("로그인 후 이용 가능합니다.");
    navigate("/first-main");
    return null;
  }

  // 로그인한 사용자라면 자식 컴포넌트 렌더링

  return children;
};

export default PrivateRoute;
