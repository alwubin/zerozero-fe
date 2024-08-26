import { axiosInstance } from "./interceptor";

interface ReviewProps {
  content: string;
  zeroDrinks: string[];
}

export const getStoreInfo = async (storeId: string, filter: string) => {
    try {
      const { data } = await axiosInstance.get('/store', {
        params: {
            storeId: storeId,
            filter: filter,
        },
      });
  
      if (data.success) {
        return data;
      } else {
        console.error('판매점 조회 실패');
        return null;
      }
    } catch (error) {
      console.error('판매점 조회 실패', error);
      return null;
    }
  };

  export const postReview = async (storeId: string, reviewContent:ReviewProps) => {
    try {
      const url = `/review?storeId=${storeId}`;
      const { data } = await axiosInstance.post(url, reviewContent);
  
      return data.success;
  } catch(error) {
    console.error('리뷰 등록 실패', error);
  }
}