import axios from 'axios';
import type { AxiosInstance } from 'axios';
const http: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;