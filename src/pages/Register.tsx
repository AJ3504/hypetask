import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { styled } from "styled-components";
interface FormEvent extends React.FormEvent<HTMLFormElement> {}
const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  const joinUsHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !confirmPassword) {
      setError("모든 칸을 입력하세요.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      setLoading(true);

      const signUpResult: any = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpResult.error) {
        console.error(signUpResult.error);
        if (signUpResult.error.message.includes("Email rate limit exceeded")) {
          alert("이메일 발송 제한이 초과되었습니다. 나중에 다시 시도해주세요.");
        } else if (
          signUpResult.error.message.includes("User already registered")
        ) {
          alert("이미 가입된 이메일 주소입니다.");
        } else if (
          signUpResult.error.message.includes(
            "Password should be at least 6 characters"
          )
        ) {
          alert("비밀번호는 최소 6자 이상이어야 합니다.");
        }
        return;
      }
      const { data } = await supabase.auth.getUser();
      console.log(data);

      if (data) {
        console.log("User registered:", data);
        alert("이메일을 확인해주세요.");
        setEmail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
        await addUser(data.user!.id, name);
        setError("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userUid: string, userName: string) => {
    const { error } = await supabase.from("profiles").upsert({
      user_id: userUid,
      username: userName,
      avatar_url: `http://gravatar.com/avatar/${userUid}?d=identicon`,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <CenteredContainer>
      <RegisterContents>
        {successRegister ? (
          <p style={{ color: "green" }}>이메일을 확인해주세요</p>
        ) : (
          <div>
            Join Us !
            <RegistFormContainer onSubmit={joinUsHandler}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="user name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                autoComplete="username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                autoComplete="new-password"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
                autoComplete="new-password"
              />
              <button type="submit" disabled={loading}>
                {loading ? "회원가입 중..." : "회원가입 완료"}
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </RegistFormContainer>
          </div>
        )}
      </RegisterContents>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegisterContents = styled.div`
  border: 1px solid lightgray;
  padding: 20px;
  border-radius: 20px;
  width: 400px;
  height: 300px;
`;

const RegistFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export default Register;
