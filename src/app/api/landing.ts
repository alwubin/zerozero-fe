import { axiosInstance } from "./interceptor";

export const searchStore = async (query: string) => {
    try {
        const config = {
            params: {
                query: query
            }
        };

        const { data } = await axiosInstance.get('/store/search', config);
        if (data.success) {
            return data.stores;
          } else {
            console.error('판매점 검색 실패');
            return null;
          }
    } catch (error) {
        console.error('판매점 검색 실패');
        return null;
    }
}