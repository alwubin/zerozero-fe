'use client';
import { KakaoLogo } from '@/app/assets';
import AnimatedLogo from '../../_components/home/AnimatedLogo';
import { useRouter } from 'next/navigation';
import { SocialLoginButton } from '@/app/_components/common/SocialLoginButton';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSocialLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL || '/login';
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="flex w-full min-h-screen flex-col bg-white">
      <AnimatedLogo />
      <div className="w-full flex flex-col items-center space-y-3 mb-10">
        <SocialLoginButton
          icon={<KakaoLogo />}
          text="카카오로 3초만에 시작하기"
          onClick={handleSocialLogin}
        />
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
