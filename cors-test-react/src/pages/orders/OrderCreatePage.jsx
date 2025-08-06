import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderCreateFormData, useCreateOrder } from "../../hooks/useOrders";
import { useCustomerVehicles } from "../../hooks/useVehicles";
import { toast } from "react-hot-toast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { Textarea } from "../../components/ui/Textarea";
import Card from "../../components/common/Card";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import DateTimePicker from "../../components/ui/DateTimePicker";
import VehicleSearchInput from "../../components/ui/VehicleSearchInput";
import SearchableSelect from "../../components/ui/SearchableSelect";

const OrderCreatePage = () => {
  const navigate = useNavigate();
  const { data: formData, isLoading: isFormDataLoading, error: formDataError } = useOrderCreateFormData();
  const { data: vehicles = [], isLoading: isVehiclesLoading } = useCustomerVehicles();
  const createOrderMutation = useCreateOrder();

  // Form state
  const [formState, setFormState] = useState({
    totalAmount: "",
    assignedEmployeeID: "",
    vehicleID: "",
    expectedArrivalTime: null,
    priority: "",
    isCustomDecal: false,
    description: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Selected vehicle info for display
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Priority options
  const priorityOptions = [
    { value: "Low", label: "Thấp", color: "text-green-600" },
    { value: "Medium", label: "Trung bình", color: "text-yellow-600" },
    { value: "High", label: "Cao", color: "text-red-600" },
  ];

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    handleInputChange("vehicleID", vehicle?.vehicleID || "");
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formState.totalAmount || parseFloat(formState.totalAmount) <= 0) {
      newErrors.totalAmount = "Vui lòng nhập tổng tiền hợp lệ";
    }

    if (!formState.assignedEmployeeID) {
      newErrors.assignedEmployeeID = "Vui lòng chọn nhân viên thực hiện";
    }

    if (!formState.vehicleID) {
      newErrors.vehicleID = "Vui lòng chọn phương tiện";
    }

    if (!formState.expectedArrivalTime) {
      newErrors.expectedArrivalTime = "Vui lòng chọn ngày dự kiến đến";
    } else {
      // Check if the date is in the future
      const selectedDate = new Date(formState.expectedArrivalTime);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.expectedArrivalTime = "Ngày dự kiến đến phải sau thời điểm hiện tại";
      }
    }

    if (!formState.priority) {
      newErrors.priority = "Vui lòng chọn độ ưu tiên";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin đã nhập");
      return;
    }

    try {
      const orderData = {
        totalAmount: parseFloat(formState.totalAmount),
        assignedEmployeeID: formState.assignedEmployeeID,
        vehicleID: formState.vehicleID,
        expectedArrivalTime: formState.expectedArrivalTime,
        priority: formState.priority,
        isCustomDecal: formState.isCustomDecal,
        description: formState.description,
      };

      const createdOrder = await createOrderMutation.mutateAsync(orderData);
      
      // Sử dụng thông tin đầy đủ từ response để hiển thị thông báo chi tiết
      let successMessage = "Đã tạo đơn hàng thành công";
      if (createdOrder.vehicleBrandName && createdOrder.vehicleModelName) {
        successMessage += ` cho xe ${createdOrder.vehicleBrandName} ${createdOrder.vehicleModelName}`;
        if (createdOrder.chassisNumber) {
          successMessage += ` (${createdOrder.chassisNumber})`;
        }
      }
      
      toast.success(successMessage);
      navigate("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng");
    }
  };

  // Loading state
  if (isFormDataLoading || isVehiclesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (formDataError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không thể tải dữ liệu</h3>
          <p className="text-gray-500 mb-4">Vui lòng thử lại sau</p>
          <Button onClick={() => window.location.reload()}>
            Tải lại trang
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tạo Đơn Hàng Mới</h1>
          <p className="text-gray-600 mt-1">Nhập thông tin chi tiết để tạo đơn hàng dán decal</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Thông Tin Cơ Bản</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tổng tiền"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formState.totalAmount}
                  onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                  error={errors.totalAmount}
                  required
                  placeholder="0.00"
                  helper="Nhập tổng số tiền của đơn hàng"
                />

                <SearchableSelect
                  label="Độ ưu tiên"
                  value={formState.priority}
                  onChange={(value) => handleInputChange("priority", value)}
                  options={priorityOptions}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  placeholder="Chọn độ ưu tiên..."
                  searchPlaceholder="Tìm kiếm độ ưu tiên..."
                  error={errors.priority}
                  required
                />
              </div>

              <div className="mt-4">
                <DateTimePicker
                  label="Ngày dự kiến đến"
                  value={formState.expectedArrivalTime}
                  onChange={(value) => handleInputChange("expectedArrivalTime", value)}
                  error={errors.expectedArrivalTime}
                  required
                  minDate={new Date()}
                  helper="Chọn ngày và giờ khách hàng dự kiến đến"
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Mô tả"
                  value={formState.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Nhập mô tả chi tiết về đơn hàng..."
                  rows={3}
                  helper="Mô tả chi tiết về yêu cầu dán decal"
                />
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.isCustomDecal}
                    onChange={(e) => handleInputChange("isCustomDecal", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Đây là decal tùy chỉnh
                  </span>
                </label>
              </div>
            </Card>

            {/* Assignment Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Phân Công & Phương Tiện</h2>
              </div>

              <div className="space-y-4">
                <SearchableSelect
                  label="Nhân viên thực hiện"
                  value={formState.assignedEmployeeID}
                  onChange={(value) => handleInputChange("assignedEmployeeID", value)}
                  options={formData?.employees || []}
                  getOptionLabel={(emp) => `${emp.firstName} ${emp.lastName} - ${emp.storeName || 'N/A'}`}
                  getOptionValue={(emp) => emp.employeeID}
                  placeholder="Chọn nhân viên..."
                  searchPlaceholder="Tìm kiếm nhân viên..."
                  error={errors.assignedEmployeeID}
                  required
                  helper="Chọn nhân viên sẽ thực hiện đơn hàng này"
                />

                <VehicleSearchInput
                  label="Phương tiện"
                  value={formState.vehicleID}
                  onChange={(value) => handleInputChange("vehicleID", value)}
                  onSelect={handleVehicleSelect}
                  vehicles={vehicles}
                  error={errors.vehicleID}
                  required
                  helper="Tìm kiếm theo biển số hoặc số khung xe"
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Vehicle Info */}
            {selectedVehicle && (
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Thông Tin Xe
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Biển số:</span>
                    <span className="font-medium">{selectedVehicle.licensePlate || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Số khung:</span>
                    <span className="font-medium">{selectedVehicle.chassisNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hãng xe:</span>
                    <span className="font-medium">{selectedVehicle.vehicleBrandName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Model:</span>
                    <span className="font-medium">{selectedVehicle.vehicleModelName}</span>
                  </div>
                  {selectedVehicle.customerFullName && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Khách hàng:</span>
                      <span className="font-medium">{selectedVehicle.customerFullName}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="p-4">
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Đang tạo đơn hàng...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Tạo Đơn Hàng
                    </div>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/orders")}
                  disabled={createOrderMutation.isPending}
                >
                  Hủy bỏ
                </Button>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-2">
                <svg className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Lưu ý:</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Tất cả trường có dấu (*) là bắt buộc</li>
                    <li>• Ngày dự kiến đến phải sau thời điểm hiện tại</li>
                    <li>• Có thể tìm kiếm phương tiện bằng biển số hoặc số khung</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderCreatePage;
