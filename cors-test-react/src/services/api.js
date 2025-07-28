import axios from 'axios';

// Cấu hình base URL - thay đổi theo môi trường
const BASE_URL = 'https://decalxeapi-backend-production.up.railway.app';
// const BASE_URL = 'http://localhost:5000'; // Uncomment for local development

// Tạo axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Thêm token nếu có
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  // Auth
  login: (credentials) => api.post('/api/auth/login', credentials),
  
  // Stores
  getStores: () => api.get('/api/stores'),
  getStore: (id) => api.get(`/api/stores/${id}`),
  
  // Decal Types
  getDecalTypes: () => api.get('/api/decaltypes'),
  getDecalType: (id) => api.get(`/api/decaltypes/${id}`),
  
  // Roles
  getRoles: () => api.get('/api/roles'),
  
  // Vehicle Brands
  getVehicleBrands: () => api.get('/api/vehiclebrands'),
  
  // Vehicle Models
  getVehicleModels: () => api.get('/api/vehiclemodels'),
  
  // Test endpoint
  testConnection: () => api.get('/swagger/v1/swagger.json'),
};

export default api;