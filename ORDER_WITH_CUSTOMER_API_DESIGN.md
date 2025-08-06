# Thiết Kế API: Tạo Đơn Hàng Với Khách Hàng

## Tổng Quan

Hệ thống API được thiết kế để xử lý việc tạo đơn hàng với khả năng liên kết khách hàng đã có hoặc tạo khách hàng mới trong một transaction duy nhất.

## Các DTO Đã Tạo

### 1. CreateOrderWithCustomerDto
```csharp
public class CreateOrderWithCustomerDto
{
    // === ORDER INFORMATION ===
    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Tổng tiền phải lớn hơn 0")]
    public decimal TotalAmount { get; set; }

    public string? AssignedEmployeeID { get; set; }
    public string? VehicleID { get; set; }
    public DateTime? ExpectedArrivalTime { get; set; }
    public string? Priority { get; set; } = "Medium";
    public bool IsCustomDecal { get; set; } = false;
    public string? Description { get; set; }

    // === CUSTOMER INFORMATION ===
    // Trường hợp 1: Sử dụng khách hàng đã có
    public string? ExistingCustomerID { get; set; }

    // Trường hợp 2: Tạo khách hàng mới
    public CreateCustomerWithAccountDto? NewCustomerPayload { get; set; }
}
```

### 2. CreateCustomerWithAccountDto
```csharp
public class CreateCustomerWithAccountDto
{
    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"^[0-9]{10,11}$", ErrorMessage = "Số điện thoại không hợp lệ")]
    public string PhoneNumber { get; set; } = string.Empty;

    [MaxLength(100)]
    [EmailAddress(ErrorMessage = "Email không hợp lệ")]
    public string? Email { get; set; }

    [MaxLength(255)]
    public string? Address { get; set; }

    // === ACCOUNT CREATION OPTION ===
    public bool CreateAccount { get; set; } = false;
}
```

### 3. OrderWithCustomerResponseDto
```csharp
public class OrderWithCustomerResponseDto
{
    // === ORDER INFORMATION ===
    public string OrderID { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; }
    public string OrderStatus { get; set; } = string.Empty;
    public string CurrentStage { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public string? AssignedEmployeeID { get; set; }
    public string? AssignedEmployeeFullName { get; set; }
    public string? VehicleID { get; set; }
    public string? VehicleModelName { get; set; }
    public string? VehicleBrandName { get; set; }
    public string? ChassisNumber { get; set; }
    public DateTime? ExpectedArrivalTime { get; set; }
    public string Priority { get; set; } = string.Empty;
    public bool IsCustomDecal { get; set; }
    public string? Description { get; set; }

    // === CUSTOMER INFORMATION ===
    public string CustomerID { get; set; } = string.Empty;
    public string CustomerFullName { get; set; } = string.Empty;
    public string CustomerPhoneNumber { get; set; } = string.Empty;
    public string? CustomerEmail { get; set; }
    public string? CustomerAddress { get; set; }

    // === ACCOUNT INFORMATION (nếu được tạo) ===
    public string? AccountID { get; set; }
    public string? AccountUsername { get; set; }
    public bool AccountCreated { get; set; } = false;
    public string? GeneratedPassword { get; set; } // Chỉ trả về nếu tạo tài khoản mới

    // === SUCCESS MESSAGE ===
    public string Message { get; set; } = string.Empty;
}
```

## API Endpoints

### 1. POST /api/orders/with-customer
**Mô tả**: Tạo đơn hàng với khả năng liên kết hoặc tạo khách hàng mới

**Request Body Examples**:

#### Trường hợp 1: Chọn khách hàng cũ
```json
{
  "totalAmount": 1500000,
  "assignedEmployeeID": "EMP001",
  "vehicleID": "VEH001",
  "expectedArrivalTime": "2025-01-15T10:00:00Z",
  "priority": "High",
  "isCustomDecal": true,
  "description": "Decal tùy chỉnh theo yêu cầu",
  "existingCustomerID": "CUS001"
}
```

#### Trường hợp 2: Tạo khách hàng mới (không tạo tài khoản)
```json
{
  "totalAmount": 1200000,
  "assignedEmployeeID": "EMP002",
  "vehicleID": "VEH002",
  "priority": "Medium",
  "isCustomDecal": false,
  "description": "Decal thường",
  "newCustomerPayload": {
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "phoneNumber": "0909123456",
    "email": "nguyenvana@email.com",
    "address": "123 Đường ABC, Quận 1, TP.HCM",
    "createAccount": false
  }
}
```

