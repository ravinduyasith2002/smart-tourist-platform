import axiosInstance, { API_BASE } from '@/lib/axios';

const AUTH_API = `${API_BASE}/auth`;

export const authService = {
  register: async (nic, name, email, phone, password, confirmPassword, role = 'TOURIST', avatarUrl, bio) => {
    const payload = { nic, name, email, phone, password, confirmPassword, role };
    if (avatarUrl) payload.avatarUrl = avatarUrl;
    if (bio) payload.bio = bio;
    console.log('register payload:', payload);
    const response = await axiosInstance.post(`${AUTH_API}/register`, payload);
    return response.data;
  },

  login: async (email, password) => {
    const response = await axiosInstance.post(`${AUTH_API}/login`, { email, password });
    console.log(response.data);
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('accessToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  setToken: (token) => {
    localStorage.setItem('accessToken', token);
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },
};
