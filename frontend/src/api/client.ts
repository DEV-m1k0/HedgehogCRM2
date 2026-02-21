import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as (typeof error.config & { _retry?: boolean });

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh');
      const isAuthLoginRequest = originalRequest?.url?.includes('/auth/login');
      const isAuthRegisterRequest = originalRequest?.url?.includes('/auth/register');
      if (!isRefreshRequest && !isAuthLoginRequest && !isAuthRegisterRequest) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await api.post('/auth/refresh');
          const newAccessToken = refreshResponse.data?.access_token;
          if (newAccessToken) {
            localStorage.setItem('access_token', newAccessToken);
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch {
          // refresh failed; perform logout below
        }
      }
    }

    if (error?.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);
