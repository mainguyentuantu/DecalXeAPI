import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

export const customerVehicleService = {
  // Get all customer vehicles with pagination and filtering
  getCustomerVehicles: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMER_VEHICLES.BASE, { params });
    return response.data;
  },

  // Get customer vehicle by ID
  getCustomerVehicleById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMER_VEHICLES.BY_ID(id));
    return response.data;
  },

  // Get customer vehicle by license plate
  getCustomerVehicleByLicensePlate: async (licensePlate) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMER_VEHICLES.BY_LICENSE_PLATE(licensePlate));
    return response.data;
  },

  // Get customer vehicles by customer ID
  getCustomerVehiclesByCustomer: async (customerId) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMER_VEHICLES.BY_CUSTOMER(customerId));
    return response.data;
  },

  // Create new customer vehicle
  createCustomerVehicle: async (vehicleData) => {
    const response = await apiClient.post(API_ENDPOINTS.CUSTOMER_VEHICLES.BASE, vehicleData);
    return response.data;
  },

  // Update customer vehicle
  updateCustomerVehicle: async (id, vehicleData) => {
    const response = await apiClient.put(API_ENDPOINTS.CUSTOMER_VEHICLES.BY_ID(id), vehicleData);
    return response.data;
  },

  // Delete customer vehicle
  deleteCustomerVehicle: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.CUSTOMER_VEHICLES.BY_ID(id));
    return response.data;
  },

  // Check if customer vehicle exists
  customerVehicleExists: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMER_VEHICLES.EXISTS(id));
    return response.data;
  },

  // Check if license plate exists
  licensePlateExists: async (licensePlate) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMER_VEHICLES.LICENSE_PLATE_EXISTS(licensePlate));
    return response.data;
  },

  // Check if chassis number exists
  chassisExists: async (chassisNumber) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMER_VEHICLES.CHASSIS_EXISTS(chassisNumber));
    return response.data;
  },
};