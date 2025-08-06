# Giải Pháp: Sửa Lỗi VehicleID trong Order Creation

## Vấn Đề
Khi submit order, frontend gửi `vehicleID` là display string thay vì ID thực sự:
```javascript
// Sai - gửi display string
vehicleID: "59H1-234.56 - Honda Honda Wave Alpha 110"

// Đúng - phải gửi ID thực sự
vehicleID: "44c4a3df-0b76-4288-bccd-077387126c9e"
```

## Nguyên Nhân
1. **VehicleSearchInput component** không sync đúng với `value` prop
2. Component sử dụng `searchTerm` state nội bộ thay vì `value` prop
3. Khi user chọn vehicle, component set display string vào `searchTerm` nhưng không sync với form state

## Giải Pháp Đã Thực Hiện

### 1. Cập Nhật VehicleSearchInput Component

#### Thêm useEffect để sync với value prop:
```javascript
// Sync searchTerm with value prop when value changes
useEffect(() => {
  if (value && selectedVehicle) {
    setSearchTerm(`${selectedVehicle.licensePlate || selectedVehicle.chassisNumber} - ${selectedVehicle.vehicleBrandName} ${selectedVehicle.vehicleModelName}`);
  } else if (!value) {
    setSearchTerm('');
    setSelectedVehicle(null);
  }
}, [value, selectedVehicle]);

// Find and set selectedVehicle when value changes
useEffect(() => {
  if (value && vehicles.length > 0) {
    const vehicle = vehicles.find(v => v.vehicleID === value);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setSearchTerm(`${vehicle.licensePlate || vehicle.chassisNumber} - ${vehicle.vehicleBrandName} ${vehicle.vehicleModelName}`);
    }
  }
}, [value, vehicles]);
```

#### Sửa handleInputChange:
```javascript
// Handle input change
const handleInputChange = (e) => {
  const newValue = e.target.value;
  setSearchTerm(newValue);
  setIsOpen(true);
  
  // Don't call onChange here as it should only be called when a vehicle is selected
  // onChange should only receive vehicleID, not search term
};
```

### 2. Thêm Debug Logging

#### Trong OrderCreatePage:
```javascript
// Handle vehicle selection
const handleVehicleSelect = (vehicle) => {
  console.log('Vehicle selected:', vehicle);
  console.log('Vehicle ID:', vehicle?.vehicleID);
  setSelectedVehicle(vehicle);
  handleInputChange("vehicleID", vehicle?.vehicleID || "");
};

// Handle form submission
const handleSubmit = async (e) => {
  // ...
  console.log('Form state before submit:', formState);
  const orderData = {
    // ...
  };
  console.log('Order data to submit:', orderData);
  // ...
};
```

#### Trong VehicleSearchInput:
```javascript
// Handle vehicle selection
const handleVehicleSelect = (vehicle) => {
  console.log('VehicleSearchInput - Vehicle selected:', vehicle);
  console.log('VehicleSearchInput - Vehicle ID:', vehicle.vehicleID);
  // ...
  if (onChange) {
    console.log('VehicleSearchInput - Calling onChange with vehicleID:', vehicle.vehicleID);
    onChange(vehicle.vehicleID);
  }
};
```

## Kết Quả Test

### ✅ API Test
- Order submit với `vehicleID` đúng: **Thành công**
- Response: `201 Created` với order data đầy đủ

### ✅ Vehicle Data
- Vehicle với license plate "59H1-234.56" có ID: `44c4a3df-0b76-4288-bccd-077387126c9e`
- Frontend sẽ gửi đúng ID này thay vì display string

## Các File Đã Thay Đổi

### Frontend
- `cors-test-react/src/components/ui/VehicleSearchInput.jsx`
- `cors-test-react/src/pages/orders/OrderCreatePage.jsx`

## Cấu Trúc Dữ Liệu

### Vehicle Object
```json
{
  "vehicleID": "44c4a3df-0b76-4288-bccd-077387126c9e",
  "chassisNumber": "VNKJF19E2NA123456",
  "licensePlate": "59H1-234.56",
  "vehicleModelName": "Honda Wave Alpha 110",
  "vehicleBrandName": "Honda",
  "customerFullName": "Văn Nguyễn"
}
```

### Order Data (Đúng)
```json
{
  "totalAmount": 123456,
  "assignedEmployeeID": "EMP010",
  "vehicleID": "44c4a3df-0b76-4288-bccd-077387126c9e",
  "expectedArrivalTime": "2025-08-08T03:02:00.000Z",
  "priority": "Low",
  "isCustomDecal": true,
  "description": "ádasds"
}
```

## Bước Tiếp Theo

1. **Test Frontend**: Kiểm tra xem frontend có gửi đúng `vehicleID` không
2. **Remove Debug Logs**: Xóa các console.log sau khi test xong
3. **Test End-to-End**: Test toàn bộ flow từ chọn vehicle đến submit order

## Lưu Ý

- VehicleSearchInput giờ sẽ sync đúng với form state
- Khi user chọn vehicle, `vehicleID` thực sự sẽ được set vào form
- Display string chỉ dùng để hiển thị, không dùng để submit