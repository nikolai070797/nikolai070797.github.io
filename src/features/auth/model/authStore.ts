import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shared } from 'use-broadcast-ts';
import axios from 'axios';
import { SignInBody } from '@entities/auth/SignInBody';
import { AuthResult } from '@entities/auth/AuthResult';
import { SignUpBody } from '@entities/auth/SignUpBody';
import { API_CONFIG } from '@shared/api/config';
import { ServerErrors } from '@shared/types';

export type UserState = {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  serverErrors: ServerErrors | null;
  isHydrated: boolean;

  handleError(error: unknown, defaultMessage: string): unknown;
  setHydrated: (value: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  login: ({ email, password }: SignInBody) => Promise<boolean>;
  signup: ({ email, password }: Omit<SignUpBody, 'commandId'>) => Promise<boolean>;
  logout: () => void;
  clearStore: () => void;
  clearErrors: () => void;
};

export const useAuthStore = create<UserState>()(
  shared(
    persist(
      (set, get) => ({
        token: null,
        isLoading: false,
        error: null,
        serverErrors: null,
        isHydrated: false,

        setHydrated: (value) => set({ isHydrated: value }),
        setIsLoading: (loading) => set({ isLoading: loading }),

        // Универсальный метод обработки ошибок - возвращает код ошибки для перевода в компоненте
        handleError: (error: any, defaultMessage: string) => {
          // Очищаем предыдущие ошибки
          set({ serverErrors: null });

          if (axios.isAxiosError(error) && error.response?.data) {
            const serverData = error.response.data;
            // Проверяем, есть ли серверные ошибки в ожидаемом формате
            if (serverData.errors && Array.isArray(serverData.errors) && serverData.errors.length > 0) {
              const serverError = serverData.errors[0];
              set({
                serverErrors: serverData as ServerErrors,
                error: serverError.message || defaultMessage,
              });
            } else {
              // Возвращаем код ошибки для обработки в компоненте
              const errorCode = serverData.code;
              const message = errorCode || serverData.message || defaultMessage;
              set({ error: message });
            }
          } else {
            // Другие типы ошибок
            const message = error instanceof Error ? error.message : defaultMessage;
            set({ error: message });
          }
        },

        login: async ({ email, password }: SignInBody) => {
          const cred: SignInBody = { email, password };

          set({ isLoading: true, error: null });

          try {
            const response = await axios.post<AuthResult>('/signin', cred);

            const { token } = response.data;
            set({ token });

            return true;
          } catch (error) {
            get().handleError(error, 'Ошибка входа');
            set({ isLoading: false });
            return false;
          } finally {
            set({ isLoading: false });
          }
        },

        signup: async ({ email, password }: Omit<SignUpBody, 'commandId'>) => {
          const cred: SignUpBody = { email, password, commandId: API_CONFIG.COMMANDID };

          set({ isLoading: true, error: null });

          try {
            const response = await axios.post<AuthResult>('/signup', cred);

            const { token } = response.data;
            set({ token });

            return true;
          } catch (error) {
            get().handleError(error, 'Ошибка регистрации');
            set({ isLoading: false });
            return false;
          } finally {
            set({ isLoading: false });
          }
        },

        logout: () => {
          set({
            token: null,
            isHydrated: true,
            error: null,
            serverErrors: null,
            isLoading: false,
          });
        },
        
        clearStore: () => {
          set({
            token: null,
            isLoading: false,
            error: null,
            serverErrors: null,
            isHydrated: true,
          });
        },
        clearErrors: () => {
          set({
            error: null,
            serverErrors: null
          });
        },

      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          token: state.token,
          isHydrated: state.isHydrated,
        }), // Сохраняем только токен
      }
    ),
    {
      name: 'auth-storage',
    }
  )
);
