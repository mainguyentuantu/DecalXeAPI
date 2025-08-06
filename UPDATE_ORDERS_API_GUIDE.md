# 🔧 Hướng Dẫn Cập Nhật API Orders với Customer Information

## 🚨 Vấn Đề Hiện Tại

API `GET /api/Orders` hiện tại chỉ trả về thông tin cơ bản của đơn hàng, thiếu thông tin khách hàng:

**Response hiện tại:**
```json
{
  "orderID": "string",
  "orderDate": "2025-08-06T06:54:08.087Z",
  "totalAmount": 0,
  "orderStatus": "string",
  "assignedEmployeeID": "string",
  "assignedEmployeeFullName": "string",
  "vehicleID": "string",
  "chassisNumber": "string",
  "vehicleModelName": "string",
  "vehicleBrandName": "string",
  "expectedArrivalTime": "2025-08-06T06:54:08.087Z",
  "currentStage": "string",
  "priority": "string",
  "isCustomDecal": true
}
```

**Response mong muốn:**
```json
{
  "orderID": "string",
  "orderDate": "2025-08-06T06:54:08.087Z",
  "totalAmount": 0,
  "orderStatus": "string",
  "assignedEmployeeID": "string",
  "assignedEmployeeFullName": "string",
  "vehicleID": "string",
  "vehicleModelName": "string",
  "vehicleBrandName": "string",
  "chassisNumber": "string",
  "expectedArrivalTime": "2025-08-06T06:54:08.087Z",
  "priority": "string",
  "isCustomDecal": true,
  "description": "string",
  "customerID": "string",
  "customerFullName": "string",
  "customerPhoneNumber": "string",
  "customerEmail": "string",
  "customerAddress": "string",
  "accountID": "string",
  "accountUsername": "string",
  "accountCreated": true
}
```

## ✅ Giải Pháp Đã Thực Hiện

### 1. Cập Nhật OrderDto

**File: `DTOs/OrderDto.cs`**
```csharp
public class OrderDto
{
    // === ORDER INFORMATION ===
    public string OrderID { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string OrderStatus { get; set; } = string.Empty;
    public string? AssignedEmployeeID { get; set; }
    public string? AssignedEmployeeFullName { get; set; }
    public string? VehicleID { get; set; }
    public string? ChassisNumber { get; set; } = string.Empty;
    public string? VehicleModelName { get; set; } = string.Empty;
    public string? VehicleBrandName { get; set; } = string.Empty;
    public DateTime? ExpectedArrivalTime { get; set; }
    public string CurrentStage { get; set; } = string.Empty;
    public string? Priority { get; set; }
    public bool IsCustomDecal { get; set; }
    public string? Description { get; set; }

    // === CUSTOMER INFORMATION ===
    public string? CustomerID { get; set; }
    public string? CustomerFullName { get; set; }
    public string? CustomerPhoneNumber { get; set; }
    public string? CustomerEmail { get; set; }
    public string? CustomerAddress { get; set; }

    // === ACCOUNT INFORMATION (nếu có) ===
    public string? AccountID { get; set; }
    public string? AccountUsername { get; set; }
    public bool? AccountCreated { get; set; }
}
```

### 2. Cập Nhật AutoMapper Configuration

**File: `MappingProfiles/MainMappingProfile.cs`**
```csharp
// UPDATED: Order mapping with Customer relationship
CreateMap<Order, OrderDto>()
    .ForMember(dest => dest.AssignedEmployeeFullName, opt => opt.MapFrom(src => src.AssignedEmployee != null ? src.AssignedEmployee.FirstName + " " + src.AssignedEmployee.LastName : null))
    .ForMember(dest => dest.ChassisNumber, opt => opt.MapFrom(src => src.CustomerVehicle != null ? src.CustomerVehicle.ChassisNumber : null))
    .ForMember(dest => dest.VehicleModelName, opt => opt.MapFrom(src => src.CustomerVehicle != null && src.CustomerVehicle.VehicleModel != null ? src.CustomerVehicle.VehicleModel.ModelName : null))
    .ForMember(dest => dest.VehicleBrandName, opt => opt.MapFrom(src => src.CustomerVehicle != null && src.CustomerVehicle.VehicleModel != null && src.CustomerVehicle.VehicleModel.VehicleBrand != null ? src.CustomerVehicle.VehicleModel.VehicleBrand.BrandName : null))
    .ForMember(dest => dest.IsCustomDecal, opt => opt.MapFrom(src => src.IsCustomDecal))
    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
    // Customer information mapping
    .ForMember(dest => dest.CustomerID, opt => opt.MapFrom(src => src.Customer != null ? src.Customer.CustomerID : null))
    .ForMember(dest => dest.CustomerFullName, opt => opt.MapFrom(src => src.Customer != null ? src.Customer.FirstName + " " + src.Customer.LastName : null))
    .ForMember(dest => dest.CustomerPhoneNumber, opt => opt.MapFrom(src => src.Customer != null ? src.Customer.PhoneNumber : null))
    .ForMember(dest => dest.CustomerEmail, opt => opt.MapFrom(src => src.Customer != null ? src.Customer.Email : null))
    .ForMember(dest => dest.CustomerAddress, opt => opt.MapFrom(src => src.Customer != null ? src.Customer.Address : null))
    // Account information mapping
    .ForMember(dest => dest.AccountID, opt => opt.MapFrom(src => src.Customer != null && src.Customer.Account != null ? src.Customer.Account.AccountID : null))
    .ForMember(dest => dest.AccountUsername, opt => opt.MapFrom(src => src.Customer != null && src.Customer.Account != null ? src.Customer.Account.Username : null))
    .ForMember(dest => dest.AccountCreated, opt => opt.MapFrom(src => src.Customer != null && src.Customer.Account != null));
```