#### Trường hợp 3: Tạo khách hàng mới với tài khoản
```json
{
  "totalAmount": 2000000,
  "assignedEmployeeID": "EMP003",
  "vehicleID": "VEH003",
  "priority": "High",
  "isCustomDecal": true,
  "description": "Decal cao cấp",
  "newCustomerPayload": {
    "firstName": "Trần",
    "lastName": "Thị B",
    "phoneNumber": "0912345678",
    "email": "tranthib@email.com",
    "address": "456 Đường XYZ, Quận 2, TP.HCM",
    "createAccount": true
  }
}
```

**Response Example**:
```json
{
  "orderID": "ORD001",
  "orderDate": "2025-01-10T08:30:00Z",
  "orderStatus": "New",
  "currentStage": "New Profile",
  "totalAmount": 1500000,
  "assignedEmployeeID": "EMP001",
  "assignedEmployeeFullName": "Nguyễn Văn Nhân Viên",
  "vehicleID": "VEH001",
  "vehicleModelName": "Honda Wave Alpha 110",
  "vehicleBrandName": "Honda",
  "chassisNumber": "VNKJF19E2NA123456",
  "expectedArrivalTime": "2025-01-15T10:00:00Z",
  "priority": "High",
  "isCustomDecal": true,
  "description": "Decal tùy chỉnh theo yêu cầu",
  "customerID": "CUS001",
  "customerFullName": "Nguyễn Văn A",
  "customerPhoneNumber": "0909123456",
  "customerEmail": "nguyenvana@email.com",
  "customerAddress": "123 Đường ABC, Quận 1, TP.HCM",
  "accountID": "ACC001",
  "accountUsername": "nguyenvana",
  "accountCreated": true,
  "generatedPassword": "Kj8#mN2$pQ9",
  "message": "Đã tạo đơn hàng và tài khoản thành công"
}
```

### 2. GET /api/orders/search-customers?searchTerm=0909123456
**Mô tả**: Tìm kiếm khách hàng theo số điện thoại hoặc email

**Response Example**:
```json
[
  {
    "customerID": "CUS001",
    "firstName": "Nguyễn",
    "lastName": "Văn A",
    "phoneNumber": "0909123456",
    "email": "nguyenvana@email.com",
    "address": "123 Đường ABC, Quận 1, TP.HCM",
    "accountID": "ACC001",
    "accountUsername": "nguyenvana"
  }
]
```

### 3. POST /api/orders/customers
**Mô tả**: Tạo khách hàng mới với tùy chọn tạo tài khoản

**Request Body**:
```json
{
  "firstName": "Lê",
  "lastName": "Văn C",
  "phoneNumber": "0923456789",
  "email": "levanc@email.com",
  "address": "789 Đường DEF, Quận 3, TP.HCM",
  "createAccount": true
}
```

## Logic Xử Lý Backend

### Database Transaction
```csharp
using var transaction = await _context.Database.BeginTransactionAsync();
try
{
    // === BƯỚC 1: XỬ LÝ KHÁCH HÀNG ===
    if (!string.IsNullOrEmpty(createDto.ExistingCustomerID))
    {
        // Sử dụng khách hàng đã có
        customer = await _context.Customers
            .Include(c => c.Account)
            .FirstOrDefaultAsync(c => c.CustomerID == createDto.ExistingCustomerID);
    }
    else
    {
        // Tạo khách hàng mới
        customer = _mapper.Map<Customer>(createDto.NewCustomerPayload);
        
        // Kiểm tra trùng lặp
        var existingCustomer = await _context.Customers
            .FirstOrDefaultAsync(c => c.PhoneNumber == customer.PhoneNumber);
        
        if (existingCustomer != null)
        {
            throw new ArgumentException($"Số điện thoại {customer.PhoneNumber} đã được sử dụng");
        }

        // === BƯỚC 2: TẠO TÀI KHOẢN (NẾU CẦN) ===
        if (createDto.NewCustomerPayload!.CreateAccount)
        {
            (createdAccount, generatedPassword) = await CreateAccountForCustomerAsync(customer);
            customer.AccountID = createdAccount.AccountID;
        }

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
    }

    // === BƯỚC 3: TẠO ĐƠN HÀNG ===
    var order = new Order
    {
        CustomerID = customer.CustomerID,
        TotalAmount = createDto.TotalAmount,
        AssignedEmployeeID = createDto.AssignedEmployeeID,
        VehicleID = createDto.VehicleID,
        ExpectedArrivalTime = createDto.ExpectedArrivalTime,
        Priority = createDto.Priority ?? "Medium",
        IsCustomDecal = createDto.IsCustomDecal,
        Description = createDto.Description,
        OrderStatus = "New",
        CurrentStage = "New Profile",
        OrderDate = DateTime.UtcNow
    };

    _context.Orders.Add(order);
    await _context.SaveChangesAsync();

    // === BƯỚC 4: COMMIT TRANSACTION ===
    await transaction.CommitAsync();

    // === BƯỚC 5: GỬI EMAIL (NẾU TẠO TÀI KHOẢN) ===
    if (createdAccount != null && !string.IsNullOrEmpty(generatedPassword))
    {
        await SendWelcomeEmailAsync(customer, createdAccount, generatedPassword);
    }

    return response;
}
catch (Exception ex)
{
    // Rollback transaction nếu có lỗi
    await transaction.RollbackAsync();
    throw;
}
```

