import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  User, 
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useOrders, useDeleteOrder, useUpdateOrderStatus } from '../../hooks/useOrders';
import { Button, Input, Card, Badge, LoadingSpinner } from '../../components/common';
import { cn } from '../../utils/cn';
import { ORDER_STAGES, ORDER_PRIORITIES } from '../../constants/ui';
import { format } from 'date-fns';

const OrderListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const { data: orders, isLoading, error } = useOrders();
  const deleteOrderMutation = useDeleteOrder();
  const updateStatusMutation = useUpdateOrderStatus();

  // Filter orders based on search and filters
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.assignedEmployeeFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vehicleModelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.chassisNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  }) || [];

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      deleteOrderMutation.mutate(orderId);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'primary';
      case 'In Progress': return 'warning';
      case 'Completed': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    return ORDER_PRIORITIES[priority?.toUpperCase()]?.color || 'bg-gray-100 text-gray-800';
  };

  const getStageInfo = (stageName) => {
    return Object.values(ORDER_STAGES).find(stage => 
      stage.label === stageName || stage.description.includes(stageName)
    ) || ORDER_STAGES.SURVEY;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
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
      <div className="text-center text-red-600 py-8">
        Có lỗi xảy ra khi tải danh sách đơn hàng: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-600">Danh sách tất cả đơn hàng trong hệ thống</p>
        </div>
        <Link to="/orders/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tạo đơn hàng mới
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="New">Mới</option>
            <option value="In Progress">Đang xử lý</option>
            <option value="Completed">Hoàn thành</option>
            <option value="Cancelled">Đã hủy</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="all">Tất cả độ ưu tiên</option>
            <option value="High">Cao</option>
            <option value="Medium">Trung bình</option>
            <option value="Low">Thấp</option>
          </select>

          {/* Clear Filters */}
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Xóa bộ lọc
          </Button>
        </div>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const stageInfo = getStageInfo(order.currentStage);
          
          return (
            <Card key={order.orderID} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.orderID}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={getStatusColor(order.orderStatus)} size="sm">
                    {order.orderStatus}
                  </Badge>
                  <Badge 
                    className={getPriorityColor(order.priority)} 
                    size="sm"
                  >
                    {order.priority}
                  </Badge>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="font-medium">{order.vehicleModelName}</span>
                  <span className="mx-2">•</span>
                  <span>{order.vehicleBrandName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-mono">{order.chassisNumber}</span>
                </div>
              </div>

              {/* Employee Assignment */}
              {order.assignedEmployeeFullName && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <User className="h-4 w-4 mr-2" />
                  <span>{order.assignedEmployeeFullName}</span>
                </div>
              )}

              {/* Current Stage */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Giai đoạn hiện tại</span>
                  <span className="text-xs text-gray-500">{stageInfo.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stageInfo.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{order.currentStage}</p>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Tổng tiền:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>

              {/* Expected Arrival */}
              {order.expectedArrivalTime && (
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Dự kiến: {format(new Date(order.expectedArrivalTime), 'dd/MM/yyyy HH:mm')}</span>
                </div>
              )}

              {/* Custom Decal Badge */}
              {order.isCustomDecal && (
                <div className="mb-4">
                  <Badge variant="info" size="sm">
                    Decal tùy chỉnh
                  </Badge>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Link to={`/orders/${order.orderID}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Xem
                    </Button>
                  </Link>
                  <Link to={`/orders/${order.orderID}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Sửa
                    </Button>
                  </Link>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteOrder(order.orderID)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy đơn hàng nào
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
              ? 'Thử điều chỉnh bộ lọc để xem thêm kết quả.'
              : 'Hãy tạo đơn hàng đầu tiên.'
            }
          </p>
          <Link to="/orders/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo đơn hàng mới
            </Button>
          </Link>
        </Card>
      )}

      {/* Summary Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{filteredOrders.length}</div>
            <div className="text-sm text-gray-600">Tổng đơn hàng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {filteredOrders.filter(o => o.orderStatus === 'New').length}
            </div>
            <div className="text-sm text-gray-600">Đơn mới</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredOrders.filter(o => o.orderStatus === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-600">Đang xử lý</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredOrders.filter(o => o.orderStatus === 'Completed').length}
            </div>
            <div className="text-sm text-gray-600">Hoàn thành</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderListPage;