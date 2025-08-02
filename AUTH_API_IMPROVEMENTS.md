# Cải tiến Auth API - Hỗ trợ Access Token, Refresh Token và User Data

## 🎯 Mục tiêu
Cải tiến API authentication để trả về đúng format mà frontend cần: `ACCESS_TOKEN`, `REFRESH_TOKEN`, và `USER_DATA`.

## 📋 Các thay đổi đã thực hiện

### 1. Tạo DTOs mới

#### `LoginResponseDto.cs`
```csharp
public class LoginResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public UserDataDto User { get; set; } = new UserDataDto();
}
```

#### `UserDataDto.cs`
```csharp
public class UserDataDto
{
    public string AccountID { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string Role { get; set; } = string.Empty;
    public string AccountRoleName { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}
```

#### `RefreshTokenDto.cs`
```csharp
public class RefreshTokenDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}
```

#### `LogoutDto.cs`
```csharp
public class LogoutDto
{
    public string RefreshToken { get; set; } = string.Empty;
}
```

### 2. Tạo TokenService

#### Interface: `ITokenService.cs`
```csharp
public interface ITokenService
{
    string GenerateAccessToken(Account account);
    string GenerateRefreshToken();
    LoginResponseDto CreateLoginResponse(Account account);
    bool ValidateRefreshToken(string refreshToken);
    string? GetUserIdFromToken(string token);
}
```

#### Implementation: `TokenService.cs`
- Tạo access token với thời hạn 1 giờ
- Tạo refresh token ngẫu nhiên
- Tạo response đầy đủ với user data
- Validate và extract user ID từ token

### 3. Cập nhật AuthController

#### Thay đổi Login API
```csharp
// Trước
public async Task<ActionResult<string>> Login([FromBody] LoginDto loginDto)
{
    // ...
    var token = GenerateJwtToken(account);
    return Ok(token);
}

// Sau
public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto loginDto)
{
    // ...
    var loginResponse = _tokenService.CreateLoginResponse(account);
    return Ok(loginResponse);
}
```

#### Thêm Refresh Token API
```csharp
[HttpPost("refresh-token")]
[AllowAnonymous]
public async Task<ActionResult<LoginResponseDto>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
{
    // Validate refresh token
    // Get user from database
    // Return new access token and refresh token
}
```

#### Thêm Logout API
```csharp
[HttpPost("logout")]
[Authorize]
public async Task<IActionResult> Logout([FromBody] LogoutDto logoutDto)
{
    // Invalidate refresh token
    return Ok("Đăng xuất thành công.");
}
```

### 4. Đăng ký Service trong Program.cs
```csharp
// Token Service
builder.Services.AddScoped<ITokenService, TokenService>();
```

## 🔄 API Endpoints mới

### 1. Login (Cập nhật)
```
POST /api/Auth/login
```
**Request:**
```json
{
  "username": "user123",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "base64-encoded-refresh-token",
  "user": {
    "accountID": "user-id-here",
    "username": "user123",
    "email": "user@example.com",
    "role": "Admin",
    "accountRoleName": "Admin",
    "isActive": true
  }
}
```

### 2. Refresh Token (Mới)
```
POST /api/Auth/refresh-token
```
**Request:**
```json
{
  "accessToken": "expired-access-token",
  "refreshToken": "valid-refresh-token"
}
```

**Response:** Giống như login response với token mới

### 3. Logout (Mới)
```
POST /api/Auth/logout
```
**Request:**
```json
{
  "refreshToken": "refresh-token-to-invalidate"
}
```

**Response:**
```json
{
  "message": "Đăng xuất thành công."
}
```

## 🔧 Cách sử dụng với Frontend

### 1. Login
```javascript
const response = await authService.login(credentials);
// response.data sẽ có:
// - accessToken
// - refreshToken  
// - user (với đầy đủ thông tin)
```

### 2. Refresh Token
```javascript
const response = await authService.refreshToken({
  accessToken: expiredToken,
  refreshToken: storedRefreshToken
});
```

### 3. Logout
```javascript
await authService.logout({ refreshToken: storedRefreshToken });
```

## ⚠️ Lưu ý quan trọng

1. **Refresh Token Storage**: Hiện tại refresh token được tạo ngẫu nhiên và không lưu trữ trong database. Trong production, bạn nên:
   - Lưu refresh token trong database
   - Thêm blacklist cho refresh token đã logout
   - Thêm expiration time cho refresh token

2. **Security**: 
   - Access token có thời hạn 1 giờ
   - Refresh token nên có thời hạn dài hơn (7-30 ngày)
   - Implement token rotation để tăng bảo mật

3. **Error Handling**: Frontend cần xử lý các trường hợp:
   - Access token hết hạn
   - Refresh token không hợp lệ
   - Network errors

## 🚀 Bước tiếp theo

1. Test các API endpoints mới
2. Cập nhật frontend để sử dụng format response mới
3. Implement token storage trong database (tùy chọn)
4. Thêm middleware để tự động refresh token khi cần