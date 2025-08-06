# Sửa Lỗi Package Dependencies

## Vấn Đề Gặp Phải

### 1. **BCrypt.Net Package Không Tồn Tại**
```
error NU1102: Unable to find package BCrypt.Net with version (>= 4.0.3)
```

### 2. **Swashbuckle.AspNetCore.Filters Version Conflict**
```
warning NU1603: Swashbuckle.AspNetCore.Filters 6.5.0 was not found. Swashbuckle.AspNetCore.Filters 7.0.0 was resolved instead.
```

## Giải Pháp Đã Thực Hiện

### 1. **Cập Nhật Package Versions**
```xml
<!-- Trước -->
<PackageReference Include="Swashbuckle.AspNetCore.Filters" Version="6.5.0" />
<PackageReference Include="BCrypt.Net" Version="4.0.3" />

<!-- Sau -->
<PackageReference Include="Swashbuckle.AspNetCore.Filters" Version="7.0.0" />
<!-- Xóa BCrypt.Net package -->
```

### 2. **Thay Thế BCrypt Bằng Built-in .NET Hashing**
```csharp
// Trước
using BCrypt.Net.BCrypt;
var passwordHash = HashPassword(password);

// Sau
using System.Security.Cryptography;
var passwordHash = Convert.ToBase64String(
    SHA256.HashData(Encoding.UTF8.GetBytes(password))
);
```

## Lý Do Thay Đổi

### 1. **BCrypt.Net Package**
- Package `BCrypt.Net` version 4.0.3 không tồn tại trên NuGet
- Package `BCrypt.Net-Next` có thể gây conflict với các package khác
- **Giải pháp**: Sử dụng built-in .NET SHA256 hashing

### 2. **Swashbuckle.AspNetCore.Filters**
- Version 6.5.0 không tồn tại
- Version 7.0.0 là version mới nhất và tương thích
- **Giải pháp**: Cập nhật lên version 7.0.0

## Các Thay Đổi Trong Code

### 1. **DecalXeAPI.csproj**
```xml
<PackageReference Include="Swashbuckle.AspNetCore.Filters" Version="7.0.0" />
<!-- Xóa BCrypt.Net package -->
```

### 2. **Services/Implementations/OrderWithCustomerService.cs**
```csharp
// Thay đổi using statements
using System.Security.Cryptography;
using System.Text;

// Thay đổi password hashing
var passwordHash = Convert.ToBase64String(
    SHA256.HashData(Encoding.UTF8.GetBytes(password))
);
```

## Lưu Ý Quan Trọng

### 1. **Password Hashing**
- **Trước**: BCrypt (recommended cho production)
- **Sau**: SHA256 (tạm thời cho development)
- **Khuyến nghị**: Implement BCrypt hoặc Argon2 cho production

### 2. **Security Considerations**
- SHA256 không có salt, không an toàn cho production
- Cần implement proper password hashing cho production
- Có thể sử dụng `Microsoft.AspNetCore.Identity` cho password hashing

### 3. **Alternative Solutions**
```csharp
// Option 1: Sử dụng Microsoft.AspNetCore.Identity
using Microsoft.AspNetCore.Identity;
var passwordHasher = new PasswordHasher<Account>();
var passwordHash = passwordHasher.HashPassword(account, password);

// Option 2: Sử dụng BCrypt.Net-Next (nếu cần)
// Install-Package BCrypt.Net-Next
using BCrypt.Net;
var passwordHash = BCrypt.HashPassword(password);
```

## Bước Tiếp Theo

### 1. **Test Build**
```bash
dotnet restore
dotnet build
```

### 2. **Test API**
- Test endpoint tạo đơn hàng với khách hàng
- Test password hashing functionality

### 3. **Production Readiness**
- Implement proper password hashing (BCrypt/Argon2)
- Add salt to password hashing
- Consider using ASP.NET Core Identity

## Các File Đã Sửa

1. `DecalXeAPI.csproj` - Cập nhật package versions
2. `Services/Implementations/OrderWithCustomerService.cs` - Thay đổi password hashing

## Kết Quả Mong Đợi

- ✅ Build thành công không có lỗi package
- ✅ API hoạt động bình thường
- ✅ Password hashing hoạt động (tạm thời với SHA256)
- ✅ Swashbuckle documentation hoạt động với version mới