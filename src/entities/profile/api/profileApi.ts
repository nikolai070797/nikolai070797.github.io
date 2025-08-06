import axios from 'axios';
import { Profile } from '../model/Profile';
import { ChangePasswordBody } from '../model/ChangePasswordBody';
import { UpdateProfileBody } from '../model/UpdateProfileBody';
import { ChangePasswordResult } from '../model/ChangePasswordResult';

export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    const response = await axios.get<Profile>('/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileBody): Promise<Profile> => {
    const response = await axios.put<Profile>('/profile', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordBody): Promise<ChangePasswordResult> => {
    return await axios.post('/profile/change-password', data);
  },
};