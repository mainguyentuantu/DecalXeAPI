import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderCreateFormData, useCreateOrder } from "../../hooks/useOrders";
import { useCreateCustomer } from "../../hooks/useCustomers";
import { useCreateCustomerVehicle } from "../../hooks/useCustomerVehicles";
import { toast } from "react-hot-toast";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { Select } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";
import Card from "../../components/common/Card";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const OrderCreatePage = () => {
  const navigate = useNavigate();
  const { data: formData, isLoading, error } = useOrderCreateFormData();
  const createOrderMutation = useCreateOrder();
  const createCustomerMutation = useCreateCustomer();
  const createVehicleMutation = useCreateCustomerVehicle();

  const [formState, setFormState] = useState({
    // Customer Information
    customerFirstName: "",
    customerLastName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    
    // Vehicle Information
    vehicleBrand: "",
    vehicleModel: "",
    licensePlate: "",
    chassisNumber: "",
    vehicleColor: "",
    vehicleYear: "",
    initialKM: "",
    
    // Order Information (matching CreateOrderDto)
    totalAmount: 0,
    assignedEmployeeID: "",
    vehicleID: "", // This will be set after vehicle creation
    expectedArrivalTime: "",
    priority: "Normal",
    isCustomDecal: false,
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!formState.customerFirstName || !formState.customerLastName || !formState.customerPhone) {
        toast.error("Vui lòng nhập đầy đủ thông tin khách hàng");
        return;
      }

      if (!formState.chassisNumber) {
        toast.error("Vui lòng nhập số khung xe");
        return;
      }

      if (!formState.vehicleModel) {
        toast.error("Vui lòng chọn dòng xe");
        return;
      }

      if (formState.totalAmount <= 0) {
        toast.error("Vui lòng nhập tổng tiền hợp lệ");
        return;
      }

      // Step 1: Create customer
      const customerData = {
        firstName: formState.customerFirstName,
        lastName: formState.customerLastName,
        phoneNumber: formState.customerPhone,
        email: formState.customerEmail || null,
        address: formState.customerAddress || null,
        accountID: null, // Not linking to account for now
      };

      const createdCustomer = await createCustomerMutation.mutateAsync(customerData);

      // Step 2: Create vehicle
      const vehicleData = {
        chassisNumber: formState.chassisNumber,
        licensePlate: formState.licensePlate || null,
        color: formState.vehicleColor || null,
        year: formState.vehicleYear ? parseInt(formState.vehicleYear) : null,
        initialKM: formState.initialKM ? parseFloat(formState.initialKM) : null,
        customerID: createdCustomer.customerID,
        modelID: formState.vehicleModel,
      };

      const createdVehicle = await createVehicleMutation.mutateAsync(vehicleData);

      // Step 3: Create order with the new backend format
      const orderData = {
        totalAmount: parseFloat(formState.totalAmount),
        assignedEmployeeID: formState.assignedEmployeeID || null,
        vehicleID: createdVehicle.vehicleID,
        expectedArrivalTime: formState.expectedArrivalTime ? new Date(formState.expectedArrivalTime).toISOString() : null,
        priority: formState.priority || "Normal",
        isCustomDecal: formState.isCustomDecal,
        description: formState.description || null,
      };

      await createOrderMutation.mutateAsync(orderData);
      navigate("/orders");
      
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Lỗi tải dữ liệu
          </h1>
          <p className="text-gray-600">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tạo đơn hàng mới
        </h1>
        <p className="text-gray-600">Nhập thông tin để tạo đơn hàng mới</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Information */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Họ *"
                value={formState.customerFirstName}
                onChange={(e) =>
                  handleInputChange("customerFirstName", e.target.value)
                }
                required
              />
              <Input
                label="Tên *"
                value={formState.customerLastName}
                onChange={(e) =>
                  handleInputChange("customerLastName", e.target.value)
                }
                required
              />
              <Input
                label="Số điện thoại *"
                value={formState.customerPhone}
                onChange={(e) =>
                  handleInputChange("customerPhone", e.target.value)
                }
                required
              />
              <Input
                label="Email"
                type="email"
                value={formState.customerEmail}
                onChange={(e) =>
                  handleInputChange("customerEmail", e.target.value)
                }
              />
              <div className="md:col-span-2">
                <Input
                  label="Địa chỉ"
                  value={formState.customerAddress}
                  onChange={(e) =>
                    handleInputChange("customerAddress", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin xe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Hãng xe"
                value={formState.vehicleBrand}
                onChange={(e) =>
                  handleInputChange("vehicleBrand", e.target.value)
                }>
                <option value="">Chọn hãng xe</option>
                {formData?.vehicleBrands?.map((brand) => (
                  <option key={brand.brandId} value={brand.brandId}>
                    {brand.brandName}
                  </option>
                ))}
              </Select>
              <Select
                label="Dòng xe *"
                value={formState.vehicleModel}
                onChange={(e) =>
                  handleInputChange("vehicleModel", e.target.value)
                }
                required>
                <option value="">Chọn dòng xe</option>
                {formData?.vehicleModels
                  ?.filter(
                    (model) =>
                      !formState.vehicleBrand ||
                      model.vehicleBrandId === formState.vehicleBrand
                  )
                  ?.map((model) => (
                    <option key={model.modelId} value={model.modelId}>
                      {model.modelName}
                    </option>
                  ))}
              </Select>
              <Input
                label="Biển số xe"
                value={formState.licensePlate}
                onChange={(e) =>
                  handleInputChange("licensePlate", e.target.value)
                }
              />
              <Input
                label="Số khung *"
                value={formState.chassisNumber}
                onChange={(e) =>
                  handleInputChange("chassisNumber", e.target.value)
                }
                required
              />
              <Input
                label="Màu xe"
                value={formState.vehicleColor}
                onChange={(e) =>
                  handleInputChange("vehicleColor", e.target.value)
                }
              />
              <Input
                label="Năm sản xuất"
                type="number"
                min="1990"
                max={new Date().getFullYear()}
                value={formState.vehicleYear}
                onChange={(e) =>
                  handleInputChange("vehicleYear", e.target.value)
                }
              />
              <div className="md:col-span-2">
                <Input
                  label="Số km ban đầu"
                  type="number"
                  min="0"
                  value={formState.initialKM}
                  onChange={(e) =>
                    handleInputChange("initialKM", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tổng tiền *"
                type="number"
                min="0"
                step="0.01"
                value={formState.totalAmount}
                onChange={(e) =>
                  handleInputChange("totalAmount", e.target.value)
                }
                required
              />
              <Select
                label="Nhân viên phụ trách"
                value={formState.assignedEmployeeID}
                onChange={(e) =>
                  handleInputChange("assignedEmployeeID", e.target.value)
                }>
                <option value="">Chọn nhân viên</option>
                {formData?.salesEmployees?.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </Select>
              <Input
                label="Thời gian dự kiến hoàn thành"
                type="datetime-local"
                value={formState.expectedArrivalTime}
                onChange={(e) =>
                  handleInputChange("expectedArrivalTime", e.target.value)
                }
              />
              <Select
                label="Độ ưu tiên"
                value={formState.priority}
                onChange={(e) =>
                  handleInputChange("priority", e.target.value)
                }>
                <option value="Low">Thấp</option>
                <option value="Normal">Bình thường</option>
                <option value="High">Cao</option>
                <option value="Urgent">Khẩn cấp</option>
              </Select>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    checked={formState.isCustomDecal}
                    onChange={(e) =>
                      handleInputChange("isCustomDecal", e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">Đây là decal tùy chỉnh</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label="Mô tả đơn hàng"
                  value={formState.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  placeholder="Nhập mô tả chi tiết về đơn hàng..."
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/orders")}
            disabled={isSubmitting}>
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang tạo..." : "Tạo đơn hàng"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderCreatePage;
