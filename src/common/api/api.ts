import axios from 'axios';
import { HOST } from '@env';
import { EncryptedStorageService } from '@common/storage/encryptedStorage';

console.log('HOST => ', HOST);

const privateInstance = axios.create({
  baseURL: HOST,
  withCredentials: true,
});

const formDataInstance = axios.create({
  baseURL: HOST,
  withCredentials: false,
  // Let Axios handle the correct headers for FormData automatically
});

// Interceptor to handle Authorization header
const setAuthToken = async (config) => {
  const token = await EncryptedStorageService.getToken();
  console.log('Retrieved token:', token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

privateInstance.interceptors.request.use(setAuthToken);
formDataInstance.interceptors.request.use(setAuthToken);

formDataInstance.interceptors.response.use(
  (response) => {
    console.log(
      `Response: ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

formDataInstance.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

formDataInstance.interceptors.response.use(
  (response) => {
    console.log(
      `Response: ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response Error:', error.response.data);
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiPrivate = privateInstance;
export const apiFormData = formDataInstance;
