import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.108:3333',
});

api.interceptors.request.use(async (config) => {
  const userId = await AsyncStorage.getItem('@shopping:id')!;
  const token = await AsyncStorage.getItem('@shopping:token')!;

  if (userId) {
    config.headers.userid = userId;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
