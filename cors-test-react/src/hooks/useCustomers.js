import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '../services/customers';
import { toast } from 'react-hot-toast';

export const useCustomers = (params = {}) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerService.getCustomers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCustomer = (id) => {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
      toast.success('Tạo khách hàng thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Tạo khách hàng thất bại');
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => customerService.updateCustomer(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['customers']);
      queryClient.invalidateQueries(['customers', variables.id]);
      toast.success('Cập nhật thông tin khách hàng thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Cập nhật thông tin khách hàng thất bại');
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerService.deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
      toast.success('Xóa khách hàng thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Xóa khách hàng thất bại');
    },
  });
};