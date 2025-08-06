import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { useOrders, useDeleteOrder, useUpdateOrderStatus } from '../../hooks/useOrders';
import { Button, Input, Card, Badge, LoadingSpinner } from '../../components/common';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/Table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/Pagination';
import { cn } from '../../utils/cn';
import { ORDER_STAGES, ORDER_PRIORITIES } from '../../constants/ui';
import { format } from 'date-fns';

const OrderListPage = () => {
  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  // State cho dropdown
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  // Tạo params cho API call
  const params = {
    page: currentPage,
    pageSize: pageSize,
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    priority: priorityFilter !== 'all' ? priorityFilter : undefined,
  };

  const { data: ordersData, isLoading, error } = useOrders(params);
  const deleteOrderMutation = useDeleteOrder();
  const updateStatusMutation = useUpdateOrderStatus();

  // Extract data từ response
  const orders = ordersData?.items || ordersData || [];
  const totalItems = ordersData?.totalItems || ordersData?.length || 0;
  const totalPages = ordersData?.totalPages || Math.ceil(totalItems / pageSize);

  // Reset về trang 1 khi thay đổi filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  // Tạo array các trang để hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
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
              placeholder="Tìm kiếm theo mã đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="w-full justify-between"
            >
              {statusFilter === 'all' ? 'Tất cả trạng thái' : statusFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
            {showStatusDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setStatusFilter('all');
                      setShowStatusDropdown(false);
                    }}
                  >
                    Tất cả trạng thái
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setStatusFilter('New');
                      setShowStatusDropdown(false);
                    }}
                  >
                    Mới
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setStatusFilter('In Progress');
                      setShowStatusDropdown(false);
                    }}
                  >
                    Đang xử lý
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setStatusFilter('Completed');
                      setShowStatusDropdown(false);
                    }}
                  >
                    Hoàn thành
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setStatusFilter('Cancelled');
                      setShowStatusDropdown(false);
                    }}
                  >
                    Đã hủy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              className="w-full justify-between"
            >
              {priorityFilter === 'all' ? 'Tất cả độ ưu tiên' : priorityFilter}
              <ChevronDown className="h-4 w-4" />
            </Button>
            {showPriorityDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setPriorityFilter('all');
                      setShowPriorityDropdown(false);
                    }}
                  >
                    Tất cả độ ưu tiên
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setPriorityFilter('High');
                      setShowPriorityDropdown(false);
                    }}
                  >
                    Cao
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setPriorityFilter('Medium');
                      setShowPriorityDropdown(false);
                    }}
                  >
                    Trung bình
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setPriorityFilter('Low');
                      setShowPriorityDropdown(false);
                    }}
                  >
                    Thấp
                  </button>
                </div>
              </div>
            )}
          </div>

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

      {/* Orders Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Đơn</TableHead>
                <TableHead>Khách Hàng</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Phương Tiện</TableHead>
                <TableHead>Nhân Viên</TableHead>
                <TableHead>Tổng Tiền</TableHead>
                <TableHead>Ngày Tạo</TableHead>
                <TableHead className="text-right">Hành Động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const stageInfo = getStageInfo(order.currentStage);
                
                return (
                  <TableRow key={order.orderID}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{order.orderID}</div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(order.orderDate), 'dd/MM/yyyy HH:mm')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerFullName || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{order.customerPhone || 'N/A'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
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
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.vehicleModelName}</div>
                        <div className="text-sm text-gray-500">{order.vehicleBrandName}</div>
                        <div className="text-xs text-gray-400 font-mono">{order.chassisNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{order.assignedEmployeeFullName || 'Chưa phân công'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {format(new Date(order.orderDate), 'dd/MM/yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/orders/${order.orderID}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/orders/${order.orderID}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteOrder(order.orderID)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-12">
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
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalItems)} của {totalItems} đơn hàng
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Hiển thị:</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">mỗi trang</span>
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === 'ellipsis' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </Card>
      )}

      {/* Summary Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
            <div className="text-sm text-gray-600">Tổng đơn hàng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.orderStatus === 'New').length}
            </div>
            <div className="text-sm text-gray-600">Đơn mới</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.orderStatus === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-600">Đang xử lý</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.orderStatus === 'Completed').length}
            </div>
            <div className="text-sm text-gray-600">Hoàn thành</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderListPage;