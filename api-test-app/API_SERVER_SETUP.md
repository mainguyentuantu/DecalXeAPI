# 🔧 Hướng dẫn setup API Server để test

## 📋 Yêu cầu

Để test ứng dụng này, bạn cần có API server chạy với các endpoints CustomerVehicles.

## 🚀 Cách chạy API Server (.NET)

### 1. Chạy từ thư mục gốc workspace

```bash
# Di chuyển về thư mục gốc (nơi có file .csproj)
cd ..

# Restore packages
dotnet restore

# Chạy API server
dotnet run
```

API server sẽ chạy tại: `http://localhost:5000` (hoặc `https://localhost:5001`)

### 2. Kiểm tra API hoạt động

Mở browser và truy cập:
- Swagger UI: `http://localhost:5000/swagger`
- Health check: `http://localhost:5000/api/CustomerVehicles`

## 🔄 CORS Configuration

Đảm bảo API server có cấu hình CORS để cho phép requests từ React app:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// ...

app.UseCors("AllowReactApp");
```

## 📊 Sample Data

Nếu database trống, bạn có thể:

1. **Chạy migrations**:
   ```bash
   dotnet ef database update
   ```

2. **Insert sample data** từ file `realistic_vietnam_decal_data.sql`

## 🧪 Test Endpoints

Sau khi API server chạy, bạn có thể test các endpoints:

### 1. Danh sách tất cả xe
```
GET http://localhost:5000/api/CustomerVehicles
```

### 2. Xe theo ID
```
GET http://localhost:5000/api/CustomerVehicles/{id}
```

### 3. Xe theo biển số
```
GET http://localhost:5000/api/CustomerVehicles/by-license-plate/51F-12345
```

### 4. Xe theo khách hàng
```
GET http://localhost:5000/api/CustomerVehicles/by-customer/{customerId}
```

### 5. Kiểm tra xe tồn tại
```
GET http://localhost:5000/api/CustomerVehicles/{id}/exists
```

### 6. Kiểm tra biển số tồn tại
```
GET http://localhost:5000/api/CustomerVehicles/license-plate/51F-12345/exists
```

### 7. Kiểm tra số khung tồn tại
```
GET http://localhost:5000/api/CustomerVehicles/chassis/ABC123456789/exists
```

## 🐛 Troubleshooting

### Lỗi CORS
```
Access to fetch at 'http://localhost:5000/api/CustomerVehicles' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Giải pháp**: Thêm CORS configuration vào API server như hướng dẫn ở trên.

### Lỗi Connection Refused
```
Failed to fetch
```

**Nguyên nhân**: API server chưa chạy hoặc chạy ở port khác.

**Giải pháp**: 
1. Kiểm tra API server có đang chạy không
2. Kiểm tra port trong cấu hình React app
3. Sử dụng nút "⚙️ Cấu hình API" để thay đổi URL

### Lỗi 404 Not Found
```
HTTP 404: Not Found
```

**Nguyên nhân**: Endpoint không tồn tại hoặc routing không đúng.

**Giải pháp**: Kiểm tra controller và routing configuration.

## 📝 Logging

Để debug, bạn có thể:

1. **Mở Developer Tools** trong browser (F12)
2. **Xem tab Network** để theo dõi API requests
3. **Xem tab Console** để xem lỗi JavaScript
4. **Kiểm tra logs** của API server

## 🔧 Cấu hình khác

### Thay đổi port API server

Nếu API server chạy ở port khác (ví dụ 7000):

1. Click nút "⚙️ Cấu hình API" trong React app
2. Thay đổi URL thành `http://localhost:7000/api`
3. Click "💾 Lưu"

### HTTPS

Nếu API server sử dụng HTTPS:

1. Cấu hình URL thành `https://localhost:5001/api`
2. Đảm bảo certificate được trust (có thể cần accept certificate warning)

## 🎯 Ready to Test!

Sau khi setup xong:

1. ✅ API server đang chạy
2. ✅ CORS được cấu hình
3. ✅ Database có dữ liệu
4. ✅ React app đang chạy tại `http://localhost:3000`

Bây giờ bạn có thể test toàn bộ API endpoints thông qua giao diện web!