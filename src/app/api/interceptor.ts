import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { logout } from "./login";

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
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;
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
      const cookies = parseCookies();
      const refreshToken = cookies.refreshToken;

      if (refreshToken) {
        try {
          const response = await axiosInstance.post('/refresh/token', { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          setCookie(null, 'accessToken', accessToken, {
            maxAge: 30 * 24 * 60 * 60, // 30일 유효
            path: '/',
          });
          setCookie(null, 'refreshToken', newRefreshToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });

          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      } else {
        logout();
      }
    }
    return Promise.reject(error);
  }
);