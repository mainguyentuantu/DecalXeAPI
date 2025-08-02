import apiClient from './apiClient';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants/api';

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { accessToken, refreshToken, user } = response.data;
    
    // Store tokens and user data
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (refreshToken) {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }
  },

  // Reset password
  resetPassword: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
  },

  // Get current user from storage
  getCurrentUser: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!userData || userData === 'undefined') {
      return null;
    }
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const user = authService.getCurrentUser();
    return !!(token && user);
  },

  // Get user role
  getUserRole: () => {
    const user = authService.getCurrentUser();
    return user?.role || user?.accountRoleName || null;
  },

  // Check if user has permission
  hasPermission: (requiredRole) => {
    const userRole = authService.getUserRole();
    if (!userRole) return false;

    // Role hierarchy: Admin > Manager > Sales/Technician > Customer
    const roleHierarchy = {
      'Admin': 5,
      'Manager': 4,
      'Sales': 3,
      'Technician': 3,
      'Customer': 1,
    };

    const userRoleLevel = roleHierarchy[userRole] || 0;
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

    return userRoleLevel >= requiredRoleLevel;
  },

  // Helper function to set mock user for testing
  setMockUser: (role = 'Admin') => {
    const mockUser = {
      id: 'mock-user-id',
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@decalxe.com',
      role: role,
      accountRoleName: role,
    };
    
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'mock-access-token');
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, 'mock-refresh-token');
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
    
    return mockUser;
  },
};