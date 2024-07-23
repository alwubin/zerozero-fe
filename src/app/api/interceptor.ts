import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        
        try {
          const response = await axiosInstance.post('/refresh/token', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
            // 에러시 로그아웃 로직 추가
            //   handleLogout();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );