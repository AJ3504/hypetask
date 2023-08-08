import React, { FormEvent, useState } from "react";
import supabase from "../config/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { styled } from "styled-components";

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
    }
  };

  // async function signInWithKakao() {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'kakao',
  //   })
  // }

  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     console.log("Kakao user:", data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
          <div>forgot password?</div>
          <div>Join us</div>
        </div>
        {/* Social login options */}
        <div className="social-login">
          <div>
            <LoginIcon src="/assets/google (1).png" /> Sign in with Google
          </div>
          <div>
            <LoginIcon src="/assets/github (1).png" />
            Sign in with GitHub
          </div>
          <div>
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
