import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const updatePasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (!error) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setNewPassword("");
        setConfirmNewPassword("");
        navigate("/First-main");
      } else {
        alert("비밀번호 변경 중에 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중에 오류가 발생했습니다!!!!!!.", error);
    }
  };

  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <form onSubmit={updatePasswordHandler}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호"
        />
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="새 비밀번호 확인"
        />
        <button type="submit">완료</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
