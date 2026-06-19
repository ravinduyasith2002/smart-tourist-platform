import axiosInstance, { API_BASE } from '@/lib/axios';

const USER_API = `${API_BASE}/users`;

export const userService = {
  getMe: async () => {
    const response = await axiosInstance.get(`${USER_API}/me`);
    return response.data;
  },

  updateMe: async (name, phone, bio, avatarUrl) => {
    const payload = { name, phone, bio };
    if (avatarUrl) payload.avatarUrl = avatarUrl;
    const response = await axiosInstance.put(`${USER_API}/me`, payload);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword, confirmNewPassword) => {
    const response = await axiosInstance.put(`${USER_API}/change-password`, {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    return response.data;
  },

  deactivateAccount: async () => {
    const response = await axiosInstance.delete(`${USER_API}/me`);
    return response.data;
  },
};
