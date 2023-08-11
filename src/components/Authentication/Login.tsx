import React, { FormEvent, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { useUserStore } from "../../config/useUserStore";

enum AuthProvider {
  Google = "google",
  Kakao = "kakao",
  GitHub = "github",
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // zustand - action
  const setFullName = useUserStore((state) => state.setFullName);
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  // zustand - state
  const fullName = useUserStore((state) => state.fullName);
  const accessToken = useUserStore((state) => state.accessToken);
  console.log(fullName);
  console.log(accessToken);

  // 1. 일반 이메일 로그인 (provider = email)
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
      // console.log("Successfully logged in:", data.user);
      // console.log("full name?>", data.user.user_metadata.full_name);

      // zustand
      setFullName(data.user.user_metadata.full_name);

      // 토큰 저장 - 일반 로그인
      if (data.user) {
        const session = await supabase.auth.getSession();
        console.log(session);

        const accessToken = session?.data?.session?.access_token;
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          // console.log("Access token saved to localStorage.");

          // zustand
          setAccessToken(accessToken);

          alert("로그인에 성공했습니다. 메인페이지로 이동합니다.");
          navigate("/");
        }
      }
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

  // 2. 소셜 로그인 (provider = google, github, kakao)
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
          // 이안진 추가
          console.log(`Successfully Sociallogged in: ${provider} user:`, user);

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
  return (
    <div>
      <div className="login-container">
        <div className="login-title">Log in</div>
        <div className="login-input">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginHandler}>Go!</button>
        </div>
        <div className="login-guide">
          <Link to="/findpassword">forgot password?</Link>
          <Link to="/register">Join us</Link>
        </div>
        {/* Social login */}
        <div className="social-login">
          <div onClick={(e) => handleOAuthLogin(AuthProvider.Google, e)}>
            <LoginIcon src="/assets/google (1).png" />
          </div>
          <div onClick={(e) => handleOAuthLogin(AuthProvider.GitHub, e)}>
            <LoginIcon src="/assets/github (1).png" />
          </div>
          <div onClick={(e) => handleOAuthLogin(AuthProvider.Kakao, e)}>
            <LoginIcon src="/assets/kakao-talk.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
const LoginIcon = styled.img`
  width: 30px;
  height: auto;
  margin: 8px;
  padding: 6px;
  border: solid 1px lightgray;
  border-radius: 8px;
`;
