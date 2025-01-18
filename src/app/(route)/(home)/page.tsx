'use client';
import { KakaoLogo } from '@/app/assets';
import AnimatedLogo from '../../_components/home/AnimatedLogo';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="flex w-full min-h-screen flex-col bg-white">
      <AnimatedLogo />
      <div className="w-full flex flex-col items-center space-y-3 mb-10">
        <button
          className="flex items-center cursor-pointer justify-center rounded-md bg-[#fee500] p-4 space-x-7 w-[90%] "
          onClick={handleLogin}
        >
          <KakaoLogo />
          <span className="text-black font-semibold text-base">
            카카오로 3초만에 시작하기
          </span>
        </button>
        <button
          className="w-[90%] p-4 bg-main text-white rounded-lg cursor-pointer font-semibold"
          onClick={handleSignup}
        >
          시작하기
        </button>
        <div className="flex justify-center text-[#A5A5A5] font-semibold">
          이미 계정이 있나요?{' '}
          <button
            className="text-main ml-2 font-bold hover:cursor"
            onClick={handleLogin}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
