import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@features/auth/model/authStore';
import { useNavigate } from 'react-router';
import { API_CONFIG } from '@shared/api/config';

export type AxiosInterceptorProps = {
  children: React.ReactNode;
};

// Глобальная конфигурация Axios
axios.defaults.baseURL = API_CONFIG.BASE_URL;
axios.defaults.timeout = API_CONFIG.TIMEOUT;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Перехватчик ответов для обработки общих ошибок
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const { token, clearStore } = useAuthStore();
  const navigate = useNavigate();

  // Обновляем заголовок Authorization при изменении токена
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Локальный перехватчик для 401 и 404
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        if (status === 401) {
          clearStore();
          navigate('/login');
        } else if (status === 404) {
          navigate('/not-found');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, clearStore]);

  return <>{children}</>;
};
