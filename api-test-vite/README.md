# 🚗 API Test Dashboard - CustomerVehicles (Vite + React)

Ứng dụng React.js với Vite và Tailwind CSS để test toàn bộ API CustomerVehicles với phương thức GET từ server production trên Railway.

## 🌐 API Production URL
```
https://decalxeapi-production.up.railway.app/api
```

## ✨ Tính năng

### 📋 Danh sách xe
- Lấy danh sách tất cả xe khách hàng từ production API
- Hiển thị thông tin chi tiết: ID, biển số, số khung, thương hiệu, màu sắc, năm sản xuất, KM ban đầu, thông tin khách hàng
- Giao diện hiện đại với gradient và animations
- Real-time connection status

### 🔍 Tìm kiếm xe
- **Tìm theo ID xe**: Lấy thông tin một xe cụ thể
- **Tìm theo biển số**: Tìm xe bằng biển số (VD: 59H1-234.56)
- **Tìm theo ID khách hàng**: Lấy danh sách tất cả xe của một khách hàng
- Auto-complete với placeholders từ dữ liệu thực

### ✅ Kiểm tra tồn tại
- **Kiểm tra xe tồn tại**: Kiểm tra ID xe có trong hệ thống không
- **Kiểm tra biển số tồn tại**: Kiểm tra biển số đã được sử dụng chưa
- **Kiểm tra số khung tồn tại**: Kiểm tra số khung đã được sử dụng chưa
- Kết quả trực quan với màu sắc và icons

### 🔗 Connection Status
- Hiển thị trạng thái kết nối API real-time
- Test connection button
- Error handling và retry mechanism

## 🚀 Cách sử dụng

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy development server
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### 3. Build cho production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

## 📡 API Endpoints được test

| Endpoint | Method | Mô tả | Status |
|----------|--------|-------|--------|
| `/api/CustomerVehicles` | GET | Lấy danh sách tất cả xe | ✅ Hoạt động |
| `/api/CustomerVehicles/{id}` | GET | Lấy xe theo ID | ✅ Hoạt động |
| `/api/CustomerVehicles/by-license-plate/{licensePlate}` | GET | Lấy xe theo biển số | ✅ Hoạt động |
| `/api/CustomerVehicles/by-customer/{customerId}` | GET | Lấy xe theo ID khách hàng | ✅ Hoạt động |
| `/api/CustomerVehicles/{id}/exists` | GET | Kiểm tra xe tồn tại | ✅ Hoạt động |
| `/api/CustomerVehicles/license-plate/{licensePlate}/exists` | GET | Kiểm tra biển số tồn tại | ✅ Hoạt động |
| `/api/CustomerVehicles/chassis/{chassisNumber}/exists` | GET | Kiểm tra số khung tồn tại | ✅ Hoạt động |

## 🛠️ Công nghệ sử dụng

- **⚡ Vite** - Build tool nhanh và hiện đại
- **⚛️ React 18** với TypeScript
- **🎨 Tailwind CSS** cho styling
- **🌐 Fetch API** cho HTTP requests
- **🎭 Framer Motion** (qua CSS animations)

## 📝 Cấu trúc dự án

```
src/
├── components/           # React components
│   ├── VehicleList.tsx   # Danh sách xe
│   ├── VehicleSearch.tsx # Tìm kiếm xe
│   ├── VehicleChecker.tsx# Kiểm tra tồn tại
│   └── ConnectionStatus.tsx # Trạng thái kết nối
├── services/             # API services
│   └── api.ts           # API service class
├── types/               # TypeScript types
│   └── api.ts          # API interfaces
├── App.tsx             # Main component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 UI/UX Features

### 🌈 Modern Design
- **Gradient backgrounds** từ blue đến purple
- **Glass morphism** effects
- **Smooth animations** và transitions
- **Responsive design** cho mọi thiết bị

### 🎯 Interactive Elements
- **Hover effects** trên buttons và cards
- **Loading spinners** với custom animations
- **Color-coded results**:
  - 🟢 Xanh lá: Thành công, tồn tại
  - 🔴 Đỏ: Lỗi, không tồn tại
  - 🔵 Xanh dương: Thông tin, đang tải
  - 🟡 Vàng: Highlight, cảnh báo

### 📱 Responsive Features
- **Mobile-first** design approach
- **Sticky navigation** bar
- **Overflow handling** cho mobile
- **Touch-friendly** buttons và inputs

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` nếu muốn override API URL:
```env
VITE_API_BASE_URL=https://your-custom-api-url.com/api
```

### Vite Configuration
File `vite.config.ts` đã được cấu hình sẵn cho:
- TypeScript support
- Fast refresh
- Build optimization

## 🧪 Testing

### Manual Testing
1. **Connection Test**: Click "🔄 Test lại" ở header
2. **List Test**: Tab "📋 Danh sách xe"
3. **Search Test**: Tab "🔍 Tìm kiếm xe" với các loại search
4. **Existence Test**: Tab "✅ Kiểm tra tồn tại"

### Test Data Examples
Từ API production hiện tại:
- **Vehicle ID**: `44c4a3df-0b76-4288-bccd-077387126c9e`
- **License Plate**: `59H1-234.56`
- **Customer ID**: `9dc301f8-d3d3-4256-84b0-e748556d05ce`
- **Chassis Number**: `VNKJF19E2NA123456`

## 🐛 Troubleshooting

### API Connection Issues
1. **Check network**: Đảm bảo có kết nối internet
2. **Railway status**: Kiểm tra server Railway có online không
3. **CORS**: API đã cấu hình CORS cho frontend

### Build Issues
```bash
# Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy build folder to Vercel
```

### Netlify
```bash
npm run build
# Drag & drop dist folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host"]
```

## 📊 Performance

- **⚡ Fast**: Vite dev server khởi động < 1s
- **📦 Small**: Bundle size < 500KB gzipped
- **🎯 Efficient**: Tree-shaking và code splitting
- **♻️ Optimized**: Image và asset optimization

## 🔮 Future Enhancements

- [ ] **Dark mode** toggle
- [ ] **Export data** to CSV/JSON
- [ ] **Real-time updates** với WebSocket
- [ ] **Offline support** với Service Worker
- [ ] **PWA** capabilities
- [ ] **Multi-language** support

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra API server có đang chạy không
2. Kiểm tra connection status ở header
3. Mở Developer Tools để xem chi tiết lỗi
4. Check network tab để debug API calls

---

**🎉 Happy Testing!** Ứng dụng này giúp bạn test toàn bộ API CustomerVehicles một cách trực quan và hiệu quả!
