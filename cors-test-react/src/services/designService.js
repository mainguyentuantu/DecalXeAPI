import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

export const designService = {
  // Get all designs with optional filters
  getDesigns: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.status && params.status !== 'all') queryParams.append('status', params.status);
    if (params.designerId) queryParams.append('designerId', params.designerId);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const response = await apiClient.get(`${API_ENDPOINTS.DESIGNS.BASE}?${queryParams}`);
    return response.data;
  },

  // Get design by ID
  getDesignById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.DESIGNS.BY_ID(id));
    return response.data;
  },

  // Create new design
  createDesign: async (designData) => {
    const response = await apiClient.post(API_ENDPOINTS.DESIGNS.BASE, designData);
    return response.data;
  },

  // Upload design with file
  uploadDesign: async ({ file, designName, description, category, tags, price }) => {
    const formData = new FormData();
    formData.append('file', file);
    if (designName) formData.append('designName', designName);
    if (description) formData.append('description', description);
    if (category) formData.append('category', category);
    if (tags) formData.append('tags', tags);
    if (price) formData.append('price', price);

    const response = await apiClient.post(API_ENDPOINTS.DESIGNS.BASE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update design
  updateDesign: async (id, data) => {
    const response = await apiClient.put(API_ENDPOINTS.DESIGNS.BY_ID(id), data);
    return response.data;
  },

  // Delete design
  deleteDesign: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.DESIGNS.BY_ID(id));
    return response.data;
  },

  // Approve design
  approveDesign: async (id, approvalData) => {
    const response = await apiClient.patch(`/designs/${id}/approve`, approvalData);
    return response.data;
  },

  // Reject design
  rejectDesign: async (id, rejectionData) => {
    const response = await apiClient.patch(`/designs/${id}/reject`, rejectionData);
    return response.data;
  },

  // Get design comments
  getDesignComments: async (designId) => {
    const response = await apiClient.get(`/designs/${designId}/comments`);
    return response.data;
  },

  // Add comment to design
  addComment: async (designId, comment) => {
    const response = await apiClient.post(`/designs/${designId}/comments`, comment);
    return response.data;
  },

  // Update comment
  updateComment: async (designId, commentId, comment) => {
    const response = await apiClient.put(`/designs/${designId}/comments/${commentId}`, comment);
    return response.data;
  },

  // Delete comment
  deleteComment: async (designId, commentId) => {
    const response = await apiClient.delete(`/designs/${designId}/comments/${commentId}`);
    return response.data;
  },

  // Get design versions
  getDesignVersions: async (designId) => {
    const response = await apiClient.get(`/designs/${designId}/versions`);
    return response.data;
  },

  // Create new version
  createVersion: async (designId, versionData) => {
    const response = await apiClient.post(`/designs/${designId}/versions`, versionData);
    return response.data;
  },

  // Get design templates
  getTemplates: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);
    if (params.vehicleModel) queryParams.append('vehicleModel', params.vehicleModel);

    const response = await apiClient.get(`/design-templates?${queryParams}`);
    return response.data;
  },

  // Get template by ID
  getTemplateById: async (id) => {
    const response = await apiClient.get(`/design-templates/${id}`);
    return response.data;
  },

  // Create template
  createTemplate: async (templateData) => {
    const response = await apiClient.post('/design-templates', templateData);
    return response.data;
  },

  // Update template
  updateTemplate: async (id, templateData) => {
    const response = await apiClient.put(`/design-templates/${id}`, templateData);
    return response.data;
  },

  // Delete template
  deleteTemplate: async (id) => {
    const response = await apiClient.delete(`/design-templates/${id}`);
    return response.data;
  },

  // Download design
  downloadDesign: async (id) => {
    const response = await apiClient.get(`/designs/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Get design analytics
  getDesignAnalytics: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.designerId) queryParams.append('designerId', params.designerId);

    const response = await apiClient.get(`/designs/analytics?${queryParams}`);
    return response.data;
  },
};