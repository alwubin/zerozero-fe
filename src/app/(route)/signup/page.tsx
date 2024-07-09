"use client";
import { useSignupStore } from "@/app/store/signupStore";
import { motion } from "framer-motion";
import BackButton from "@/app/_components/common/BackButton";
import HeaderMessage from "@/app/_components/common/HeaderMessage";
import NicknameInput from "@/app/_components/login/NicknameInput";
import EmailInput from "@/app/_components/login/EmailInput";
import PasswordInput from "@/app/_components/login/PasswordInput";
import ConfirmButton from "@/app/_components/common/ConfirmButton";
import { useEffect } from "react";

export default function Signup() {
  const {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    resetState,
  } = useSignupStore();
  const step = useSignupStore((state) => state.step);

  const getHeaderMessage = () => {
    switch (step) {
      case 1:
        return "닉네임을 알려주세요";
      case 2:
        return "이메일을 입력해주세요";
      case 3:
        return "비밀번호를 입력해주세요";
      default:
        return "";
    }
  };

  useEffect(() => {
    resetState();
  }, [resetState]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BackButton />
      <HeaderMessage message={getHeaderMessage()} />
      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <NicknameInput />
        </motion.div>
      )}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <EmailInput
            className="ml-9 mt-12 w-full"
            email={email}
            setEmail={setEmail}
          />
        </motion.div>
      )}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <PasswordInput
            label="비밀번호"
            value={password}
            onChange={setPassword}
          />
          <PasswordInput
            label="비밀번호 확인"
            value={confirmPassword}
            onChange={setConfirmPassword}
            isConfirm={true}
          />
        </motion.div>
      )}
      <ConfirmButton />
    </div>
  );
}
