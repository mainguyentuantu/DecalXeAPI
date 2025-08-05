# Tích hợp Giao diện Tạo Đơn hàng Mới

## Tổng quan

Giao diện "Tạo đơn hàng mới" đã được cập nhật để phù hợp với backend API format mới theo `CreateOrderDto`.

## Thay đổi chính

### 1. Backend API Format Mới

```json
{
  "totalAmount": 0,
  "assignedEmployeeID": "string",
  "vehicleID": "string",
  "expectedArrivalTime": "2025-08-04T15:35:43.417Z",
  "priority": "string",
  "isCustomDecal": true,
  "description": "string"
}
```

### 2. Workflow Mới (3 bước)

1. **Tạo Khách hàng** → Nhận `customerID`
2. **Tạo Xe** → Nhận `vehicleID` 
3. **Tạo Đơn hàng** → Sử dụng `vehicleID`

### 3. Services Mới

- `customerVehicles.js` - Quản lý xe khách hàng
- `useCustomers.js` - React Query hooks cho khách hàng
- `useCustomerVehicles.js` - React Query hooks cho xe

## Cấu trúc Form

### Thông tin Khách hàng (Bước 1)
- Họ * (firstName)
- Tên * (lastName) 
- Số điện thoại * (phoneNumber)
- Email (email)
- Địa chỉ (address)

### Thông tin Xe (Bước 2)
- Hãng xe (vehicleBrandId)
- Dòng xe * (modelId)
- Biển số xe (licensePlate)
- Số khung * (chassisNumber)
- Màu xe (color)
- Năm sản xuất (year)
- Số km ban đầu (initialKM)

### Chi tiết Đơn hàng (Bước 3)
- Tổng tiền * (totalAmount)
- Nhân viên phụ trách (assignedEmployeeID)
- Thời gian dự kiến (expectedArrivalTime)
- Độ ưu tiên (priority)
- Decal tùy chỉnh (isCustomDecal)
- Mô tả (description)

## Validation

### Bắt buộc
- Họ tên khách hàng
- Số điện thoại
- Số khung xe
- Dòng xe
- Tổng tiền > 0

### Tùy chọn
- Email, địa chỉ khách hàng
- Biển số, màu xe, năm SX, km ban đầu
- Nhân viên, thời gian, mô tả

## UX Improvements

### 1. Progress Indicator
- Hiển thị bước hiện tại (1/3, 2/3, 3/3)
- Loading state cho từng bước

### 2. Form Enhancements
- Disable fields khi đang submit
- Auto-reset vehicle model khi đổi brand
- Better error messages
- Placeholder examples

### 3. Visual Indicators
- Numbered steps với badges
- Loading spinners
- Toast notifications

## Demo

Truy cập `/demo/order-create` để xem demo giao diện với mock data.

## API Endpoints

### Customers
- `POST /api/Customers` - Tạo khách hàng mới
- `GET /api/Customers` - Lấy danh sách khách hàng

### Customer Vehicles  
- `POST /api/CustomerVehicles` - Tạo xe mới
- `GET /api/CustomerVehicles` - Lấy danh sách xe

### Orders
- `POST /api/Orders` - Tạo đơn hàng mới
- `GET /api/Orders/create` - Lấy form data

## Error Handling

### Validation Errors
- Client-side validation trước khi submit
- Server-side error messages từ API
- Step-specific error reporting

### Network Errors
- Retry mechanism với React Query
- User-friendly error messages
- Graceful fallback states

## Testing

### Manual Testing
1. Truy cập `/orders/create`
2. Điền thông tin form
3. Submit và kiểm tra network calls
4. Verify data trong database

### Demo Testing
1. Truy cập `/demo/order-create`
2. Test với mock data
3. Xem API format preview
4. Test loading states

## Deployment Notes

### Environment Variables
- `API_BASE_URL` - URL của backend API
- Database connection cho backend

### Dependencies
- React Query cho state management
- React Hook Form validation
- Tailwind CSS cho styling

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Kiểm tra `API_BASE_URL` trong `constants/api.js`
   - Verify backend đang chạy

2. **Form Data Not Loading**
   - Kiểm tra `/api/Orders/create` endpoint
   - Verify authentication token

3. **Validation Errors**
   - Kiểm tra required fields
   - Verify data types (number, string)

### Debug Tips
- Mở DevTools Network tab
- Kiểm tra console errors
- Verify API responses
- Test với demo page trước

## Next Steps

1. **Backend Integration**
   - Deploy backend API
   - Test với real database
   - Configure CORS properly

2. **Additional Features**
   - Auto-save draft orders
   - File upload cho decal designs
   - Order templates

3. **Performance**
   - Implement caching
   - Optimize form rendering
   - Add progressive loading