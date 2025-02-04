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

export const registerStore = async (placeName: string, longitude: string, latitude: string, images: string[]) => {
    try {
        const payload = {
            placeName,
            longitude,
            latitude,
            images, 
        };

        const { data } = await axiosInstance.post('/store', payload, {
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*',
            },
        });

        if (data.success) {
            console.log('가게 등록 성공:', data);
            return data.storeId;
        } else {
            console.error('가게 등록 실패:', data.message);
            return null;
        }
    } catch (error) {
        console.error('가게 등록 중 오류 발생:', error);
        return null;
    }
};
