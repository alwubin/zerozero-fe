import { axiosInstance } from "./interceptor";

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