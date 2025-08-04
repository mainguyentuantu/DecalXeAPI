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

      if (formState.decalServices.length === 0 && formState.decalTypes.length === 0) {
        toast.error("Vui lòng chọn ít nhất một dịch vụ hoặc loại decal");
        return;
      }

      if (formState.totalAmount <= 0) {
        toast.error("Vui lòng nhập tổng tiền hợp lệ");
        return;
      }

    const orderData = {
      customerName: formState.customerName,
      customerPhone: formState.customerPhone,
      customerEmail: formState.customerEmail,
      vehicleID: formState.vehicleModel, // Assuming vehicleModel contains the vehicle ID
      licensePlate: formState.licensePlate,
      chassisNumber: formState.chassisNumber,
      storeId: formState.storeId,
      assignedEmployeeID: formState.assignedEmployeeId,
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
      console.log("Sending order data:", orderData);
      console.log("Order details:", orderData.orderDetails);
      await createOrderMutation.mutateAsync(orderData);
      navigate("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      console.error("Error response:", error.response?.data);
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

  console.log("Form data loaded:", formData);
  console.log("Vehicle brands:", formData?.vehicleBrands);
  console.log("Vehicle models:", formData?.vehicleModels);
  console.log("Decal services:", formData?.decalServices);
  console.log("Decal types:", formData?.decalTypes);

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
                  <option key={brand.brandID} value={brand.brandID}>
                    {brand.brandName}
                  </option>
                ))}
              </Select>
              {!formData?.vehicleBrands && (
                <p className="text-red-500 text-sm">Không có dữ liệu hãng xe</p>
              )}
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
                      model.brandID === formState.vehicleBrand
                  )
                  ?.map((model) => (
                    <option key={model.modelID} value={model.modelID}>
                      {model.modelName}
                    </option>
                  ))}
              </Select>
              {!formData?.vehicleModels && (
                <p className="text-red-500 text-sm">Không có dữ liệu dòng xe</p>
              )}
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
                    key={service.serviceID}
                    className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formState.decalServices.includes(
                        service.serviceID
                      )}
                      onChange={(e) =>
                        handleServiceChange(service.serviceID, e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{service.serviceName}</span>
                  </label>
                ))}
              </div>
              {!formData?.decalServices && (
                <p className="text-red-500 text-sm">Không có dữ liệu dịch vụ decal</p>
              )}
            </div>

            {/* Decal Types */}
            <div>
              <h3 className="text-lg font-medium mb-3">Loại decal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {formData?.decalTypes?.map((type) => (
                  <label
                    key={type.decalTypeID}
                    className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formState.decalTypes.includes(type.decalTypeID)}
                      onChange={(e) =>
                        handleTypeChange(type.decalTypeID, e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{type.decalTypeName}</span>
                  </label>
                ))}
              </div>
              {!formData?.decalTypes && (
                <p className="text-red-500 text-sm">Không có dữ liệu loại decal</p>
              )}
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
                  <option key={store.storeID} value={store.storeID}>
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
                  <option key={employee.employeeID} value={employee.employeeID}>
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
