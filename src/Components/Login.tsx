import React, { FormEvent, useState } from "react";
import supabase from "../config/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    } catch (error) {
      console.error((error as any).message);
      await supabase.from("users").upsert([
        {
          user_uid: user.id,
        },
      ]);
    }
  };
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        console.error("구글 로그인 에러 발생 :", error);
        return;
      }
      const user = data.user;
      console.log("google user:");
    } catch (error) {
      console.error("구글 로그인 에러2:", error);
      await supabase.from("users").upsert([
        {
          user_uid: user.id,
        },
      ]);
    }
  };
  const signInWithKakao = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
      });
      if (error) {
        console.error("카카오 로그인 에러 발생 :", error);
        return;
      }
      const user = data.user;
      console.log("Kakao user:");
    } catch (error) {
      console.error("카카오 로그인 에러2:", error);
      await supabase.from("users").upsert([
        {
          user_uid: user.id,
        },
      ]);
    }
  };
  const signInWithGithub = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) {
        console.error("깃허브 로그인 에러 발생 :", error);
        return;
      }
      const user = data.user;
      console.log("Github user:");
    } catch (error) {
      console.error("깃허브 로그인 에러2:", error);
      await supabase.from("users").upsert([
        {
          user_uid: user.id,
        },
      ]);
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
        {/* Social login options */}
        <div className="social-login">
          <div onClick={signInWithGoogle}>
            <LoginIcon src="/assets/google (1).png" /> Sign in with Google
          </div>
          <div onClick={signInWithGithub}>
            <LoginIcon src="/assets/github (1).png" />
            Sign in with GitHub
          </div>
          <div onClick={signInWithKakao}>
            <LoginIcon src="/assets/kakao-talk.png" />
            Sign in with Kakao
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
const LoginIcon = styled.img`
  width: 24px;
  height: auto;
  margin-right: 8px;
`;
