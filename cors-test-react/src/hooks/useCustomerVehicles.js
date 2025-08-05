import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerVehicleService } from '../services/customerVehicles';
import { toast } from 'react-hot-toast';

export const useCustomerVehicles = (params = {}) => {
  return useQuery({
    queryKey: ['customerVehicles', params],
    queryFn: () => customerVehicleService.getCustomerVehicles(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCustomerVehicle = (id) => {
  return useQuery({
    queryKey: ['customerVehicles', id],
    queryFn: () => customerVehicleService.getCustomerVehicleById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCustomerVehicleByLicensePlate = (licensePlate) => {
  return useQuery({
    queryKey: ['customerVehicles', 'licensePlate', licensePlate],
    queryFn: () => customerVehicleService.getCustomerVehicleByLicensePlate(licensePlate),
    enabled: !!licensePlate,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCustomerVehiclesByCustomer = (customerId) => {
  return useQuery({
    queryKey: ['customerVehicles', 'customer', customerId],
    queryFn: () => customerVehicleService.getCustomerVehiclesByCustomer(customerId),
    enabled: !!customerId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCustomerVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerVehicleService.createCustomerVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(['customerVehicles']);
      toast.success('Tạo xe thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Tạo xe thất bại');
    },
  });
};

export const useUpdateCustomerVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => customerVehicleService.updateCustomerVehicle(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['customerVehicles']);
      queryClient.invalidateQueries(['customerVehicles', variables.id]);
      toast.success('Cập nhật thông tin xe thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Cập nhật thông tin xe thất bại');
    },
  });
};

export const useDeleteCustomerVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerVehicleService.deleteCustomerVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(['customerVehicles']);
      toast.success('Xóa xe thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Xóa xe thất bại');
    },
  });
};

export const useLicensePlateExists = (licensePlate) => {
  return useQuery({
    queryKey: ['customerVehicles', 'licensePlateExists', licensePlate],
    queryFn: () => customerVehicleService.licensePlateExists(licensePlate),
    enabled: !!licensePlate && licensePlate.length >= 3,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useChassisExists = (chassisNumber) => {
  return useQuery({
    queryKey: ['customerVehicles', 'chassisExists', chassisNumber],
    queryFn: () => customerVehicleService.chassisExists(chassisNumber),
    enabled: !!chassisNumber && chassisNumber.length >= 5,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};