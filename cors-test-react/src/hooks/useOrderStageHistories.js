import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';

export const useOrderStageHistories = (orderId) => {
  return useQuery({
    queryKey: ['orderStageHistories', orderId],
    queryFn: async () => {
      if (!orderId) return [];
      const res = await apiClient.get(`/api/OrderStageHistories/by-order/${orderId}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCurrentOrderStage = (orderId) => {
  return useQuery({
    queryKey: ['orderStageHistories', 'current', orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const res = await apiClient.get(`/api/OrderStageHistories/current-stage/${orderId}`);
      return res.data;
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });
};