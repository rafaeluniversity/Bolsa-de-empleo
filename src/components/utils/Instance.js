import axios from 'axios';

const instance = axios.create({
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  withCredentials: false,
  baseURL: 'api-utm-bolsaempleo/public',
  //baseURL: 'http://127.0.0.1:8080/'
});

instance.interceptors.request.use(
  config => {
    const configuration = localStorage.getItem('token');
    const auth = JSON.parse(configuration);
    config.headers['Access-Control-Allow-Origin'] = '*';
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