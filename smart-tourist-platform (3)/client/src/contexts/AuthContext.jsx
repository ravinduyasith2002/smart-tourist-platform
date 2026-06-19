import { authService } from '@/services/auth.service';

export const login = async (email, password) => {
  console.log("loogin emil password",email,"  ",password)
  const body = await authService.login(email, password);
  console.log('login response body:', body);

  const d = body.data || body;
  console.log('inner data d:', d, 'keys:', Object.keys(d));

  const token = d.accessToken || d.token || d.access_token || d.jwt || d.data?.accessToken || d.data?.token;
  if (!token) {
    console.error('d keys:', Object.keys(d), 'body keys:', Object.keys(body));
    throw new Error('No access token in response');
  }

  authService.setToken(token);

  let rawUser = d.user || d.data?.user;
  if (!rawUser) {
    const { accessToken, tokenType, expiresIn, refreshExpiresIn, tokenExpiry, ...userFields } = d;
    if (userFields.userId) userFields.id = userFields.userId;
    rawUser = userFields;
  }
  console.log('saving user to localStorage:', rawUser);
  authService.setUser(rawUser);
  return rawUser;
};

export const register = async (formData) => {
  const body = await authService.register(
    formData.nic, formData.name, formData.email, formData.phone,
    formData.password, formData.confirmPassword, formData.role || 'TOURIST',
    formData.avatarUrl, formData.bio
  );
  console.log('register response body:', body);

  if (body.success === true) {
    const d = body.data;
    if (d?.accessToken || d?.token || d?.access_token || d?.jwt) {
      const token = d.accessToken || d.token || d.access_token || d.jwt;
      authService.setToken(token);
      const rawUser = d.user || d.data?.user || d;
      authService.setUser(rawUser);
      return rawUser;
    }
    return { success: true };
  }

  const d = body.data || body;
  console.error('d keys:', Object.keys(d), 'body keys:', Object.keys(body));

  const token = d.accessToken || d.token || d.access_token || d.jwt || d.data?.accessToken || d.data?.token;
  if (!token) {
    console.error('d keys:', Object.keys(d), 'body keys:', Object.keys(body));
    throw new Error('No access token in response');
  }

  authService.setToken(token);

  const rawUser = d.user || d.data?.user || d;
  console.log('saving user to localStorage:', rawUser);
  authService.setUser(rawUser);
  return rawUser;
};

export const logout = () => authService.logout();

export function getUser() {
  return authService.getUser();
}

export function isAuthenticated() {
  return authService.isAuthenticated();
}

export const updateUser = (updates) => {
  const current = authService.getUser() || {};
  const updated = { ...current, ...updates };
  authService.setUser(updated);
  return updated;
};