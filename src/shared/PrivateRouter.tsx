import { getCurrentUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { ReactElement, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../config/useUserStore";
import supabase from "../config/supabaseClient";
import type { User } from "../Types";
import * as uApi from "../api/users";
interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { user_id, setAccessToken, setUser, accessToken, setUserId, user } =
    useUserStore();
  useEffect(() => {
    const setUserInfo = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session) {
        const accessToken = session?.data?.session?.access_token;
        const userData = session?.data?.session?.user;
        const user: User = {
          email: userData!.email!,
          user_id: userData!.id,
          created_at: userData!.created_at,
          img_url: userData?.user_metadata.avatar_url,
          username: userData?.user_metadata.username,
        };
        setUserId(userData?.id!);
        setAccessToken(accessToken!);
        setUser(user);

        if ((await uApi.checkUser(userData!.id)) <= 0) {
          let data = {
            user_id: userData!.id,
            username: userData?.user_metadata.user_name,
            avatar_url: userData.user_metadata.avatar_url,
          };
          console.log(data);
          await uApi.addUser(userData!.id, data);
        }
      }
    };
    setUserInfo();
  }, []);

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
