import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/',
  timeout: 1000,
  headers: { Token: localStorage.getItem('Token') },
});

export function getUsers(countPage) {
  return instance.get(`/api/v1/users?page=${countPage}&count=6`);
}

export function createUser(userInfo) {
  return instance.post('api/v1/users', userInfo);
}

export function getToken() {
  return instance.get('/api/v1/token');
}
