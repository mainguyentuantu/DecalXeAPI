import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { orderService } from '../../services/orders';

const OrderCreatePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    vehicleID: '',
    licensePlate: '',
    serviceType: '',
    description: '',
    estimatedPrice: '',
    depositAmount: '',
    expectedCompletionDate: ''
  });

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: (data) => {
      toast.success('Tạo đơn hàng thành công!');
      queryClient.invalidateQueries(['orders']);
      navigate(`/orders/${data.orderID}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.customerName || !formData.customerPhone || !formData.licensePlate) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    const orderData = {
      ...formData,
      estimatedPrice: parseFloat(formData.estimatedPrice) || 0,
      depositAmount: parseFloat(formData.depositAmount) || 0,
      expectedCompletionDate: formData.expectedCompletionDate || null
    };

    createOrderMutation.mutate(orderData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Tạo đơn hàng mới</h1>
            <button
              onClick={() => navigate('/orders')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Quay lại
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Thông tin khách hàng</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên khách hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Thông tin xe</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biển số xe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Phương tiện
                </label>
                <input
                  type="text"
                  name="vehicleID"
                  value={formData.vehicleID}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Thông tin dịch vụ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại dịch vụ
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn loại dịch vụ</option>
                  <option value="decal-design">Thiết kế decal</option>
                  <option value="decal-installation">Dán decal</option>
                  <option value="decal-removal">Gỡ decal</option>
                  <option value="maintenance">Bảo trì</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày hoàn thành dự kiến
                </label>
                <input
                  type="date"
                  name="expectedCompletionDate"
                  value={formData.expectedCompletionDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả công việc
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả chi tiết về công việc cần thực hiện..."
              />
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Thông tin giá cả</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá ước tính (VNĐ)
                </label>
                <input
                  type="number"
                  name="estimatedPrice"
                  value={formData.estimatedPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số tiền đặt cọc (VNĐ)
                </label>
                <input
                  type="number"
                  name="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleInputChange}
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={createOrderMutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createOrderMutation.isPending ? 'Đang tạo...' : 'Tạo đơn hàng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderCreatePage;