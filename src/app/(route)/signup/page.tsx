"use client";
import { useSignupStore } from "@/app/store/signupStore";
import BackButton from "@/app/_components/common/BackButton";
import HeaderMessage from "@/app/_components/common/HeaderMessage";
import NicknameInput from "@/app/_components/login/NicknameInput";
import EmailInput from "@/app/_components/login/EmailInput";
import PasswordInput from "@/app/_components/login/PasswordInput";
import ConfirmButton from "@/app/_components/common/ConfirmButton";
import { checkEmailDuplicate } from "@/app/api/signup";
import { useEffect, useState } from "react";

export default function Signup() {
  const {
    step,
    email,
    password,
    confirmPassword,
    setStep,
    setEmail,
    setPassword,
    setConfirmPassword,
    resetState,
  } = useSignupStore();

  const [nicknameShake, setNicknameShake] = useState(false);
  const [emailShake, setEmailShake] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);

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

  const handleConfirm = async () => {
    if (step === 1) {
      const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
      if (!regex.test(useSignupStore.getState().nickname)) {
        setNicknameShake(true);
        setTimeout(() => setNicknameShake(false), 200);
      } else {
        setStep(step + 1);
      }
    } else if (step === 2) {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      const email = useSignupStore.getState().email;
      if (!regex.test(email)) {
        setEmailShake(true);
        setTimeout(() => setEmailShake(false), 200);
      } else {
        try {
          const result = await checkEmailDuplicate(email);
          if (!result) {
            setIsEmailDuplicate(true);
            setEmailShake(true);
            setTimeout(() => setEmailShake(false), 500);
          } else {
            setIsEmailDuplicate(false);
            setStep(step + 1);
          }
        } catch (error) {
          console.error("이메일 중복 검사 중 오류 발생:", error);
          setIsEmailDuplicate(true);
          setEmailShake(true);
          setTimeout(() => setEmailShake(false), 500);
        }
      }
    } else {
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (
        !regex.test(useSignupStore.getState().password) &&
        !regex.test(useSignupStore.getState().confirmPassword)
      ) {
        setPasswordShake(true);
        setTimeout(() => setPasswordShake(false), 200);
      } else {
        alert("가입되었습니다.");
      }
    }
  };

  useEffect(() => {
    resetState();
  }, [resetState]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BackButton />
      <HeaderMessage message={getHeaderMessage()} />
      {step >= 1 && <NicknameInput onShake={nicknameShake} />}
      {step >= 2 && (
        <>
          <EmailInput
            className="ml-9 mt-12 w-full"
            setEmail={setEmail}
            onShake={emailShake}
          />
          {isEmailDuplicate && (
            <p className="text-main ml-9 mt-2 text-xs">
              이미 사용 중인 이메일입니다.
            </p>
          )}
        </>
      )}
      {step >= 3 && (
        <>
          <PasswordInput
            label="비밀번호"
            value={password}
            onShake={passwordShake}
            onChange={setPassword}
          />
          <PasswordInput
            label="비밀번호 확인"
            value={confirmPassword}
            onShake={passwordShake}
            onChange={setConfirmPassword}
            isConfirm={true}
          />
        </>
      )}
      <ConfirmButton handleConfirm={handleConfirm} />
    </div>
  );
}
