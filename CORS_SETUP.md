# Cấu hình CORS cho DecalXeAPI

## Tổng quan
API đã được cấu hình CORS để hỗ trợ phát triển frontend với các framework phổ biến.

## Cấu hình hiện tại

### Môi trường Development (appsettings.Development.json)
```json
{
  "Cors": {
    "AllowedOrigins": [
      "http://localhost:3000",    // React default port
      "http://localhost:3001",    // React alternative port
      "http://localhost:5173",    // Vite dev server
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001", 
      "http://127.0.0.1:5173",
      "http://localhost:8080",    // Vue.js default port
      "http://localhost:4200"     // Angular default port
    ],
    "AllowCredentials": true,
    "AllowAllOrigins": false
  }
}
```

### Môi trường Production (appsettings.json)
```json
{
  "Cors": {
    "AllowedOrigins": [
      "https://your-production-domain.com"
    ],
    "AllowCredentials": true
  }
}
```

## Cách sử dụng

### 1. Để thêm origin mới cho development:
Chỉnh sửa file `appsettings.Development.json` và thêm URL vào mảng `AllowedOrigins`:

```json
"AllowedOrigins": [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://your-new-port:port"  // Thêm dòng này
]
```

### 2. Để cho phép tất cả origins (chỉ dùng khi phát triển):
Thêm cấu hình sau vào `appsettings.Development.json`:

```json
{
  "Cors": {
    "AllowAllOrigins": true
  }
}
```

### 3. Để sử dụng policy khác trong controller:
```csharp
[EnableCors("AllowAll")]  // Cho phép tất cả origins
public class YourController : ControllerBase
{
    // Your actions
}
```

## Các policy có sẵn

1. **AllowSpecificOrigin** (mặc định): Cho phép các origin được cấu hình trong appsettings
2. **AllowAll**: Cho phép tất cả origins (chỉ dùng khi phát triển)

## Lưu ý bảo mật

- **KHÔNG BAO GIỜ** sử dụng `AllowAll` policy trong production
- Luôn chỉ định rõ ràng các origin được phép trong production
- Kiểm tra kỹ cấu hình trước khi deploy

## Kiểm tra CORS

Để kiểm tra CORS có hoạt động không, mở Developer Tools trong browser và kiểm tra:

1. Network tab để xem preflight requests (OPTIONS)
2. Console để xem các lỗi CORS (nếu có)
3. Response headers phải chứa `Access-Control-Allow-Origin`

## Ví dụ request từ frontend

### JavaScript/Fetch
```javascript
fetch('https://your-api-domain.com/api/endpoint', {
  method: 'POST',
  credentials: 'include',  // Quan trọng khi AllowCredentials: true
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-jwt-token'
  },
  body: JSON.stringify(data)
});
```

### Axios
```javascript
axios.defaults.withCredentials = true;  // Cho phép gửi cookies

axios.post('https://your-api-domain.com/api/endpoint', data, {
  headers: {
    'Authorization': 'Bearer your-jwt-token'
  }
});
```

## Troubleshooting

### Lỗi thường gặp:

1. **"Access to fetch at '...' from origin '...' has been blocked by CORS policy"**
   - Kiểm tra origin có trong danh sách AllowedOrigins không
   - Đảm bảo port number chính xác

2. **"Credential is not supported if the CORS header 'Access-Control-Allow-Origin' is '*'"**
   - Không thể sử dụng AllowCredentials với AllowAnyOrigin
   - Phải chỉ định rõ origins khi sử dụng credentials

3. **Preflight request failed**
   - Kiểm tra API có hỗ trợ OPTIONS method không
   - Kiểm tra headers được phép

### Debug steps:
1. Kiểm tra file appsettings đang được sử dụng
2. Restart API sau khi thay đổi cấu hình
3. Xóa cache browser
4. Kiểm tra network logs trong DevTools