import { axiosInstance } from "./interceptor"

interface LoginProps {
    email: string;
    password: string;
  }

export const postLogin = async (values: LoginProps) => {
    try {
        const response = await axiosInstance.post('/login', values);

        if (response.status === 200) {
            const tokens = response.data.token;
            localStorage.setItem('accessToken', tokens.accessToken.token);
            localStorage.setItem('refreshToken', tokens.refreshToken.token);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('로그인 실패: ', error);
        alert('로그인 실패')
    }
};

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('pubId');
}