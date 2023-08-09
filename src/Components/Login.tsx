import React, { FormEvent, useState } from "react";
import supabase from "../config/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

enum AuthProvider {
  Google = "google",
  Kakao = "kakao",
  GitHub = "github",
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await (
        supabase.auth as SupabaseClient["auth"]
      ).signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error((error as any).message);
        alert("로그인 정보를 다시 확인해주세요");
        return;
      }
      console.log("Successfully logged in:", data.user);
      alert("로그인에 성공했습니다. 메인페이지로 이동합니다.");
      navigate("/");
    } catch (error) {
      console.error((error as any).message);
    }
  };
  interface OAuthResponse {
    user?: {
      id: string;
    };
    profile?: {
      id: string;
    };
  }

  interface ProviderResponse {
    provider: AuthProvider;
    url: string;
  }
  const handleOAuthLogin = async (provider: AuthProvider, e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await (
        supabase.auth as SupabaseClient["auth"]
      ).signInWithOAuth({ provider });

      if (error) {
        console.error(`${provider} 로그인 에러 발생:`, error);
        return;
      }

      const oauthData = data as OAuthResponse;
      if (oauthData.user || oauthData.profile) {
        const user = oauthData.user ?? oauthData.profile;
        if (user) {
          console.log(`${provider} user:`, user);

          await supabase.from("users").upsert([
            {
              user_id: user.id,
            },
          ]);
        }
      }
    } catch (error) {
      console.error(`${provider} 로그인 에러 발생:`, error);
    }
  };
  //로그아웃 기능 (로그아웃 버튼 만들때 가져가면 됨)
  const logoutHandler = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("로그아웃 에러 발생:", error);
        return;
      }
      console.log("로그아웃 완료");
    } catch (error) {
      console.error("로그아웃 에러 발생:", error);
    }
  };
  return (
    <LoginContainer>
      <div className="login-container">
        <LoginTitle>Log in</LoginTitle>
        <LoginInputContainer>
          <div className="login-input">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </LoginInputContainer>
        <LoginButtonContainer>
          <div className="login-button">
            <button onClick={loginHandler}>Go!</button>
          </div>
        </LoginButtonContainer>
        <div className="login-guide">
          <Link to="/findpassword">forgot password?</Link>
          <Link to="/register">Join us</Link>
        </div>
        <SocialLoginContainer>
          <div onClick={(e) => handleOAuthLogin(AuthProvider.Google, e)}>
            <LoginIcon src="/assets/google (1).png" />
          </div>
          <div onClick={(e) => handleOAuthLogin(AuthProvider.GitHub, e)}>
            <LoginIcon src="/assets/github (1).png" />
          </div>
          <div onClick={(e) => handleOAuthLogin(AuthProvider.Kakao, e)}>
            <LoginIcon src="/assets/kakao-talk.png" />
          </div>
        </SocialLoginContainer>
      </div>
    </LoginContainer>
  );
};
export default Login;
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  flex: 1;
  margin-right: 10px;
  padding: 20px;
  border-radius: 20px;
  height: 400px;
  width: 300px;
`;
export const LoginIcon = styled.img`
  width: 30px;
  height: auto;
  margin: 8px;
  padding: 6px;
  border: solid 1px lightgray;
  border-radius: 8px;
`;
export const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
export const LoginTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
