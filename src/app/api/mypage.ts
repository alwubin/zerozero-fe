import { axiosInstance } from "./interceptor"
import { AxiosResponse } from 'axios';

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

interface UploadImageResponse {
    imageUrl: string;
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

  
export const uploadImage = async (imageFile: File): Promise<UploadImageResponse> => {
    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile);
  
      const response: AxiosResponse<UploadImageResponse> = await axiosInstance.post('/user/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      throw error;
    }
};