import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient';

// Service functions
const vehicleService = {
  // Get all customer vehicles
  getCustomerVehicles: async (params = {}) => {
    const response = await apiClient.get('/api/CustomerVehicles', { params });
    return response.data;
  },

  // Get customer vehicle by ID
  getCustomerVehicleById: async (id) => {
    const response = await apiClient.get(`/api/CustomerVehicles/${id}`);
    return response.data;
  },

  // Search vehicles by term (license plate, chassis number, etc.)
  searchVehicles: async (searchTerm) => {
    const response = await apiClient.get('/api/CustomerVehicles', {
      params: {
        searchTerm,
        pageSize: 50 // Limit results for search
      }
    });
    return response.data;
  }
};

// Hooks
export const useCustomerVehicles = (params = {}) => {
  return useQuery({
    queryKey: ['customerVehicles', params],
    queryFn: () => vehicleService.getCustomerVehicles(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data) => {
      // Transform data for easier use in components
      return Array.isArray(data) ? data : data?.items || [];
    }
  });
};

export const useCustomerVehicle = (id) => {
  return useQuery({
    queryKey: ['customerVehicles', id],
    queryFn: () => vehicleService.getCustomerVehicleById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useVehicleSearch = (searchTerm) => {
  return useQuery({
    queryKey: ['customerVehicles', 'search', searchTerm],
    queryFn: () => vehicleService.searchVehicles(searchTerm),
    enabled: !!searchTerm && searchTerm.length >= 2, // Only search when term is at least 2 characters
    staleTime: 1000 * 30, // 30 seconds for search results
    select: (data) => {
      // Transform data for easier use in components
      return Array.isArray(data) ? data : data?.items || [];
    }
  });
};