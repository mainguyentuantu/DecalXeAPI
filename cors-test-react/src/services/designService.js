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

  // Create design without file (for testing)
  createDesignWithoutFile: async (designData) => {
    const payload = {
      designName: designData.designName || 'Thiết kế mới',
      description: designData.description || '',
      category: designData.category || 'General',
      tags: designData.tags || '',
      price: designData.price || 0
    };

    const response = await apiClient.post(API_ENDPOINTS.DESIGNS.BASE, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Test function with minimal payload
  testCreateDesign: async () => {
    const minimalPayload = {
      name: 'Test Design',
      description: 'Test description',
      category: 'Test',
      price: 0,
      isActive: true
    };

    console.log('Testing with minimal payload:', minimalPayload);
    
    const response = await apiClient.post(API_ENDPOINTS.DESIGNS.BASE, minimalPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Test function with only required fields
  testCreateDesignSimple: async () => {
    const simplePayload = {
      designName: 'Simple Test Design',
      description: 'Simple test'
    };

    console.log('Testing with simple payload:', simplePayload);
    
    const response = await apiClient.post(API_ENDPOINTS.DESIGNS.BASE, simplePayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  // Upload design with file (Base64)
  uploadDesign: async ({ file, designName, description, category, tags, price }) => {
    try {
      // Convert file to Base64
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1]; // Remove data:image/...;base64, prefix
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Prepare JSON payload - try different field names
      const payload = {
        // Try common field names
        name: designName || 'Thiết kế mới',
        designName: designName || 'Thiết kế mới',
        title: designName || 'Thiết kế mới',
        
        description: description || '',
        category: category || 'General',
        tags: tags || '',
        price: price || 0,
        
        // Image data fields - try different approaches
        imageData: base64Data,
        image: base64Data,
        fileData: base64Data,
        data: base64Data,
        imageUrl: `data:${file.type};base64,${base64Data}`,
        fileContent: base64Data,
        
        // File metadata
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        
        // Additional fields that might be required
        isActive: true,
        status: 'Active',
        createdDate: new Date().toISOString(),
        
        // Try without some fields that might cause issues
        // Remove complex fields that might not be expected
      };

      console.log('Uploading design with Base64...', {
        designName: payload.designName,
        fileSize: payload.fileSize,
        base64Length: payload.imageData.length
      });

      console.log('Full payload structure:', {
        ...payload,
        imageData: payload.imageData.substring(0, 100) + '...' // Log first 100 chars
      });

      const response = await apiClient.post(API_ENDPOINTS.DESIGNS.BASE, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in uploadDesign:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
      throw error;
    }
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