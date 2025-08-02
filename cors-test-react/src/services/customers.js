import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

export const customerService = {
  // Get all customers
  getCustomers: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.BASE, { params });
    return response.data;
  },

  // Get customer by ID
  getCustomerById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.BY_ID(id));
    return response.data;
  },

  // Create new customer
  createCustomer: async (customerData) => {
    const response = await apiClient.post(API_ENDPOINTS.CUSTOMERS.BASE, customerData);
    return response.data;
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    const response = await apiClient.put(API_ENDPOINTS.CUSTOMERS.BY_ID(id), customerData);
    return response.data;
  },

  // Delete customer
  deleteCustomer: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.CUSTOMERS.BY_ID(id));
    return response.data;
  },

  // Mock data for development
  getMockCustomers: () => {
    return [
      {
        customerID: 'CUST-001',
        firstName: 'Nguyễn',
        lastName: 'Văn A',
        phoneNumber: '0123456789',
        email: 'nguyenvana@email.com',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        dateOfBirth: '1990-05-15',
        customerFullName: 'Nguyễn Văn A',
        accountUsername: 'nguyenvana',
        accountRoleName: 'Customer'
      },
      {
        customerID: 'CUST-002',
        firstName: 'Trần',
        lastName: 'Thị B',
        phoneNumber: '0987654321',
        email: 'tranthib@email.com',
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        dateOfBirth: '1985-08-22',
        customerFullName: 'Trần Thị B',
        accountUsername: 'tranthib',
        accountRoleName: 'Customer'
      },
      {
        customerID: 'CUST-003',
        firstName: 'Lê',
        lastName: 'Văn C',
        phoneNumber: '0369852741',
        email: 'levanc@email.com',
        address: '789 Đường DEF, Quận 3, TP.HCM',
        dateOfBirth: '1992-12-10',
        customerFullName: 'Lê Văn C',
        accountUsername: 'levanc',
        accountRoleName: 'Customer'
      }
    ];
  },
};