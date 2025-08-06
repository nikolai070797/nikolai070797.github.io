import { create } from 'zustand';
import { ChangePasswordBody, Profile, UpdateProfileBody } from '@entities/profile';
import { profileApi } from '@entities/profile';
import { persist } from 'zustand/middleware';
import { shared } from 'use-broadcast-ts';
import { ServerErrors } from '@shared/types';
import axios from 'axios';

type ProfileState = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  serverErrors: ServerErrors | null;
  isUpdating: boolean;
  updateSuccess: boolean;

  handleError(error: unknown, defaultMessage: string): unknown;
  fetchProfile: () => Promise<Profile | null>;
  updateProfile: (data: UpdateProfileBody) => Promise<Profile | null>;
  changePassword: (data: ChangePasswordBody) => Promise<boolean>;
  clearProfile: () => void;
  clearErrors: () => void;
};

export const useProfileStore = create<ProfileState>()(
  shared(
    persist(
      (set, get) => ({
        profile: null,
        isLoading: false,
        error: null,
        serverErrors: null,
        isUpdating: false,
        updateSuccess: false,

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

        fetchProfile: async () => {
          set({ isLoading: true, error: null, serverErrors: null });
          try {
            const profile = await profileApi.getProfile();
            set({ profile, isLoading: false });
            return profile;
          } catch (error) {
            get().handleError(error, 'Ошибка загрузки профиля');
            set({ isLoading: false });
            return null;
          }
        },

        updateProfile: async (data: UpdateProfileBody) => {
          set({
            isUpdating: true,
            error: null,
            serverErrors: null,
            updateSuccess: false,
          });
          try {
            const updatedProfile = await profileApi.updateProfile(data);
            set({
              profile: updatedProfile,
              isUpdating: false,
              updateSuccess: true,
            });
            return updatedProfile;
          } catch (error) {
            get().handleError(error, 'Ошибка обновления профиля');
            set({ isUpdating: false });
            return null;
          }
        },

        changePassword: async (data: ChangePasswordBody) => {
          set({
            isUpdating: true,
            error: null,
            serverErrors: null,
            updateSuccess: false,
          });
          try {
            await profileApi.changePassword(data);
            set({ isUpdating: false, updateSuccess: true });
            return true;
          } catch (error) {
            get().handleError(error, 'Ошибка смены пароля');
            set({ isUpdating: false });
            return false;
          }
        },

        clearProfile: () => {
          set({
            profile: null,
            error: null,
            serverErrors: null,
            updateSuccess: false,
            isLoading: false,
            isUpdating: false,
          });
        },

        clearErrors: () => {
          set({
            error: null,
            serverErrors: null,
          });
        },
      }),
      {
        name: 'profile-store',
        partialize: (state) => ({
          profile: state.profile,
        }), // Сохраняем только профиль
      }
    )
  )
);
