import { axiosInstance } from "./interceptor";
import { setCookie, destroyCookie } from 'nookies';
import { GetServerSidePropsContext } from 'next';

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export const postLogin = async (values: LoginProps, ctx?: GetServerSidePropsContext): Promise<boolean> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>('/login', values);

    const { accessToken, refreshToken } = data.token;

    // nookies를 사용하여 쿠키에 토큰을 저장합니다.
    setCookie(ctx, 'accessToken', accessToken, {
      maxAge: 30 * 24 * 60 * 60, // 30일
      path: '/',
    });

    setCookie(ctx, 'refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60, // 30일
      path: '/',
    });

    return true;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw new Error('로그인에 실패했습니다.');
  }
};

export const logout = (ctx?: GetServerSidePropsContext) => {
  destroyCookie(ctx, 'accessToken');
  destroyCookie(ctx, 'refreshToken');
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};