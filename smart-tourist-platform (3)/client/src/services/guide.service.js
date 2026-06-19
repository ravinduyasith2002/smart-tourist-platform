import axiosInstance, { API_BASE } from '@/lib/axios';

const GUIDE_API = `${API_BASE}/guides`;

export const guideService = {
  getGuides: async (filters) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.languages?.length) params.append('languages', filters.languages.join(','));
    if (filters?.specialization?.length) params.append('specialization', filters.specialization.join(','));
    if (filters?.minRating) params.append('minRating', filters.minRating.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    const response = await axiosInstance.get(`${GUIDE_API}?${params.toString()}`);
    return response.data;
  },

  getGuideById: async (guideId) => {
    const response = await axiosInstance.get(`${GUIDE_API}/${guideId}`);
    return response.data;
  },

  getLanguages: async () => {
    const response = await axiosInstance.get(`${GUIDE_API}/filters/languages`);
    return response.data;
  },

  getSpecializations: async () => {
    const response = await axiosInstance.get(`${GUIDE_API}/filters/specializations`);
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get(`${GUIDE_API}/me`);
    return response.data;
  },

  updateMe: async (bio, experienceYears, hourlyRate, dailyRate, languages, specializations, certifications) => {
    const payload = { bio, experienceYears, hourlyRate, dailyRate };
    if (languages) payload.languages = languages;
    if (specializations) payload.specializations = specializations;
    if (certifications) payload.certifications = certifications;
    const response = await axiosInstance.put(`${GUIDE_API}/me`, payload);
    return response.data;
  },
};
