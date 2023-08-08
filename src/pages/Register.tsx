import React, { useState } from "react";
import { FormEvent } from "react";
import supabase from "../config/supabaseClient";

const Register: React.FC = () => {
  const [email, setEmail] = useState(""); // 이메일 상태 변수
  const [password, setPassword] = useState(""); // 패스워드 상태 변수
  const [name, setName] = useState("");

  const joinUsHandler = async (e: FormEvent) => {
    e.preventDefault();
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) console.error(error);
      console.log(data);
      await addUser(data.user.id, name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
        <button type="submit">Join Us</button>
      </form>
    </div>
  );
};

const addUser = async (userUid: string, userName: string) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ user_id: userUid, name: userName }]);

  if (error) {
    console.error(error);
  } else {
    console.log("User added:", data);
  }
};

const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
  } else {
    console.log("Users:", data);
  }
};
export default Register;
