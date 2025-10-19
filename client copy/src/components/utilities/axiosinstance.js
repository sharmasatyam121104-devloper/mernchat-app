// apiClient.js

import axios from 'axios';

const DB_URL = import.meta.env.VITE_DB_URI

const axiosInstance = axios.create({
  baseURL: DB_URL, // backend ka base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // agar cookies use ho rahe ho
});

export default axiosInstance;