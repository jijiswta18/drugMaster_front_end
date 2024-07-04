import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.VUE_APP_API_BASE_URL
  : 'http://localhost:8080';

const api = axios.create({
  baseURL
});

export default api;