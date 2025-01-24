'use client';
import useSocialLogin from '@/app/hooks/login/useSocialLogin';
import Loading from '@/app/loading';

export default function SocialLoginPage() {
  const { isLoading } = useSocialLogin({ provider: 'kakao' });
  if (isLoading) return <Loading />;
}
