import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Database,
  Key,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  X,
  AlertTriangle,
  Check,
  Info
} from 'lucide-react';
import { settingsService } from '../services/settingsService';
import { employeeService } from '../services/employeeService';
import { formatUtils } from '../utils/formatUtils';

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('account');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Get data
  const { data: accounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: settingsService.getAccounts,
  });

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: employeeService.getRoles,
  });

  // Mock data for demonstration
  const mockSystemConfig = {
    siteName: 'DecalXe Management System',
    siteDescription: 'Hệ thống quản lý dịch vụ decal xe',
    contactEmail: 'admin@decalxe.com',
    supportPhone: '0123-456-789',
    timezone: 'Asia/Ho_Chi_Minh',
    language: 'vi',
    currency: 'VND',
    dateFormat: 'DD/MM/YYYY',
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false
  };

  const mockSecurityPolicies = {
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    enableTwoFactor: false,
    allowMultipleSessions: true
  };

  const mockNotificationSettings = {
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    systemAlerts: true,
    promotionalEmails: false,
    weeklyReports: true,
    dailyDigest: false
  };

  // Mutations
  const changePasswordMutation = useMutation({
    mutationFn: settingsService.changePassword,
    onSuccess: () => {
      toast.success('Mật khẩu đã được thay đổi thành công!');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    },
    onError: (error) => {
      toast.error('Lỗi khi thay đổi mật khẩu: ' + (error.response?.data?.message || error.message));
    },
  });

  const updateAccountMutation = useMutation({
    mutationFn: ({ id, data }) => settingsService.updateAccount(id, data),
    onSuccess: () => {
      toast.success('Tài khoản đã được cập nhật thành công!');
      queryClient.invalidateQueries(['accounts']);
    },
    onError: (error) => {
      toast.error('Lỗi khi cập nhật tài khoản: ' + (error.response?.data?.message || error.message));
    },
  });

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Mật khẩu phải có ít nhất 8 ký tự!');
      return;
    }

    changePasswordMutation.mutate({
      accountId: 'current', // Assuming current user
      passwordData: {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }
    });
  };

  const handleAccountToggle = (account) => {
    updateAccountMutation.mutate({
      id: account.accountID,
      data: { ...account, isActive: !account.isActive }
    });
  };

  const tabs = [
    { id: 'account', name: 'Tài khoản', icon: User },
    { id: 'system', name: 'Hệ thống', icon: Settings },
    { id: 'security', name: 'Bảo mật', icon: Shield },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
    { id: 'data', name: 'Dữ liệu', icon: Database }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600 mt-1">Quản lý cài đặt hệ thống và tài khoản</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Account Settings Tab */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quản lý tài khoản</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Key className="w-5 h-5" />
                  Đổi mật khẩu
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tài khoản
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vai trò
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đăng nhập cuối
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {accountsLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                          <p className="text-gray-500 mt-2">Đang tải tài khoản...</p>
                        </td>
                      </tr>
                    ) : (
                      accounts.slice(0, 10).map(account => (
                        <tr key={account.accountID} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {account.username}
                              </div>
                              <div className="text-sm text-gray-500">
                                {account.email || 'Chưa có email'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {account.roleName || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                checked={account.isActive}
                                onChange={() => handleAccountToggle(account)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {account.isActive ? 'Hoạt động' : 'Tạm khóa'}
                              </span>
                            </label>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {account.lastLogin ? formatUtils.formatDateTime(account.lastLogin) : 'Chưa từng'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => toast.info('Chức năng chỉnh sửa sẽ được phát triển!')}
                            >
                              Chỉnh sửa
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Cấu hình hệ thống</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên website
                  </label>
                  <input
                    type="text"
                    defaultValue={mockSystemConfig.siteName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    defaultValue={mockSystemConfig.contactEmail}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại hỗ trợ
                  </label>
                  <input
                    type="tel"
                    defaultValue={mockSystemConfig.supportPhone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Múi giờ
                  </label>
                  <select
                    defaultValue={mockSystemConfig.timezone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Asia/Ho_Chi_Minh">Vietnam (UTC+7)</option>
                    <option value="UTC">UTC (UTC+0)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngôn ngữ
                  </label>
                  <select
                    defaultValue={mockSystemConfig.language}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn vị tiền tệ
                  </label>
                  <select
                    defaultValue={mockSystemConfig.currency}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="VND">VND (₫)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Cho phép đăng ký mới</div>
                    <div className="text-sm text-gray-500">Người dùng có thể tạo tài khoản mới</div>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={mockSystemConfig.enableRegistration}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Chế độ bảo trì</div>
                    <div className="text-sm text-gray-500">Tạm khóa truy cập cho người dùng thường</div>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={mockSystemConfig.maintenanceMode}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => toast.success('Cài đặt hệ thống đã được lưu!')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Lưu cài đặt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Chính sách bảo mật</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Độ dài mật khẩu tối thiểu
                  </label>
                  <input
                    type="number"
                    defaultValue={mockSecurityPolicies.passwordMinLength}
                    min="6"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian timeout session (phút)
                  </label>
                  <input
                    type="number"
                    defaultValue={mockSecurityPolicies.sessionTimeout}
                    min="5"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lần đăng nhập sai tối đa
                  </label>
                  <input
                    type="number"
                    defaultValue={mockSecurityPolicies.maxLoginAttempts}
                    min="3"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian khóa tài khoản (phút)
                  </label>
                  <input
                    type="number"
                    defaultValue={mockSecurityPolicies.lockoutDuration}
                    min="5"
                    max="60"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Yêu cầu mật khẩu</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Chữ hoa</span>
                    <input
                      type="checkbox"
                      defaultChecked={mockSecurityPolicies.passwordRequireUppercase}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Chữ thường</span>
                    <input
                      type="checkbox"
                      defaultChecked={mockSecurityPolicies.passwordRequireLowercase}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Số</span>
                    <input
                      type="checkbox"
                      defaultChecked={mockSecurityPolicies.passwordRequireNumbers}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Ký tự đặc biệt</span>
                    <input
                      type="checkbox"
                      defaultChecked={mockSecurityPolicies.passwordRequireSpecialChars}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => toast.success('Chính sách bảo mật đã được cập nhật!')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Lưu chính sách
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Cài đặt thông báo</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email thông báo</div>
                    <div className="text-sm text-gray-500">Nhận thông báo qua email</div>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={mockNotificationSettings.emailNotifications}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Cập nhật đơn hàng</div>
                    <div className="text-sm text-gray-500">Thông báo khi có thay đổi đơn hàng</div>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={mockNotificationSettings.orderUpdates}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Cảnh báo hệ thống</div>
                    <div className="text-sm text-gray-500">Thông báo lỗi và bảo trì hệ thống</div>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={mockNotificationSettings.systemAlerts}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Báo cáo hàng tuần</div>
                    <div className="text-sm text-gray-500">Tóm tắt hoạt động hàng tuần</div>
                  </div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={mockNotificationSettings.weeklyReports}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => toast.success('Cài đặt thông báo đã được lưu!')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Lưu cài đặt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Management Tab */}
      {activeTab === 'data' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quản lý dữ liệu</h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Sao lưu dữ liệu</h4>
                  
                  <button
                    onClick={() => toast.success('Đang tạo bản sao lưu...')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Tạo bản sao lưu
                  </button>

                  <button
                    onClick={() => toast.info('Chức năng restore sẽ được phát triển!')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    Khôi phục dữ liệu
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Xuất dữ liệu</h4>
                  
                  <button
                    onClick={() => toast.success('Đang xuất dữ liệu khách hàng...')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Xuất dữ liệu khách hàng
                  </button>

                  <button
                    onClick={() => toast.success('Đang xuất dữ liệu đơn hàng...')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Xuất dữ liệu đơn hàng
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-yellow-800">Lưu ý quan trọng</h5>
                    <p className="text-sm text-yellow-700 mt-1">
                      Việc sao lưu và khôi phục dữ liệu có thể mất thời gian. 
                      Vui lòng không tắt trình duyệt trong quá trình thực hiện.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Đổi mật khẩu</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu hiện tại
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={changePasswordMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {changePasswordMutation.isPending ? 'Đang thay đổi...' : 'Đổi mật khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;