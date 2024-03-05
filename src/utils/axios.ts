import axios from 'axios';
import { SUPABASE_API_URL } from '../config/env';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: SUPABASE_API_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
