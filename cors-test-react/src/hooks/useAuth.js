import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user từ localStorage thay vì API
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: () => {
      // Return user from localStorage directly
      return authService.getCurrentUser();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // Mock mutations for development
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      // This is handled in LoginPage component now
      return { success: true };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['auth', 'currentUser']);
      toast.success('Đăng nhập thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Đăng nhập thất bại');
    },
  });

  // Register mutation (placeholder)
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
    },
    onError: (error) => {
      toast.error(error.message || 'Đăng ký thất bại');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      return { success: true };
    },
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'currentUser'], null);
      queryClient.clear(); // Clear all queries
      toast.success('Đăng xuất thành công!');
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Clear data even if logout fails
      queryClient.setQueryData(['auth', 'currentUser'], null);
      queryClient.clear();
    },
  });

  // Reset password mutation (placeholder)
  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Đặt lại mật khẩu thất bại');
    },
  });

  // Helper functions
  const login = (credentials) => loginMutation.mutate(credentials);
  const register = (userData) => registerMutation.mutate(userData);
  const logout = () => logoutMutation.mutate();
  const resetPassword = (data) => resetPasswordMutation.mutate(data);

  const isAuthenticated = authService.isAuthenticated();
  const getUserRole = () => authService.getUserRole();
  const hasPermission = (requiredRole) => authService.hasPermission(requiredRole);

  return {
    // Data
    user,
    isAuthenticated,
    
    // Loading states
    isLoadingUser,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    
    // Errors
    userError,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    resetPasswordError: resetPasswordMutation.error,
    
    // Actions
    login,
    register,
    logout,
    resetPassword,
    
    // Helper functions
    getUserRole,
    hasPermission,
  };
};