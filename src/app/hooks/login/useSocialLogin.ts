'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/app/api/interceptor';

interface UseSocialLoginProps {
    provider?: 'kakao' | 'google' | 'naver';
  }


const useSocialLogin = ({ provider = 'kakao' }:UseSocialLoginProps) => {
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
            switch (user.status) {
                case 'COMPLETED':
                    router.replace('/landing');
                    break;
        
                case 'PENDING':
                    router.replace('/signup/social');
                    break;
                default:
                    router.replace('/');
                    break;
            }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    login();
  }, [provider, searchParams, router]);

  return { isLoading };
};

export default useSocialLogin;