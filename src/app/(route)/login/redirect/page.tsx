import useSocialLogin from '@/app/hooks/login/useSocialLogin';
import Loading from '@/app/loading';

export default function SocialLoginPage() {
  const { isLoading } = useSocialLogin({ provider: 'kakao' });
  if (isLoading) return <Loading />;
  return (
    <div className="space-y-2 flex h-screen flex-col items-center justify-center">
      <p className="text-gray-700 text-base font-semibold">
        로그인이 완료되었습니다.
      </p>
    </div>
  );
}
