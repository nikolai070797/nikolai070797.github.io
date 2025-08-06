import { useAuthStore } from '@features/auth/model/authStore';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { API_CONFIG } from '@shared/api/config';
import { useEffect } from 'react';

export type AxiosInterceptorProps = {
  children: React.ReactNode;
};

const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const navigate = useNavigate();
  const { token, clearStore } = useAuthStore();
  
  useEffect(() => {
    axios.defaults.baseURL = API_CONFIG.BASE_URL;
    axios.defaults.timeout = API_CONFIG.TIMEOUT;
    
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log('Axios error:', error.response?.status, error.message);
        
        if (error.response?.status === 401) {
          clearStore();
          navigate('/login');
        } else if (error.response?.status === 404) {
          navigate('/not-found');
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, clearStore]);

  return children;
};

// const  = ()=> {};

export { AxiosInterceptor };