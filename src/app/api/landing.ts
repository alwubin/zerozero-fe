import { axiosInstance } from "./interceptor";

export const searchStore = async (query: string, longitude: string, latitude: string) => {
    try {
      const { data } = await axiosInstance.get('/store/search/nearby', {
        params: {
          query: query,
          longitude: longitude,
          latitude: latitude,
        },
      });
  
      if (data.success) {
        return data.stores;
      } else {
        console.error('판매점 검색 실패');
        return null;
      }
    } catch (error) {
      console.error('판매점 검색 실패', error);
      return null;
    }
  };