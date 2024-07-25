import { axiosInstance } from "./interceptor"

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