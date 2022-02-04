import axios from 'axios';

const instance = axios.create({
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  withCredentials: false,
  baseURL: 'http://192.168.0.108/api-utm-bolsaempleo/public/',
  //baseURL: 'http://127.0.0.1:8080/'
});

instance.interceptors.request.use(
  config => {
    const configuration = localStorage.getItem('Authorization');
    const auth = JSON.parse(configuration);

    if (auth) {
      config.headers['Authorization'] = auth;
    }

    return config;
  },
  error => {
    const { response: { status } } = error;
    if (status === 401) {
      localStorage.clear('Authorization');
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;