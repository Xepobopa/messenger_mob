import axios from 'axios';
import {HOST} from '@env';
import {EncryptedStorageService} from '@common/storage/encryptedStorage';

console.log('HOST => ', HOST);
// 10.0.2.2 - for Android  ;  localhost - default
const privateInstance = axios.create({
  baseURL: HOST, //'https://nestjsmessengerbackend-production.up.railway.app', // HOST
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
});

const publicInstance = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

privateInstance.interceptors.request.use(
  async config => {
    console.log(`${config.baseURL}${config.url}`);

    const token = await EncryptedStorageService.getToken();
    console.log('Retrieved token:', token);

    if (token && config.headers) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  error => Promise.reject(error),
);

// privateInstance.interceptors.response.use(
//     value => value,
//     async error => {
//         if (axios.isAxiosError(error)) {
//             if (error.request.status === 404 || error.request.status === 401) {
//                 console.log(
//                     'Access token is old. We need to get a new one and set it',
//                 );
//                 // access token is old. We need to get a new one and set it
//                 // try {
//                 //     // set new token
//                 //     const res = await Service.AuthService.refreshToken();
//                 //     await AsyncStorageService.setAccessToken(res.data.accessToken);

//                 //     // resend old request and return it
//                 //     const config = { ...error.config, headers: { Authorization: `Bearer ${res.data.accessToken}` } };
//                 //     return await privateInstance(config);

//                 // } catch (e) {
//                 //     console.error('Token refresh failed:', e);
//                 //     Promise.reject('Token refresh failed. Log out from your account and sign in.');
//                 // }
//             }
//         }
//         console.log(error.response);
//         Promise.reject(error);
//     },
// );

export const apiPublic = publicInstance;
export const apiPrivate = privateInstance;
