import apiClient from './apiClient';

// Payment & Financial Module Service
export const paymentService = {
  // Payment Processing
  async getPayments() {
    const response = await apiClient.get('/api/Payments');
    return response.data;
  },

  async getPaymentById(id) {
    const response = await apiClient.get(`/api/Payments/${id}`);
    return response.data;
  },

  async createPayment(paymentData) {
    const response = await apiClient.post('/api/Payments', paymentData);
    return response.data;
  },

  async updatePayment(id, paymentData) {
    const response = await apiClient.put(`/api/Payments/${id}`, paymentData);
    return response.data;
  },

  async deletePayment(id) {
    const response = await apiClient.delete(`/api/Payments/${id}`);
    return response.data;
  },

  // Invoice Management (using Orders API)
  async getInvoices() {
    const response = await apiClient.get('/api/Orders');
    return response.data;
  },

  async getInvoiceById(id) {
    const response = await apiClient.get(`/api/Orders/${id}`);
    return response.data;
  },

  async generateInvoice(orderId) {
    const response = await apiClient.post(`/api/Orders/${orderId}/invoice`);
    return response.data;
  },

  // Financial Reports
  async getFinancialReports(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const response = await apiClient.get(`/api/Payments/reports?${queryParams}`);
    return response.data;
  },

  async getRevenueAnalytics(period = 'monthly') {
    const response = await apiClient.get(`/api/Payments/analytics?period=${period}`);
    return response.data;
  },

  // Deposit Management
  async getDeposits() {
    const response = await apiClient.get('/api/Deposits');
    return response.data;
  },

  async getDepositById(id) {
    const response = await apiClient.get(`/api/Deposits/${id}`);
    return response.data;
  },

  async createDeposit(depositData) {
    const response = await apiClient.post('/api/Deposits', depositData);
    return response.data;
  },

  async updateDeposit(id, depositData) {
    const response = await apiClient.put(`/api/Deposits/${id}`, depositData);
    return response.data;
  },

  async deleteDeposit(id) {
    const response = await apiClient.delete(`/api/Deposits/${id}`);
    return response.data;
  }
};

export default paymentService;