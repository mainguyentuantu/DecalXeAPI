import apiClient from './apiClient';

export const settingsService = {
  // ===== ACCOUNT MANAGEMENT =====
  
  // Get all accounts
  getAccounts: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const response = await apiClient.get(`/Accounts?${queryParams}`);
    return response.data;
  },

  // Get account by ID
  getAccountById: async (id) => {
    const response = await apiClient.get(`/Accounts/${id}`);
    return response.data;
  },

  // Update account
  updateAccount: async (id, accountData) => {
    const response = await apiClient.put(`/Accounts/${id}`, accountData);
    return response.data;
  },

  // Delete account
  deleteAccount: async (id) => {
    const response = await apiClient.delete(`/Accounts/${id}`);
    return response.data;
  },

  // Change password
  changePassword: async (accountId, passwordData) => {
    const response = await apiClient.post(`/Accounts/${accountId}/change-password`, passwordData);
    return response.data;
  },

  // Reset password
  resetPassword: async (resetData) => {
    const response = await apiClient.post('/Accounts/reset-password', resetData);
    return response.data;
  },

  // ===== PROFILE MANAGEMENT =====
  
  // Get current user profile
  getCurrentProfile: async () => {
    const response = await apiClient.get('/Auth/profile');
    return response.data;
  },

  // Update current user profile
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/Auth/profile', profileData);
    return response.data;
  },

  // Upload profile avatar
  uploadAvatar: async (formData) => {
    const response = await apiClient.post('/Auth/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // ===== SYSTEM SETTINGS =====
  
  // Get system configuration
  getSystemConfig: async () => {
    const response = await apiClient.get('/System/config');
    return response.data;
  },

  // Update system configuration
  updateSystemConfig: async (configData) => {
    const response = await apiClient.put('/System/config', configData);
    return response.data;
  },

  // Get application settings
  getAppSettings: async () => {
    const response = await apiClient.get('/System/settings');
    return response.data;
  },

  // Update application settings
  updateAppSettings: async (settingsData) => {
    const response = await apiClient.put('/System/settings', settingsData);
    return response.data;
  },

  // ===== SECURITY SETTINGS =====
  
  // Get security policies
  getSecurityPolicies: async () => {
    const response = await apiClient.get('/System/security-policies');
    return response.data;
  },

  // Update security policies
  updateSecurityPolicies: async (policies) => {
    const response = await apiClient.put('/System/security-policies', policies);
    return response.data;
  },

  // Get audit logs
  getAuditLogs: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.action) queryParams.append('action', params.action);
    if (params.userId) queryParams.append('userId', params.userId);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const response = await apiClient.get(`/System/audit-logs?${queryParams}`);
    return response.data;
  },

  // Get login sessions
  getLoginSessions: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.userId) queryParams.append('userId', params.userId);
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    const response = await apiClient.get(`/System/sessions?${queryParams}`);
    return response.data;
  },

  // Terminate session
  terminateSession: async (sessionId) => {
    const response = await apiClient.delete(`/System/sessions/${sessionId}`);
    return response.data;
  },

  // ===== NOTIFICATION SETTINGS =====
  
  // Get notification settings
  getNotificationSettings: async (userId) => {
    const response = await apiClient.get(`/Users/${userId}/notification-settings`);
    return response.data;
  },

  // Update notification settings
  updateNotificationSettings: async (userId, settings) => {
    const response = await apiClient.put(`/Users/${userId}/notification-settings`, settings);
    return response.data;
  },

  // ===== BACKUP & EXPORT =====
  
  // Create system backup
  createBackup: async (backupOptions = {}) => {
    const response = await apiClient.post('/System/backup', backupOptions);
    return response.data;
  },

  // Get backup history
  getBackupHistory: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    if (params.status) queryParams.append('status', params.status);

    const response = await apiClient.get(`/System/backups?${queryParams}`);
    return response.data;
  },

  // Download backup
  downloadBackup: async (backupId) => {
    const response = await apiClient.get(`/System/backups/${backupId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Export system data
  exportSystemData: async (exportOptions = {}) => {
    const queryParams = new URLSearchParams();
    
    if (exportOptions.tables) queryParams.append('tables', exportOptions.tables.join(','));
    if (exportOptions.format) queryParams.append('format', exportOptions.format);
    if (exportOptions.startDate) queryParams.append('startDate', exportOptions.startDate);
    if (exportOptions.endDate) queryParams.append('endDate', exportOptions.endDate);

    const response = await apiClient.get(`/System/export?${queryParams}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // ===== INTEGRATION SETTINGS =====
  
  // Get integration configurations
  getIntegrations: async () => {
    const response = await apiClient.get('/System/integrations');
    return response.data;
  },

  // Update integration configuration
  updateIntegration: async (integrationId, config) => {
    const response = await apiClient.put(`/System/integrations/${integrationId}`, config);
    return response.data;
  },

  // Test integration connection
  testIntegration: async (integrationId) => {
    const response = await apiClient.post(`/System/integrations/${integrationId}/test`);
    return response.data;
  },

  // ===== HELPER FUNCTIONS =====
  
  // Validate settings data
  validateSettings: async (settingsData) => {
    const response = await apiClient.post('/System/validate-settings', settingsData);
    return response.data;
  },

  // Get system health
  getSystemHealth: async () => {
    const response = await apiClient.get('/System/health');
    return response.data;
  },

  // Get system info
  getSystemInfo: async () => {
    const response = await apiClient.get('/System/info');
    return response.data;
  },

  // Clear system cache
  clearCache: async (cacheType = 'all') => {
    const response = await apiClient.post('/System/clear-cache', { cacheType });
    return response.data;
  },

  // Get database statistics
  getDatabaseStats: async () => {
    const response = await apiClient.get('/System/database-stats');
    return response.data;
  }
};