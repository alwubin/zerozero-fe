import EmailInput from "../../_components/login/EmailInput";
import PasswordInput from "../../_components/login/PasswordInput";
import BackButton from "@/app/_components/common/BackButton";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BackButton />
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
