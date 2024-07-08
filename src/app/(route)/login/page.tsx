import EmailInput from "../../_components/login/EmailInput";
import PasswordInput from "../../_components/login/PasswordInput";
import BackButton from "@/app/_components/common/BackButton";
import ConfrimButton from "@/app/_components/common/ConfirmButton";
import HeaderMessage from "@/app/_components/common/HeaderMessage";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BackButton />
      <HeaderMessage message="이메일과 비밀번호로 로그인해주세요" />
      <EmailInput />
      <PasswordInput />
      <ConfrimButton />
    </div>
  );
}
