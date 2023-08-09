import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const FindPassword: React.FC = () => {
  const [email, setEmail] = useState(""); // 이메일 상태 변수
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태 변수
  const [showResetForm, setShowResetForm] = useState(false); // 비밀번호 재설정 폼 보여줄지 여부

  const resetPasswordHandler = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/resetPassword",
      });
      console.log(data);
      if (!error) {
        alert("Please check your email");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (event === "PASSWORD_RECOVERY") {
        setShowResetForm(true);
      }
    });
  }, []);

  const updatePasswordHandler = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (data) {
      alert("Password updated successfully!");
      setNewPassword("");
      //router.push("/"); // 이 부분은 router 관련 기능을 이용해야 함
    }
    if (error) {
      alert("There was an error updating your password.");
    }
  };

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <form onSubmit={resetPasswordHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default FindPassword;
