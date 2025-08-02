import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'currentUser'], data.user);
      toast.success('Đăng nhập thành công!');
    },
    onError: (error) => {
      toast.error(error.message || 'Đăng nhập thất bại');
    },
  });

  // Register mutation
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
    mutationFn: authService.logout,
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

  // Reset password mutation
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