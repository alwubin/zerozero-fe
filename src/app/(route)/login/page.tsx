"use client";
import Image from "next/image";
import EmailInput from "../../_components/login/EmailInput";
import PasswordInput from "../../_components/login/PasswordInput";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleBackButton = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div
        className="justify-start ml-9 mt-9 cursor-pointer"
        onClick={handleBackButton}
      >
        <Image
          src="/images/back-button.png"
          alt="back-button"
          width={24}
          height={24}
        />
      </div>
      <div className="font-bold text-2xl ml-9 mt-14">
        이메일과 비밀번호로 로그인해주세요
      </div>
      <EmailInput />
      <PasswordInput />
      <div className="flex-grow"></div>
      <div className="w-full">
        <button className="bg-main w-full text-white h-16">확인</button>
      </div>
    </div>
  );
}
