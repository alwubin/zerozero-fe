"use client";
import { useLoginStore } from "@/app/store/loginStore";
import EmailInput from "../../_components/login/EmailInput";
import PasswordInput from "../../_components/login/PasswordInput";
import BackButton from "@/app/_components/common/BackButton";
import ConfrimButton from "@/app/_components/common/ConfirmButton";
import HeaderMessage from "@/app/_components/common/HeaderMessage";
import React, { useEffect, useState } from "react";

export default function Login() {
  const { email, password, setEmail, setPassword, resetState } =
    useLoginStore();

  const [emailShake, setEmailShake] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);

  useEffect(() => {
    resetState();
  }, [resetState]);

  const handleConfirm = () => {};

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BackButton />
      <HeaderMessage message="이메일과 비밀번호로 로그인해주세요" />
      <EmailInput setEmail={setEmail} onShake={emailShake} />
      <PasswordInput
        label="비밀번호"
        value={password}
        onChange={setPassword}
        onShake={passwordShake}
      />
      <ConfrimButton handleConfirm={handleConfirm} message="로그인" />
    </div>
  );
}
