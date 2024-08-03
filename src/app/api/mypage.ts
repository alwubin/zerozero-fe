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

  
export const updateProfile = async (nickname: string, imageFile: File | null | undefined) => {
  try {
    const formData = new FormData();
    if (imageFile) {
      formData.append('imageFile', imageFile);
    } else {
      formData.append('imageFile', '');
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        nickname: nickname
      }
    };

    const response = await axiosInstance.patch('/user', formData, config);
    return response.data;
  } catch (error) {
    console.error('프로필 업데이트 중 오류 발생:', error);
    throw error;
  }
};