import { getToken, saveToken } from '@/utils/authUtils';
import axios from 'axios';

const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to refresh token
async function refreshToken() {
  // Replace this with the code to refresh your token
  // This will depend on how your authentication system is set up

  const { refresh_token } = getToken();
  if (refresh_token) {
    publicRequest.defaults.headers.common = { Authorization: `Bearer ${refresh_token}` };
    const response = await publicRequest.post('/auth/refresh_token');
    console.log('🚀 ~ refreshToken ~ response:', response);
    if (response) {
      const { token, refreshToken } = response;
      saveToken(token, refreshToken);
      return response.token;
    }
  } else {
    return null;
  }
}

// Add a request interceptor
privateRequest.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('/auth/login') >= 0) {
      return config;
    }

    const { access_token } = getToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

privateRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Set this to prevent an infinite loop, ensuring that the refresh token is only called once
      const access_token = await refreshToken();
      console.log('🚀 ~ refreshToken ~ access_token:', access_token);
      privateRequest.defaults.headers.common = { Authorization: `Bearer ${access_token}` };
      return privateRequest(originalRequest);
    }
    return Promise.reject(error);
  },
);

publicRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { privateRequest, publicRequest};
