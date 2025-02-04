import { axiosInstance } from "./interceptor"

interface UserProfileResponse {
    success: boolean;
    userProfile: {
        nickname: string;
        profileImage: string;
        rank: number | null; 
        storeReportCount: number; 
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

  
export const updateProfile = async (nickname: string, imageUrl: string | null) => {
  try {
    const payload = {
      nickname,
      image: imageUrl || "", 
    };

    const response = await axiosInstance.patch('/user', payload);
    return response.data;
  } catch (error) {
    console.error('프로필 업데이트 중 오류 발생:', error);
    throw error;
  }
};

export const getReportItemList = async () => {
  try {
    const { data } = await axiosInstance.get('/user/stores');

    if (data.success) {
      return data.stores;
    } else {
      console.error('등록한 판매점 목록 조회 실패');
      return null;
    }
  } catch (error) {
    console.error('등록한 판매점 목록 조회 실패: ', error);
    return null;
}
}