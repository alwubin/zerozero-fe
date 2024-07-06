import Image from "next/image";
import AnimatedLogo from "./(route)/_components/AnimatedLogo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AnimatedLogo />
      <div className="w-full flex flex-col items-center">
        <button className="w-[90%] h-12 bg-main text-white rounded-lg font-bold">
          시작하기
        </button>
        <div className="flex justify-center mt-14 mb-14 text-[#A5A5A5] font-bold">
          이미 계정이 있나요?{" "}
          <button className="text-main ml-2 font-bold hover:cursor">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
