'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/app/api/interceptor';
import { setCookie } from 'nookies';

interface UseSocialLoginProps {
    provider: 'kakao' | 'google' | 'naver';
  }


  export default function useSocialLogin ({ provider }:UseSocialLoginProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setIsLoading(false); 
      return;
    }

    const login = async () => {
      try {
        const res = await axiosInstance.get(`login/${provider}`, {
            params: {
                code: code
            }});
    
        const { success, user, token } = res.data;

        if (success) {
          const { accessToken, refreshToken } = token;
          
          setCookie(null, 'accessToken', accessToken, {
            maxAge: 30 * 24 * 60 * 60, 
            path: '/',
          });
      
          setCookie(null, 'refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60, 
            path: '/',
          });

          switch (user.status) {
            case 'COMPLETED':
                router.replace('/landing');
                break;
    
            case 'PENDING':
                router.replace('/signup/onboarding');
                break;
            default:
                router.replace('/');
                break;
          }
        }
      } catch (err) {
        console.error(err);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    login();
  }, [provider, searchParams, router]);

  return { isLoading };
};