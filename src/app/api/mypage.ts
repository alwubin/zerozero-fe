import { axiosInstance } from "./interceptor"

interface UserProfileResponse {
    success: boolean;
    userProfile: {
        nickname: string;
        profileImage: {
            url: string | null;
        };
        rank: number | null; // 없을 시 null
        storeReportCount: number; // 기본값 0
    };
}

export const getUserProfile = async (): Promise<UserProfileResponse['userProfile'] | null> => {
    try {
        const { data } = await axiosInstance.get<UserProfileResponse>('/user/mypage');

        if (data.success) {
            return data.userProfile;
        } else {
            console.error('마이페이지 조회 실패');
            return null;
        }
    } catch (error) {
        console.error('마이페이지 조회 실패: ', error);
        return null;
    }
}