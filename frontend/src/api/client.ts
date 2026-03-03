import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise: Promise<string | null> | null = null;

const clearSessionAndRedirectToLogin = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
  sessionStorage.setItem('auth_expired', '1');

  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

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
    const status = error?.response?.status;
    const requestUrl = originalRequest?.url ?? '';
    const isRefreshRequest = requestUrl.includes('/auth/refresh');
    const isAuthLoginRequest = requestUrl.includes('/auth/login');
    const isAuthRegisterRequest = requestUrl.includes('/auth/register');
    const isAuthRequest = isRefreshRequest || isAuthLoginRequest || isAuthRegisterRequest;

    if (status === 401 && !originalRequest?._retry && !isAuthRequest) {
      if (originalRequest) {
        originalRequest._retry = true;
      }
      if (!refreshPromise) {
        refreshPromise = api.post('/auth/refresh')
          .then((refreshResponse) => {
            const newAccessToken = refreshResponse.data?.access_token;
            if (newAccessToken) {
              localStorage.setItem('access_token', newAccessToken);
              return newAccessToken as string;
            }
            return null;
          })
          .catch(() => null)
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;
      if (newAccessToken && originalRequest) {
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        try {
          return api(originalRequest);
        } catch {
          clearSessionAndRedirectToLogin();
          return Promise.reject(error);
        }
      }

      clearSessionAndRedirectToLogin();
      return Promise.reject(error);
    }

    if (status === 401 && !isAuthLoginRequest && !isAuthRegisterRequest) {
      clearSessionAndRedirectToLogin();
    }

    return Promise.reject(error);
  },
);
