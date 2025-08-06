import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderCreateFormData, useCreateOrder } from "../../hooks/useOrders";
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

  const [formState, setFormState] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    vehicleBrand: "",
    vehicleModel: "",
    licensePlate: "",
    chassisNumber: "",
    decalServices: [],
    decalTypes: [],
    storeId: "",
    assignedEmployeeId: "",
    estimatedCompletionDate: "",
    notes: "",
    totalAmount: 0,
  });

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceChange = (serviceId, checked) => {
    setFormState((prev) => ({
      ...prev,
      decalServices: checked
        ? [...prev.decalServices, serviceId]
        : prev.decalServices.filter((id) => id !== serviceId),
    }));
  };

  const handleTypeChange = (typeId, checked) => {
    setFormState((prev) => ({
      ...prev,
      decalTypes: checked
        ? [...prev.decalTypes, typeId]
        : prev.decalTypes.filter((id) => id !== typeId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.customerName || !formState.customerPhone) {
      toast.error("Vui lòng nhập tên và số điện thoại khách hàng");
      return;
    }

    if (formState.decalServices.length === 0) {
      toast.error("Vui lòng chọn ít nhất một dịch vụ");
      return;
    }

    const orderData = {
      customerName: formState.customerName,
      customerPhone: formState.customerPhone,
      customerEmail: formState.customerEmail,
      vehicleId: formState.vehicleModel, // Assuming vehicleModel contains the vehicle ID
      licensePlate: formState.licensePlate,
      chassisNumber: formState.chassisNumber,
      storeId: formState.storeId,
      assignedEmployeeId: formState.assignedEmployeeId,
      estimatedCompletionDate: formState.estimatedCompletionDate,
      notes: formState.notes,
      totalAmount: formState.totalAmount,
      orderDetails: [
        ...formState.decalServices.map((serviceId) => ({
          decalServiceId: serviceId,
          quantity: 1,
        })),
        ...formState.decalTypes.map((typeId) => ({
          decalTypeId: typeId,
          quantity: 1,
        })),
      ],
    };

    try {
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
                label="Tên khách hàng *"
                value={formState.customerName}
                onChange={(e) =>
                  handleInputChange("customerName", e.target.value)
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
                label="Dòng xe"
                value={formState.vehicleModel}
                onChange={(e) =>
                  handleInputChange("vehicleModel", e.target.value)
                }>
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
                label="Số khung"
                value={formState.chassisNumber}
                onChange={(e) =>
                  handleInputChange("chassisNumber", e.target.value)
                }
              />
            </div>
          </div>
        </Card>

        {/* Services and Types */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Dịch vụ và loại decal
            </h2>

            {/* Decal Services */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Dịch vụ decal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData?.decalServices?.map((service) => (
                  <label
                    key={service.serviceId}
                    className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formState.decalServices.includes(
                        service.serviceId
                      )}
                      onChange={(e) =>
                        handleServiceChange(service.serviceId, e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{service.serviceName}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Decal Types */}
            <div>
              <h3 className="text-lg font-medium mb-3">Loại decal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData?.decalTypes?.map((type) => (
                  <label
                    key={type.typeId}
                    className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formState.decalTypes.includes(type.typeId)}
                      onChange={(e) =>
                        handleTypeChange(type.typeId, e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{type.typeName}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Cửa hàng"
                value={formState.storeId}
                onChange={(e) => handleInputChange("storeId", e.target.value)}>
                <option value="">Chọn cửa hàng</option>
                {formData?.stores?.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                ))}
              </Select>
              <Select
                label="Nhân viên phụ trách"
                value={formState.assignedEmployeeId}
                onChange={(e) =>
                  handleInputChange("assignedEmployeeId", e.target.value)
                }>
                <option value="">Chọn nhân viên</option>
                {formData?.salesEmployees?.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </Select>
              <Input
                label="Ngày dự kiến hoàn thành"
                type="date"
                value={formState.estimatedCompletionDate}
                onChange={(e) =>
                  handleInputChange("estimatedCompletionDate", e.target.value)
                }
              />
              <Input
                label="Tổng tiền"
                type="number"
                value={formState.totalAmount}
                onChange={(e) =>
                  handleInputChange(
                    "totalAmount",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
            <div className="mt-4">
              <Textarea
                label="Ghi chú"
                value={formState.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/orders")}>
            Hủy
          </Button>
          <Button type="submit" disabled={createOrderMutation.isPending}>
            {createOrderMutation.isPending ? "Đang tạo..." : "Tạo đơn hàng"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderCreatePage;
