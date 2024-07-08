import BackButton from "@/app/_components/common/BackButton";
import HeaderMessage from "@/app/_components/common/HeaderMessage";
import NicknameInput from "@/app/_components/login/NicknameInput";
import EmailInput from "@/app/_components/login/EmailInput";
import PasswordInput from "@/app/_components/login/PasswordInput";
import ConfirmButton from "@/app/_components/common/ConfirmButton";

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BackButton />
      <HeaderMessage message="닉네임을 입력해주세요" />
      <NicknameInput />
      <EmailInput className="ml-9 mt-12 w-full" />
      <PasswordInput label="비밀번호" />
      <PasswordInput label="비밀번호 확인" />
      <ConfirmButton />
    </div>
  );
}
