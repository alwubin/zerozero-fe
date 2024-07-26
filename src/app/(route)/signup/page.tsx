"use client";
import { useSignupStore } from "@/app/store/signupStore";
import BackButton from "@/app/_components/common/BackButton";
import HeaderMessage from "@/app/_components/common/HeaderMessage";
import NicknameInput from "@/app/_components/login/NicknameInput";
import EmailInput from "@/app/_components/login/EmailInput";
import PasswordInput from "@/app/_components/login/PasswordInput";
import ConfirmButton from "@/app/_components/common/ConfirmButton";
import { checkEmailDuplicate, postSignup } from "@/app/api/signup";
import { postLogin } from "@/app/api/login";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const {
    step,
    nickname,
    email,
    password,
    confirmPassword,
    setStep,
    setNickname,
    setEmail,
    setPassword,
    setConfirmPassword,
    resetState,
  } = useSignupStore();

  const [nicknameShake, setNicknameShake] = useState(false);
  const [emailShake, setEmailShake] = useState(false);
  const [passwordShake, setPasswordShake] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const router = useRouter();

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
          console.error("이메일 중복 오류 발생:", error);
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
        try {
          const values = {
            nickname: nickname,
            email: email,
            password: password,
          };
          const result = await postSignup(values);
          if (!result) {
            setEmailShake(true);
            setNicknameShake(true);
            setPasswordShake(true);
            setTimeout(() => {
              setEmailShake(false);
              setNicknameShake(false);
              setPasswordShake(false);
            }, 500);
          } else {
            // 회원가입 성공 시 바로 로그인 진행
            try {
              const loginValues = {
                email: email,
                password: password,
              };
              await postLogin(loginValues);
              alert("로그인되었습니다!");
              router.push("/main");
            } catch (loginError) {
              console.error("자동 로그인 오류 발생:", loginError);
              alert("다시 로그인해주세요.");
              router.push("/login");
            }
          }
        } catch (error) {
          console.error("회원가입 오류 발생:", error);
          setEmailShake(true);
          setNicknameShake(true);
          setPasswordShake(true);
          setTimeout(() => {
            setEmailShake(false);
            setNicknameShake(false);
            setPasswordShake(false);
          }, 500);
        }
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
