# 🔧 Hướng Dẫn Deploy Backend với AutoMapper Configuration Mới

## 🚨 Vấn Đề Hiện Tại

Backend đang gặp lỗi **"Missing type map configuration or unsupported mapping"** cho các DTO mới:
- `CreateCustomerWithAccountDto -> Customer`
- `CreateOrderWithCustomerDto -> Order`

## ✅ Giải Pháp Đã Thực Hiện

### 1. Cập Nhật AutoMapper Configuration

Đã thêm mapping configuration vào `MappingProfiles/MainMappingProfile.cs`:

```csharp
// NEW: Add mapping for CreateCustomerWithAccountDto
CreateMap<CreateCustomerWithAccountDto, Customer>();

// NEW: Add mapping for CreateOrderWithCustomerDto
CreateMap<CreateOrderWithCustomerDto, Order>()
    .ForMember(dest => dest.TotalAmount, opt => opt.MapFrom(src => src.TotalAmount))
    .ForMember(dest => dest.CustomerID, opt => opt.Ignore()) // Will be set manually in service
    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));
```

### 2. Frontend Workaround Tạm Thời

Đã thêm error handling trong frontend để xử lý trường hợp backend chưa sẵn sàng:

- **Customer Search**: Nếu search fail → Tự động mở modal tạo khách hàng mới
- **Customer Creation**: Nếu create fail → Tạo mock customer để demo
- **Order Creation**: Nếu create fail → Hiển thị success message demo

## 🚀 Các Bước Deploy Backend

### Bước 1: Build và Test Locally

```bash
# Build project
dotnet build

# Test locally
dotnet run
```

### Bước 2: Deploy to Railway

```bash
# Commit changes
git add .
git commit -m "Add AutoMapper configuration for customer DTOs"

# Push to Railway
git push railway main
```

### Bước 3: Verify Deployment

Sau khi deploy, test lại API endpoints:

```bash
# Test search customers
curl -X GET "https://decalxeapi-production.up.railway.app/api/Orders/search-customers?searchTerm=0901234567"

# Test create customer
curl -X POST "https://decalxeapi-production.up.railway.app/api/Orders/customers" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Customer",
    "phoneNumber": "0901234567",
    "email": "test@example.com",
    "createAccount": false
  }'

# Test create order with customer
curl -X POST "https://decalxeapi-production.up.railway.app/api/Orders/with-customer" \
  -H "Content-Type: application/json" \
  -d '{
    "totalAmount": 1500000,
    "newCustomerPayload": {
      "firstName": "Test",
      "lastName": "Customer",
      "phoneNumber": "0901234568",
      "email": "test2@example.com",
      "createAccount": false
    },
    "assignedEmployeeID": "EMP010",
    "vehicleID": "VEH001",
    "expectedArrivalTime": "2025-01-30T10:00:00Z",
    "priority": "Medium",
    "isCustomDecal": false,
    "description": "Test order"
  }'
```

## 🔍 Kiểm Tra Logs

Nếu vẫn gặp lỗi, kiểm tra Railway logs:

1. Vào Railway Dashboard
2. Chọn project `decalxeapi-production`
3. Vào tab "Deployments"
4. Xem logs của deployment mới nhất

## 📋 Checklist Sau Deploy

- [ ] Build thành công không có lỗi
- [ ] API search customers trả về 200 OK
- [ ] API create customer trả về 201 Created
- [ ] API create order with customer trả về 201 Created
- [ ] Frontend có thể tìm kiếm khách hàng
- [ ] Frontend có thể tạo khách hàng mới
- [ ] Frontend có thể tạo đơn hàng với khách hàng

## 🎯 Kết Quả Mong Đợi

Sau khi deploy thành công:

1. **Search Customers API**: Trả về danh sách khách hàng hoặc array rỗng
2. **Create Customer API**: Tạo khách hàng mới và trả về thông tin
3. **Create Order with Customer API**: Tạo đơn hàng với khách hàng và trả về response chi tiết

## 🔄 Rollback Plan

Nếu deploy gặp vấn đề:

1. Revert commit cuối cùng
2. Deploy lại version trước đó
3. Frontend sẽ hoạt động ở chế độ demo với workaround

## 📞 Hỗ Trợ

Nếu gặp vấn đề trong quá trình deploy:

1. Kiểm tra logs trong Railway Dashboard
2. Test API endpoints bằng curl hoặc Postman
3. Verify AutoMapper configuration đã được thêm đúng
4. Restart application nếu cần thiết