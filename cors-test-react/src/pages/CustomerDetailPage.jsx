import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  CreditCard,
  Car,
  FileText,
  Clock
} from 'lucide-react';
import { Button, Card, Badge, LoadingSpinner } from '../components/common';
import { customerService } from '../services/customers';
import { format } from 'date-fns';

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: customer, isLoading, error } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerService.getCustomerById(id),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      try {
        await customerService.deleteCustomer(id);
        toast.success('Xóa khách hàng thành công!');
        navigate('/customers');
      } catch (error) {
        console.error('Error deleting customer:', error);
        toast.error('Có lỗi xảy ra khi xóa khách hàng');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">Không thể tải thông tin khách hàng</p>
          <Button onClick={() => navigate('/customers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy khách hàng</p>
          <Button onClick={() => navigate('/customers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/customers')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chi tiết khách hàng</h1>
            <p className="text-gray-600">Thông tin chi tiết về khách hàng</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Link to={`/customers/${id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Thông tin cơ bản
              </h3>
              <Badge variant="success" size="sm">
                {customer.accountRoleName}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Họ tên</label>
                <p className="text-gray-900 font-medium">{customer.customerFullName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Mã khách hàng</label>
                <p className="text-gray-900 font-medium">{customer.customerID}</p>
              </div>
              
              {customer.gender && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Giới tính</label>
                  <p className="text-gray-900">
                    {customer.gender === 'Male' ? 'Nam' : 
                     customer.gender === 'Female' ? 'Nữ' : 'Khác'}
                  </p>
                </div>
              )}
              
              {customer.dateOfBirth && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Ngày sinh</label>
                  <p className="text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(customer.dateOfBirth), 'dd/MM/yyyy')}
                  </p>
                </div>
              )}
              
              {customer.identityCard && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Số CMND/CCCD</label>
                  <p className="text-gray-900 flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    {customer.identityCard}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Thông tin liên hệ
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                  <p className="text-gray-900">{customer.phoneNumber}</p>
                </div>
              </div>
              
              {customer.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{customer.email}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                  <p className="text-gray-900">{customer.address}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Orders */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Đơn hàng gần đây
            </h3>
            
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Chưa có đơn hàng nào</p>
              <p className="text-sm text-gray-400">Đơn hàng sẽ hiển thị ở đây khi khách hàng đặt hàng</p>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Vehicles */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Phương tiện
            </h3>
            
            <div className="text-center py-8">
              <Car className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Chưa có phương tiện</p>
              <p className="text-sm text-gray-400">Thông tin xe sẽ hiển thị ở đây</p>
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng đơn hàng</span>
                <span className="font-semibold text-gray-900">0</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng chi tiêu</span>
                <span className="font-semibold text-gray-900">0 VNĐ</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Đơn hàng gần nhất</span>
                <span className="text-gray-500">Chưa có</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Trạng thái</span>
                <Badge variant="success" size="sm">Hoạt động</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;