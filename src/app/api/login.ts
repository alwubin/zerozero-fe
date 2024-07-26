import { axiosInstance } from "./interceptor"

interface LoginProps {
    email: string;
    password: string;
  }
  
  interface Token {
    token: string;
  }
  
  interface LoginResponse {
    token: {
      accessToken: Token;
      refreshToken: Token;
    };
  }
  
  export const postLogin = async (values: LoginProps): Promise<boolean> => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>('/login', values);
      
      const { accessToken, refreshToken } = data.token;
      localStorage.setItem('accessToken', accessToken.token);
      localStorage.setItem('refreshToken', refreshToken.token);
      
      return true;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw new Error('로그인에 실패했습니다.');
    }
  };

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('pubId');
}