### 3. Cập Nhật OrderService

**File: `Services/Implementations/OrderService.cs`**

#### A. Cập Nhật GetOrdersAsync
```csharp
var query = _context.Orders
    .Include(o => o.AssignedEmployee)
    .Include(o => o.Customer) // NEW: Include Customer information
        .ThenInclude(c => c.Account) // NEW: Include Customer's Account
    .Include(o => o.CustomerVehicle)
        .ThenInclude(cv => cv.VehicleModel) 
        .ThenInclude(vm => vm.VehicleBrand) 
    .AsQueryable();
```

#### B. Cập Nhật Search Logic
```csharp
query = query.Where(o =>
    (o.AssignedEmployee != null && (o.AssignedEmployee.FirstName + " " + o.AssignedEmployee.LastName).ToLower().Contains(searchTermLower)) ||
    (o.CustomerVehicle != null && o.CustomerVehicle.ChassisNumber.ToLower().Contains(searchTermLower)) ||
    (o.Customer != null && (o.Customer.FirstName + " " + o.Customer.LastName).ToLower().Contains(searchTermLower)) ||
    (o.Customer != null && o.Customer.PhoneNumber.ToLower().Contains(searchTermLower))
);
```

#### C. Cập Nhật GetOrderByIdAsync
```csharp
var order = await _context.Orders
    .Include(o => o.AssignedEmployee)
    .Include(o => o.Customer) // NEW: Include Customer information
        .ThenInclude(c => c.Account) // NEW: Include Customer's Account
    .Include(o => o.CustomerVehicle)
        .ThenInclude(cv => cv.VehicleModel)
        .ThenInclude(vm => vm.VehicleBrand)
    .FirstOrDefaultAsync(o => o.OrderID == id);
```

#### D. Cập Nhật CreateOrderAsync
```csharp
// Load Customer's Account if exists
if (order.Customer != null)
{
    await _context.Entry(order.Customer).Reference(c => c.Account).LoadAsync();
}
```

## 🚀 Các Bước Deploy

### Bước 1: Build và Test Locally
```bash
dotnet build
dotnet run
```

### Bước 2: Deploy to Railway
```bash
git add .
git commit -m "Update Orders API to include customer information"
git push railway main
```

### Bước 3: Verify Deployment
```bash
# Test GET /api/Orders
curl -X GET "https://decalxeapi-production.up.railway.app/api/Orders?page=1&pageSize=5"

# Test search by customer name
curl -X GET "https://decalxeapi-production.up.railway.app/api/Orders?searchTerm=Nguyễn&page=1&pageSize=5"
```

## 📋 Checklist Sau Deploy

- [ ] Build thành công không có lỗi
- [ ] GET /api/Orders trả về customer information
- [ ] Search orders by customer name hoạt động
- [ ] GET /api/Orders/{id} trả về customer information
- [ ] Frontend hiển thị thông tin khách hàng trong danh sách đơn hàng

## 🎯 Kết Quả Mong Đợi

Sau khi deploy thành công:

1. **GET /api/Orders** sẽ trả về thông tin đầy đủ bao gồm:
   - Thông tin đơn hàng cơ bản
   - Thông tin khách hàng (CustomerID, CustomerFullName, CustomerPhoneNumber, etc.)
   - Thông tin tài khoản (nếu có)

2. **Search functionality** sẽ hỗ trợ tìm kiếm theo:
   - Tên khách hàng
   - Số điện thoại khách hàng
   - Tên nhân viên
   - Số khung xe

3. **Frontend** sẽ hiển thị thông tin khách hàng trong danh sách đơn hàng

## 🔄 Rollback Plan

Nếu deploy gặp vấn đề:
1. Revert commit cuối cùng
2. Deploy lại version trước đó
3. Frontend sẽ hoạt động với thông tin cơ bản

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Railway logs
2. Verify AutoMapper configuration
3. Test API endpoints bằng curl
4. Restart application nếu cần