### Tạo Tài Khoản
```csharp
private async Task<(Account account, string password)> CreateAccountForCustomerAsync(Customer customer)
{
    // Lấy role CUSTOMER
    var customerRole = await _context.Roles
        .FirstOrDefaultAsync(r => r.RoleName == "Customer");

    if (customerRole == null)
    {
        throw new InvalidOperationException("Không tìm thấy role Customer");
    }

    // Tạo username từ email
    var username = customer.Email?.Split('@')[0] ?? customer.PhoneNumber;

    // Tạo mật khẩu ngẫu nhiên
    var password = GenerateSecurePassword();

    // Hash mật khẩu bằng BCrypt
    var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

    var account = new Account
    {
        Username = username,
        Email = customer.Email,
        PasswordHash = passwordHash,
        RoleID = customerRole.RoleID,
        IsActive = true
    };

    _context.Accounts.Add(account);
    await _context.SaveChangesAsync();

    return (account, password);
}
```

## Tầm Quan Trọng Của Database Transaction

### 1. **Tính Toàn Vẹn Dữ Liệu (Data Integrity)**
- Đảm bảo tất cả các bước (tạo khách hàng, tạo tài khoản, tạo đơn hàng) hoặc thành công hoặc thất bại hoàn toàn
- Tránh tình trạng dữ liệu không nhất quán (inconsistent state)

### 2. **Rollback Tự Động**
- Nếu bất kỳ bước nào thất bại, toàn bộ transaction sẽ được rollback
- Không có dữ liệu "nửa vời" trong database

### 3. **Concurrent Access**
- Đảm bảo tính nhất quán khi nhiều request cùng thực hiện
- Tránh race condition khi tạo khách hàng mới

## Tầm Quan Trọng Của Hashing Mật Khẩu

### 1. **Bảo Mật**
- Mật khẩu không bao giờ được lưu trữ dưới dạng plain text
- Sử dụng BCrypt với salt tự động để tăng độ bảo mật

### 2. **Tuân Thủ Quy Định**
- Đáp ứng các yêu cầu bảo mật của GDPR, PCI DSS
- Bảo vệ thông tin cá nhân của khách hàng

### 3. **Chống Tấn Công**
- Chống brute force attack
- Chống rainbow table attack

## Các File Đã Tạo/Cập Nhật

### DTOs
- `DTOs/CreateOrderWithCustomerDto.cs` (mới)
- `DTOs/OrderWithCustomerResponseDto.cs` (mới)

### Services
- `Services/Interfaces/IOrderWithCustomerService.cs` (mới)
- `Services/Implementations/OrderWithCustomerService.cs` (mới)

### Controllers
- `Controllers/OrdersController.cs` (cập nhật)

### Program.cs
- Đăng ký `IOrderWithCustomerService`

## Tính Năng Đã Hoàn Thành

### ✅ **Database Transaction**
- Sử dụng Entity Framework transaction
- Rollback tự động khi có lỗi
- Commit chỉ khi tất cả thành công

### ✅ **Customer Management**
- Tìm kiếm khách hàng theo SĐT/Email
- Tạo khách hàng mới với validation
- Kiểm tra trùng lặp số điện thoại và email

### ✅ **Account Creation**
- Tạo tài khoản tự động với username từ email
- Generate mật khẩu ngẫu nhiên an toàn
- Hash mật khẩu bằng BCrypt
- Gán role Customer mặc định

### ✅ **Order Creation**
- Tạo đơn hàng với thông tin đầy đủ
- Liên kết với khách hàng (cũ hoặc mới)
- Validation vehicle và employee

### ✅ **Email Service**
- Gửi email chào mừng với mật khẩu
- Async processing không ảnh hưởng đến response
- Error handling cho email service

### ✅ **Error Handling**
- Validation input data
- Custom exception messages
- Proper HTTP status codes
- Logging chi tiết

## Bước Tiếp Theo

1. **Implement Email Service**: Tích hợp với SendGrid hoặc SMTP
2. **Add Unit Tests**: Test cho tất cả các scenarios
3. **Add Integration Tests**: Test end-to-end flow
4. **Performance Optimization**: Add caching cho customer search
5. **Security Enhancement**: Add rate limiting, input sanitization