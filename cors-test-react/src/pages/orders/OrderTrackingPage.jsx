import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '../../services/orders';
import toast from 'react-hot-toast';

const OrderTrackingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  // Query to get tracking data
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders-tracking', searchTerm],
    queryFn: () => orderService.getOrderTracking(searchTerm),
    enabled: !!searchTerm,
    retry: false
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error('Vui lòng nhập mã đơn hàng hoặc biển số xe');
      return;
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'New': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStageColor = (stage) => {
    const stageColors = {
      'New Profile': 'bg-blue-100 text-blue-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Production': 'bg-orange-100 text-orange-800',
      'Installation': 'bg-yellow-100 text-yellow-800',
      'Quality Check': 'bg-indigo-100 text-indigo-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return stageColors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getProgressPercentage = (stage) => {
    const stageProgress = {
      'New Profile': 10,
      'Design': 30,
      'Production': 60,
      'Installation': 85,
      'Quality Check': 95,
      'Completed': 100
    };
    return stageProgress[stage] || 0;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Theo dõi tiến độ đơn hàng</h1>
          <p className="text-gray-600 mt-1">Nhập mã đơn hàng hoặc biển số xe để theo dõi tiến độ</p>
        </div>

        {/* Search Form */}
        <div className="p-6 border-b border-gray-200">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập mã đơn hàng hoặc biển số xe..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="p-6">
          {error && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Không tìm thấy đơn hàng</h3>
              <p className="text-gray-600">Vui lòng kiểm tra lại mã đơn hàng hoặc biển số xe</p>
            </div>
          )}

          {!searchTerm && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tìm kiếm đơn hàng</h3>
              <p className="text-gray-600">Nhập mã đơn hàng hoặc biển số xe để bắt đầu theo dõi tiến độ</p>
            </div>
          )}

          {orders && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.orderID} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Đơn hàng #{order.orderID}
                        </h3>
                        <p className="text-gray-600">
                          Biển số: {order.licensePlate} | Khách hàng: {order.customerName}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Ngày tạo: {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-6 py-4">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Tiến độ hiện tại</span>
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getStageColor(order.currentStage)}`}>
                          {order.currentStage}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(order.currentStage)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>0%</span>
                        <span>{getProgressPercentage(order.currentStage)}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Lịch sử tiến độ</h4>
                      {order.stageHistory && order.stageHistory.length > 0 ? (
                        <div className="space-y-2">
                          {order.stageHistory.map((stage, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${stage.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900">{stage.stageName}</span>
                                  {stage.completedAt && (
                                    <span className="text-xs text-gray-500">
                                      {new Date(stage.completedAt).toLocaleDateString('vi-VN')}
                                    </span>
                                  )}
                                </div>
                                {stage.notes && (
                                  <p className="text-xs text-gray-600 mt-1">{stage.notes}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">Chưa có lịch sử tiến độ</p>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Dịch vụ:</span>
                          <p className="text-gray-600">{order.serviceDescription || 'Chưa có thông tin'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Giá trị đơn hàng:</span>
                          <p className="text-gray-600">
                            {order.totalAmount ? `${order.totalAmount.toLocaleString('vi-VN')} VNĐ` : 'Chưa xác định'}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Ngày hoàn thành dự kiến:</span>
                          <p className="text-gray-600">
                            {order.expectedCompletionDate 
                              ? new Date(order.expectedCompletionDate).toLocaleDateString('vi-VN')
                              : 'Chưa xác định'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {orders && orders.length === 0 && searchTerm && !isLoading && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Không tìm thấy đơn hàng</h3>
              <p className="text-gray-600">Không có đơn hàng nào khớp với từ khóa "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;