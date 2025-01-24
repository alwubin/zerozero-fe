import { axiosInstance } from "./interceptor"

interface SignupProps {
    nickname: string;
    email?: string;
    password?: string;
}

export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    try {
        const response = await axiosInstance.get('/email/duplicate-check', {
            params: { email }
        });
        
        return response.status === 200;
    } catch (error) {
        console.error('이메일 검증 실패: ', error);
        return false;
    }
}

export const postSignup = async (values: SignupProps) => {
    try {
        const response = await axiosInstance.post('/register', values);

        return response.status === 200;
    } catch (error) {
        console.error('회원가입 실패: ', error);
        return false;
    }
}