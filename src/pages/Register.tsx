import React, { useState } from "react";
import { FormEvent } from "react";
import supabase from "../config/supabaseClient";
import { error } from "console";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const joinUsHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const { data: existingUsers, error: existingUsersError } = await supabase
        .from("users")
        .select("*")
        .eq("name", name);

      if (existingUsersError) {
        console.error(existingUsersError);
        return;
      }

      if (existingUsers && existingUsers.length > 0) {
        console.error("이미 사용 중인 사용자 이름입니다.");
        return;
      }

      const signUpResult: any = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpResult.error) {
        console.error(signUpResult.error);
        return;
      }

      const user = signUpResult.user;

      if (user) {
        console.log("User registered:", user);
        await addUser(user.id, name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Join Us !
      <form onSubmit={joinUsHandler}>
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
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
        />
        <button type="submit">회원가입 완료</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

const addUser = async (userUid: string, userName: string) => {
  const { data, error } = await supabase
    .from("users")
    .upsert([{ user_id: userUid, name: userName }]);

  if (error) {
    console.error(error);
  } else {
    console.log("User added:", data);
  }
};

export default Register;
