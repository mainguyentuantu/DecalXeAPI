import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import Card from "../common/Card";
import LoadingSpinner from "../common/LoadingSpinner";

const OrderCreateDemo = () => {
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
    
    // Order Information
    totalAmount: "",
    assignedEmployeeID: "",
    expectedArrivalTime: "",
    priority: "Normal",
    isCustomDecal: false,
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Mock data
  const mockData = {
    vehicleBrands: [
      { brandId: "1", brandName: "Toyota" },
      { brandId: "2", brandName: "Honda" },
      { brandId: "3", brandName: "Hyundai" },
    ],
    vehicleModels: [
      { modelId: "1", modelName: "Camry", vehicleBrandId: "1" },
      { modelId: "2", modelName: "Corolla", vehicleBrandId: "1" },
      { modelId: "3", modelName: "Civic", vehicleBrandId: "2" },
      { modelId: "4", modelName: "Accord", vehicleBrandId: "2" },
      { modelId: "5", modelName: "Elantra", vehicleBrandId: "3" },
    ],
    salesEmployees: [
      { employeeId: "1", firstName: "Nguyễn", lastName: "Văn A" },
      { employeeId: "2", firstName: "Trần", lastName: "Thị B" },
      { employeeId: "3", firstName: "Lê", lastName: "Văn C" },
    ],
  };

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API calls
    for (let step = 1; step <= 3; step++) {
      setCurrentStep(step);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsSubmitting(false);
    setCurrentStep(1);
    alert("Demo: Đơn hàng đã được tạo thành công!");
  };

  // Get filtered vehicle models based on selected brand
  const filteredVehicleModels = mockData.vehicleModels.filter(
    (model) => !formState.vehicleBrand || model.vehicleBrandId === formState.vehicleBrand
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Demo: Tạo đơn hàng mới
        </h1>
        <p className="text-gray-600">Giao diện demo theo format API backend mới</p>
        
        {/* Progress indicator when submitting */}
        {isSubmitting && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span className="text-blue-700">
                Bước {currentStep}/3: {
                  currentStep === 1 ? "Tạo khách hàng" :
                  currentStep === 2 ? "Tạo thông tin xe" :
                  "Tạo đơn hàng"
                }
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Information */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">1</span>
              Thông tin khách hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Họ *"
                value={formState.customerFirstName}
                onChange={(e) =>
                  handleInputChange("customerFirstName", e.target.value)
                }
                required
                disabled={isSubmitting}
              />
              <Input
                label="Tên *"
                value={formState.customerLastName}
                onChange={(e) =>
                  handleInputChange("customerLastName", e.target.value)
                }
                required
                disabled={isSubmitting}
              />
              <Input
                label="Số điện thoại *"
                value={formState.customerPhone}
                onChange={(e) =>
                  handleInputChange("customerPhone", e.target.value)
                }
                required
                disabled={isSubmitting}
              />
              <Input
                label="Email"
                type="email"
                value={formState.customerEmail}
                onChange={(e) =>
                  handleInputChange("customerEmail", e.target.value)
                }
                disabled={isSubmitting}
              />
              <div className="md:col-span-2">
                <Input
                  label="Địa chỉ"
                  value={formState.customerAddress}
                  onChange={(e) =>
                    handleInputChange("customerAddress", e.target.value)
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">2</span>
              Thông tin xe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Hãng xe"
                value={formState.vehicleBrand}
                onChange={(e) =>
                  handleInputChange("vehicleBrand", e.target.value)
                }
                disabled={isSubmitting}>
                <option value="">Chọn hãng xe</option>
                {mockData.vehicleBrands.map((brand) => (
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
                required
                disabled={isSubmitting}>
                <option value="">Chọn dòng xe</option>
                {filteredVehicleModels.map((model) => (
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
                disabled={isSubmitting}
                placeholder="Ví dụ: 30A-12345"
              />
              <Input
                label="Số khung *"
                value={formState.chassisNumber}
                onChange={(e) =>
                  handleInputChange("chassisNumber", e.target.value)
                }
                required
                disabled={isSubmitting}
                placeholder="Ví dụ: JTDKN3DP0E0123456"
              />
              <Input
                label="Màu xe"
                value={formState.vehicleColor}
                onChange={(e) =>
                  handleInputChange("vehicleColor", e.target.value)
                }
                disabled={isSubmitting}
                placeholder="Ví dụ: Trắng"
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
                disabled={isSubmitting}
                placeholder="Ví dụ: 2020"
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
                  disabled={isSubmitting}
                  placeholder="Ví dụ: 50000"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">3</span>
              Chi tiết đơn hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tổng tiền (VNĐ) *"
                type="number"
                min="0"
                step="1000"
                value={formState.totalAmount}
                onChange={(e) =>
                  handleInputChange("totalAmount", e.target.value)
                }
                required
                disabled={isSubmitting}
                placeholder="Ví dụ: 500000"
              />
              <Select
                label="Nhân viên phụ trách"
                value={formState.assignedEmployeeID}
                onChange={(e) =>
                  handleInputChange("assignedEmployeeID", e.target.value)
                }
                disabled={isSubmitting}>
                <option value="">Chọn nhân viên</option>
                {mockData.salesEmployees.map((employee) => (
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
                disabled={isSubmitting}
              />
              <Select
                label="Độ ưu tiên"
                value={formState.priority}
                onChange={(e) =>
                  handleInputChange("priority", e.target.value)
                }
                disabled={isSubmitting}>
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
                    disabled={isSubmitting}
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
                  placeholder="Nhập mô tả chi tiết về đơn hàng, yêu cầu đặc biệt..."
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* API Format Preview */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">API</span>
              Format sẽ gửi lên backend
            </h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{JSON.stringify({
  totalAmount: parseFloat(formState.totalAmount) || 0,
  assignedEmployeeID: formState.assignedEmployeeID || null,
  vehicleID: "sẽ-được-tạo-sau-khi-tạo-xe",
  expectedArrivalTime: formState.expectedArrivalTime ? new Date(formState.expectedArrivalTime).toISOString() : null,
  priority: formState.priority || "Normal",
  isCustomDecal: formState.isCustomDecal,
  description: formState.description || null,
}, null, 2)}
            </pre>
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}>
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang tạo..." : "Demo: Tạo đơn hàng"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderCreateDemo;