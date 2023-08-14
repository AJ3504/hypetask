import React, { FormEvent, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import type { User } from "../../Types";
import { useUserStore } from "../../zustand/useUserStore";
import { IntroduceContainer, IntroduceTitle } from "./Introduce";

enum AuthProvider {
  Google = "google",
  Kakao = "kakao",
  GitHub = "github",
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUserId, setAccessToken, setUser } = useUserStore((state) => state);
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

      // 토큰 저장 - 일반 로그인
      if (data.user) {
        alert("로그인에 성공했습니다. 메인페이지로 이동합니다.");
        navigate("/");
      }
    } catch (error) {
      console.error((error as any).message);
    }
  };

  // 2. 소셜 로그인 (provider = google, github, kakao)
  const handleOAuthLogin = async (provider: AuthProvider, e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await (
        supabase.auth as SupabaseClient["auth"]
      ).signInWithOAuth({
        provider,
      });
      if (error) {
        console.error(`${provider} 로그인 에러 발생:`, error);
        return;
      }
    } catch (error) {
      console.error(`${provider} 로그인 에러 발생:`, error);
    }
  };
  return (
    <div>
      <IntroduceContainer>
        <IntroduceTitle style={{ marginBottom: "10px" }}>Log in</IntroduceTitle>
        <LoginForm>
          <LoginInput
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoginInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <GoButton onClick={loginHandler}>Go!</GoButton>
        </LoginForm>
        <LoginGuide>
          <Link
            to="/findpassword"
            style={{ color: "black", marginRight: "5px" }}
          >
            forgot password?
          </Link>
          <Link to="/register" style={{ color: "black" }}>
            Join us
          </Link>
        </LoginGuide>
        {/* Social login */}
        <SocialLogin>
          <LoginIcon
            onClick={(e) => handleOAuthLogin(AuthProvider.Google, e)}
            src="/assets/google (1).png"
          />
          <LoginIcon
            onClick={(e) => handleOAuthLogin(AuthProvider.GitHub, e)}
            src="/assets/github (1).png"
          />
          <LoginIcon
            onClick={(e) => handleOAuthLogin(AuthProvider.Kakao, e)}
            src="/assets/kakao-talk.png"
          />
        </SocialLogin>
      </IntroduceContainer>
    </div>
  );
};
export default Login;
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const GoButton = styled.button`
  align-self: flex-end;
  width: 180px;
  height: 30px;
  border-radius: 10px;
  border: transparent;
  &:hover {
    background-color: gray;
  }
`;
const LoginGuide = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-items: center;
`;
const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const LoginIcon = styled.img`
  width: 45px;
  height: auto;
  margin: 0 8px;
  padding: 6px;
  border: solid 1px lightgray;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
const LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 10px;
  border: transparent;
`;
