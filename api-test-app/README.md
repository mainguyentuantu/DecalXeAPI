# 🚗 API Test Dashboard - Customer Vehicles

Ứng dụng React.js với Tailwind CSS để test toàn bộ API CustomerVehicles với phương thức GET.

## ✨ Tính năng

### 📋 Danh sách xe
- Lấy danh sách tất cả xe khách hàng
- Hiển thị thông tin chi tiết: ID, biển số, số khung, thương hiệu, màu sắc, năm sản xuất, KM ban đầu, thông tin khách hàng
- Tự động tải lại dữ liệu

### 🔍 Tìm kiếm xe
- **Tìm theo ID xe**: Lấy thông tin một xe cụ thể
- **Tìm theo biển số**: Tìm xe bằng biển số (VD: 51F-12345)
- **Tìm theo ID khách hàng**: Lấy danh sách tất cả xe của một khách hàng

### ✅ Kiểm tra tồn tại
- **Kiểm tra xe tồn tại**: Kiểm tra ID xe có trong hệ thống không
- **Kiểm tra biển số tồn tại**: Kiểm tra biển số đã được sử dụng chưa
- **Kiểm tra số khung tồn tại**: Kiểm tra số khung đã được sử dụng chưa

### ⚙️ Cấu hình API
- Thay đổi Base URL của API server
- Lưu cấu hình trong localStorage
- Reset về cấu hình mặc định

## 🚀 Cách sử dụng

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### 3. Cấu hình API Server
1. Click nút "⚙️ Cấu hình API" ở góc phải header
2. Nhập Base URL của API server (mặc định: `http://localhost:5000/api`)
3. Click "💾 Lưu"

### 4. Test API
- **Tab "📋 Danh sách xe"**: Xem tất cả xe trong hệ thống
- **Tab "🔍 Tìm kiếm xe"**: Tìm xe theo ID, biển số, hoặc ID khách hàng
- **Tab "✅ Kiểm tra tồn tại"**: Kiểm tra sự tồn tại của xe, biển số, số khung

## 📡 API Endpoints được test

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `/api/CustomerVehicles` | GET | Lấy danh sách tất cả xe |
| `/api/CustomerVehicles/{id}` | GET | Lấy xe theo ID |
| `/api/CustomerVehicles/by-license-plate/{licensePlate}` | GET | Lấy xe theo biển số |
| `/api/CustomerVehicles/by-customer/{customerId}` | GET | Lấy xe theo ID khách hàng |
| `/api/CustomerVehicles/{id}/exists` | GET | Kiểm tra xe tồn tại |
| `/api/CustomerVehicles/license-plate/{licensePlate}/exists` | GET | Kiểm tra biển số tồn tại |
| `/api/CustomerVehicles/chassis/{chassisNumber}/exists` | GET | Kiểm tra số khung tồn tại |

## 🛠️ Công nghệ sử dụng

- **React 18** với TypeScript
- **Tailwind CSS** cho styling
- **Fetch API** cho HTTP requests
- **localStorage** để lưu cấu hình

## 📝 Cấu trúc dự án

```
src/
├── components/           # React components
│   ├── VehicleList.tsx   # Danh sách xe
│   ├── VehicleSearch.tsx # Tìm kiếm xe
│   ├── VehicleChecker.tsx# Kiểm tra tồn tại
│   └── ApiConfig.tsx     # Cấu hình API
├── services/             # API services
│   └── api.ts           # API service class
├── types/               # TypeScript types
│   └── api.ts          # API interfaces
├── App.tsx             # Main component
└── index.tsx           # Entry point
```

## 🔧 Tùy chỉnh

### Thay đổi Base URL mặc định
Sửa file `src/services/api.ts`:
```typescript
const getBaseUrl = () => {
  return localStorage.getItem('apiUrl') || 'YOUR_API_URL_HERE';
};
```

### Thêm endpoint mới
1. Thêm method vào `ApiService` class trong `src/services/api.ts`
2. Tạo component mới hoặc cập nhật component hiện có
3. Import và sử dụng trong `App.tsx`

## 🐛 Xử lý lỗi

Ứng dụng có xử lý lỗi toàn diện:
- **Network errors**: Hiển thị thông báo lỗi kết nối
- **HTTP errors**: Hiển thị status code và message
- **Validation errors**: Kiểm tra input trước khi gọi API
- **Loading states**: Hiển thị spinner khi đang tải

## 📱 Responsive Design

Giao diện được thiết kế responsive, hoạt động tốt trên:
- 💻 Desktop
- 📱 Mobile
- 📱 Tablet

## 🎨 UI/UX Features

- **Modern Design**: Sử dụng Tailwind CSS với thiết kế hiện đại
- **Interactive Elements**: Hover effects, transitions, loading states
- **Color Coding**: 
  - 🟢 Xanh lá: Thành công, tồn tại
  - 🔴 Đỏ: Lỗi, không tồn tại
  - 🔵 Xanh dương: Thông tin, đang tải
  - 🟡 Vàng: Cảnh báo, highlight
- **Icons**: Emoji icons cho dễ nhận biết
- **Typography**: Font system với hierarchy rõ ràng

## 🚀 Build cho production

```bash
npm run build
```

Files build sẽ được tạo trong thư mục `build/`

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra API server có đang chạy không
2. Kiểm tra CORS settings trên API server
3. Kiểm tra Base URL trong cấu hình
4. Mở Developer Tools để xem chi tiết lỗi
