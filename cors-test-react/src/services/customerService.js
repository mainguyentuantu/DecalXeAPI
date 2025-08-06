import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

class CustomerService {
  // Tìm kiếm khách hàng theo số điện thoại hoặc email
  async searchCustomers(searchTerm) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.ORDERS.SEARCH_CUSTOMERS}?searchTerm=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching customers:', error);
      throw error;
    }
  }

  // Tạo khách hàng mới
  async createCustomer(customerData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.ORDERS.CREATE_CUSTOMER, customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  // Lấy danh sách tất cả khách hàng
  async getCustomers() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.BASE);
      return response.data;
    } catch (error) {
      console.error('Error getting customers:', error);
      throw error;
    }
  }

  // Lấy thông tin khách hàng theo ID
  async getCustomerById(customerId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CUSTOMERS.BY_ID(customerId));
      return response.data;
    } catch (error) {
      console.error('Error getting customer by ID:', error);
      throw error;
    }
  }

  // Cập nhật thông tin khách hàng
  async updateCustomer(customerId, customerData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.CUSTOMERS.BY_ID(customerId), customerData);
      return response.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  // Xóa khách hàng
  async deleteCustomer(customerId) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CUSTOMERS.BY_ID(customerId));
      return response.data;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
}

export const customerService = new CustomerService();