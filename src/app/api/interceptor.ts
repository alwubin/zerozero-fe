import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { logout } from "./login";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      
      const cookies = parseCookies();
      const refreshToken = cookies.refreshToken;

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh/token`, { refreshToken });

        if (response.data.success && response.data.token) {
          const { accessToken, refreshToken: newRefreshToken } = response.data.token;

          setCookie(null, 'accessToken', accessToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
          setCookie(null, 'refreshToken', newRefreshToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });

          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error('토큰 갱신 실패');
        }
      } catch (refreshError) {
        destroyCookie(null, 'accessToken');
        destroyCookie(null, 'refreshToken');
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
