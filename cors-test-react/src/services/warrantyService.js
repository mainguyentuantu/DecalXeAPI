import apiClient from './apiClient';

// Warranty & Support Module Service
export const warrantyService = {
  // Warranty Management
  async getWarranties() {
    const response = await apiClient.get('/api/Warranties');
    return response.data;
  },

  async getWarrantyById(id) {
    const response = await apiClient.get(`/api/Warranties/${id}`);
    return response.data;
  },

  async createWarranty(warrantyData) {
    const response = await apiClient.post('/api/Warranties', warrantyData);
    return response.data;
  },

  async updateWarranty(id, warrantyData) {
    const response = await apiClient.put(`/api/Warranties/${id}`, warrantyData);
    return response.data;
  },

  async deleteWarranty(id) {
    const response = await apiClient.delete(`/api/Warranties/${id}`);
    return response.data;
  },

  async getWarrantiesByVehicle(vehicleId) {
    const response = await apiClient.get(`/api/Warranties/by-vehicle/${vehicleId}`);
    return response.data;
  },

  async getWarrantiesByStatus(status) {
    const response = await apiClient.get(`/api/Warranties/by-status/${status}`);
    return response.data;
  },

  // Feedback System
  async getFeedbacks() {
    const response = await apiClient.get('/api/Feedbacks');
    return response.data;
  },

  async getFeedbackById(id) {
    const response = await apiClient.get(`/api/Feedbacks/${id}`);
    return response.data;
  },

  async createFeedback(feedbackData) {
    const response = await apiClient.post('/api/Feedbacks', feedbackData);
    return response.data;
  },

  async updateFeedback(id, feedbackData) {
    const response = await apiClient.put(`/api/Feedbacks/${id}`, feedbackData);
    return response.data;
  },

  async deleteFeedback(id) {
    const response = await apiClient.delete(`/api/Feedbacks/${id}`);
    return response.data;
  },

  async getFeedbacksByOrder(orderId) {
    const response = await apiClient.get(`/api/Feedbacks/by-order/${orderId}`);
    return response.data;
  },

  async getFeedbacksByCustomer(customerId) {
    const response = await apiClient.get(`/api/Feedbacks/by-customer/${customerId}`);
    return response.data;
  },

  // Support Ticket Management (using existing feedback system)
  async getSupportTickets() {
    const response = await apiClient.get('/api/Feedbacks/support-tickets');
    return response.data;
  },

  async getSupportTicketById(id) {
    const response = await apiClient.get(`/api/Feedbacks/support-tickets/${id}`);
    return response.data;
  },

  async createSupportTicket(ticketData) {
    const response = await apiClient.post('/api/Feedbacks/support-tickets', ticketData);
    return response.data;
  },

  async updateSupportTicket(id, ticketData) {
    const response = await apiClient.put(`/api/Feedbacks/support-tickets/${id}`, ticketData);
    return response.data;
  },

  async closeSupportTicket(id) {
    const response = await apiClient.put(`/api/Feedbacks/support-tickets/${id}/close`);
    return response.data;
  },

  // Quality Assurance
  async getQualityReports() {
    const response = await apiClient.get('/api/Feedbacks/quality-reports');
    return response.data;
  },

  async getCustomerSatisfactionStats() {
    const response = await apiClient.get('/api/Feedbacks/satisfaction-stats');
    return response.data;
  }
};

export default warrantyService;