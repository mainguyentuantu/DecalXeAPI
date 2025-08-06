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

export const useCreateOrderStageHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiClient.post('/api/OrderStageHistories', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orderStageHistories']);
    },
  });
};

export const useUpdateOrderCurrentStage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, currentStage }) => {
      // PATCH /api/Orders/{id} (giả sử backend hỗ trợ)
      const res = await apiClient.patch(`/api/Orders/${orderId}`, { currentStage });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['order', orderId]);
    },
  });
};