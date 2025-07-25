import axios, { AxiosResponse } from 'axios';
import {
  CustomerDto,
  CreateCustomerDto,
  UpdateCustomerDto,
  CustomerVehicleDto,
  CreateCustomerVehicleDto,
  UpdateCustomerVehicleDto,
  VehicleBrandDto,
  VehicleModelDto,
  OrderDto,
  CreateOrderDto,
  UpdateOrderDto,
  OrderStageHistoryDto,
  DecalTypeDto,
  DecalTemplateDto,
  EmployeeDto,
  LoginDto,
  RegisterDto,
} from '../types/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7298/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginDto): Promise<AxiosResponse<any>> => {
    return api.post('/Auth/login', credentials);
  },
  
  register: async (userData: RegisterDto): Promise<AxiosResponse<any>> => {
    return api.post('/Auth/register', userData);
  },
};

// Customer API
export const customerApi = {
  getAll: async (): Promise<AxiosResponse<CustomerDto[]>> => {
    return api.get('/Customers');
  },
  
  getById: async (id: string): Promise<AxiosResponse<CustomerDto>> => {
    return api.get(`/Customers/${id}`);
  },
  
  create: async (customer: CreateCustomerDto): Promise<AxiosResponse<CustomerDto>> => {
    return api.post('/Customers', customer);
  },
  
  update: async (id: string, customer: UpdateCustomerDto): Promise<AxiosResponse<CustomerDto>> => {
    return api.put(`/Customers/${id}`, customer);
  },
  
  delete: async (id: string): Promise<AxiosResponse<void>> => {
    return api.delete(`/Customers/${id}`);
  },
  
  search: async (query: string): Promise<AxiosResponse<CustomerDto[]>> => {
    return api.get(`/Customers/search?query=${encodeURIComponent(query)}`);
  },
};

// Customer Vehicle API
export const vehicleApi = {
  getAll: async (): Promise<AxiosResponse<CustomerVehicleDto[]>> => {
    return api.get('/CustomerVehicles');
  },
  
  getById: async (id: string): Promise<AxiosResponse<CustomerVehicleDto>> => {
    return api.get(`/CustomerVehicles/${id}`);
  },
  
  getByLicensePlate: async (licensePlate: string): Promise<AxiosResponse<CustomerVehicleDto>> => {
    return api.get(`/CustomerVehicles/by-license-plate/${encodeURIComponent(licensePlate)}`);
  },
  
  getByCustomer: async (customerId: string): Promise<AxiosResponse<CustomerVehicleDto[]>> => {
    return api.get(`/CustomerVehicles/by-customer/${customerId}`);
  },
  
  create: async (vehicle: CreateCustomerVehicleDto): Promise<AxiosResponse<CustomerVehicleDto>> => {
    return api.post('/CustomerVehicles', vehicle);
  },
  
  update: async (id: string, vehicle: UpdateCustomerVehicleDto): Promise<AxiosResponse<CustomerVehicleDto>> => {
    return api.put(`/CustomerVehicles/${id}`, vehicle);
  },
  
  delete: async (id: string): Promise<AxiosResponse<void>> => {
    return api.delete(`/CustomerVehicles/${id}`);
  },
  
  checkLicensePlateExists: async (licensePlate: string): Promise<AxiosResponse<boolean>> => {
    return api.get(`/CustomerVehicles/license-plate/${encodeURIComponent(licensePlate)}/exists`);
  },
  
  checkChassisExists: async (chassisNumber: string): Promise<AxiosResponse<boolean>> => {
    return api.get(`/CustomerVehicles/chassis/${encodeURIComponent(chassisNumber)}/exists`);
  },
};

// Vehicle Brand API
export const vehicleBrandApi = {
  getAll: async (): Promise<AxiosResponse<VehicleBrandDto[]>> => {
    return api.get('/VehicleBrands');
  },
  
  getById: async (id: string): Promise<AxiosResponse<VehicleBrandDto>> => {
    return api.get(`/VehicleBrands/${id}`);
  },
};

// Vehicle Model API
export const vehicleModelApi = {
  getAll: async (): Promise<AxiosResponse<VehicleModelDto[]>> => {
    return api.get('/VehicleModels');
  },
  
  getById: async (id: string): Promise<AxiosResponse<VehicleModelDto>> => {
    return api.get(`/VehicleModels/${id}`);
  },
  
  getByBrand: async (brandId: string): Promise<AxiosResponse<VehicleModelDto[]>> => {
    return api.get(`/VehicleModels/by-brand/${brandId}`);
  },
};

// Order API
export const orderApi = {
  getAll: async (): Promise<AxiosResponse<OrderDto[]>> => {
    return api.get('/Orders');
  },
  
  getById: async (id: string): Promise<AxiosResponse<OrderDto>> => {
    return api.get(`/Orders/${id}`);
  },
  
  getByCustomer: async (customerId: string): Promise<AxiosResponse<OrderDto[]>> => {
    return api.get(`/Orders/by-customer/${customerId}`);
  },
  
  getByVehicle: async (vehicleId: string): Promise<AxiosResponse<OrderDto[]>> => {
    return api.get(`/Orders/by-vehicle/${vehicleId}`);
  },
  
  create: async (order: CreateOrderDto): Promise<AxiosResponse<OrderDto>> => {
    return api.post('/Orders', order);
  },
  
  update: async (id: string, order: UpdateOrderDto): Promise<AxiosResponse<OrderDto>> => {
    return api.put(`/Orders/${id}`, order);
  },
  
  delete: async (id: string): Promise<AxiosResponse<void>> => {
    return api.delete(`/Orders/${id}`);
  },
  
  updateStage: async (id: string, stage: string): Promise<AxiosResponse<OrderDto>> => {
    return api.patch(`/Orders/${id}/stage`, { currentStage: stage });
  },
};

// Order Stage History API
export const orderStageHistoryApi = {
  getByOrder: async (orderId: string): Promise<AxiosResponse<OrderStageHistoryDto[]>> => {
    return api.get(`/OrderStageHistories/by-order/${orderId}`);
  },
  
  getActive: async (): Promise<AxiosResponse<OrderStageHistoryDto[]>> => {
    return api.get('/OrderStageHistories/active');
  },
};

// Decal Type API
export const decalTypeApi = {
  getAll: async (): Promise<AxiosResponse<DecalTypeDto[]>> => {
    return api.get('/DecalTypes');
  },
  
  getById: async (id: string): Promise<AxiosResponse<DecalTypeDto>> => {
    return api.get(`/DecalTypes/${id}`);
  },
};

// Decal Template API
export const decalTemplateApi = {
  getAll: async (): Promise<AxiosResponse<DecalTemplateDto[]>> => {
    return api.get('/DecalTemplates');
  },
  
  getById: async (id: string): Promise<AxiosResponse<DecalTemplateDto>> => {
    return api.get(`/DecalTemplates/${id}`);
  },
};

// Employee API
export const employeeApi = {
  getAll: async (): Promise<AxiosResponse<EmployeeDto[]>> => {
    return api.get('/Employees');
  },
  
  getById: async (id: string): Promise<AxiosResponse<EmployeeDto>> => {
    return api.get(`/Employees/${id}`);
  },
};

export default api;