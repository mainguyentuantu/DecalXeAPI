import { API_ENDPOINTS } from '../constants/api';

class CustomerService {
  // Tìm kiếm khách hàng theo số điện thoại hoặc email
  async searchCustomers(searchTerm) {
    try {
      const response = await fetch(`${API_ENDPOINTS.ORDERS.SEARCH_CUSTOMERS}?searchTerm=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi tìm kiếm khách hàng');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching customers:', error);
      throw error;
    }
  }

  // Tạo khách hàng mới
  async createCustomer(customerData) {
    try {
      const response = await fetch(`${API_ENDPOINTS.ORDERS.CREATE_CUSTOMER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi tạo khách hàng');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  // Lấy danh sách tất cả khách hàng
  async getCustomers() {
    try {
      const response = await fetch(`${API_ENDPOINTS.CUSTOMERS.BASE}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi lấy danh sách khách hàng');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting customers:', error);
      throw error;
    }
  }

  // Lấy thông tin khách hàng theo ID
  async getCustomerById(customerId) {
    try {
      const response = await fetch(`${API_ENDPOINTS.CUSTOMERS.BY_ID(customerId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi lấy thông tin khách hàng');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting customer by ID:', error);
      throw error;
    }
  }

  // Cập nhật thông tin khách hàng
  async updateCustomer(customerId, customerData) {
    try {
      const response = await fetch(`${API_ENDPOINTS.CUSTOMERS.BY_ID(customerId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi cập nhật khách hàng');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  // Xóa khách hàng
  async deleteCustomer(customerId) {
    try {
      const response = await fetch(`${API_ENDPOINTS.CUSTOMERS.BY_ID(customerId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi xóa khách hàng');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
}

export const customerService = new CustomerService();