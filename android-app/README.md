# DecalXe Android App

Ứng dụng Android quản lý hệ thống DecalXe - Quản lý đơn hàng, khách hàng và decal.

## Tính năng chính

- **Quản lý đơn hàng**: Xem danh sách đơn hàng, chi tiết đơn hàng, trạng thái
- **Quản lý khách hàng**: Danh sách khách hàng, thông tin liên hệ
- **Quản lý decal**: Xem danh mục decal có sẵn
- **Quản lý nhân viên**: Danh sách nhân viên và phân quyền

## Công nghệ sử dụng

- **Kotlin** - Ngôn ngữ lập trình chính
- **Android Architecture Components** - ViewModel, LiveData
- **Retrofit 2** - HTTP client cho API calls
- **Material Design 3** - UI/UX design system
- **ViewBinding** - Type-safe view binding
- **RecyclerView** - Hiển thị danh sách
- **SwipeRefreshLayout** - Pull-to-refresh functionality

## Cấu trúc dự án

```
app/
├── src/main/java/com/decalxe/app/
│   ├── adapter/          # RecyclerView adapters
│   ├── model/           # Data models
│   ├── network/         # API service và networking
│   ├── utils/           # Utility classes
│   ├── viewmodel/       # ViewModels
│   ├── MainActivity.kt  # Main activity
│   ├── OrdersActivity.kt
│   └── CustomerActivity.kt
├── src/main/res/
│   ├── layout/          # XML layouts
│   ├── values/          # Colors, strings, themes
│   └── drawable/        # Icons và graphics
└── build.gradle         # App dependencies
```

## Cài đặt và chạy

### Yêu cầu

- Android Studio Arctic Fox trở lên
- Android SDK 24+ (Android 7.0)
- JDK 8 trở lên

### Bước 1: Cấu hình API endpoint

Mở file `app/src/main/java/com/decalxe/app/network/ApiClient.kt` và cập nhật `BASE_URL`:

```kotlin
// Cho development với emulator
private const val BASE_URL = "http://10.0.2.2:5000/"

// Cho production
private const val BASE_URL = "https://your-api-domain.com/"
```

### Bước 2: Build và chạy

1. Mở Android Studio
2. Import project từ thư mục `android-app`
3. Sync project với Gradle files
4. Chạy app trên emulator hoặc device

### Hoặc sử dụng command line:

```bash
# Build debug APK
./gradlew assembleDebug

# Install và chạy trên device
./gradlew installDebug
```

## API Integration

App kết nối với DecalXe API backend qua các endpoint:

- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/customers` - Lấy danh sách khách hàng
- `GET /api/decals` - Lấy danh sách decal
- `GET /api/employees` - Lấy danh sách nhân viên

## Tính năng sắp tới

- [ ] Thêm/sửa/xóa đơn hàng
- [ ] Thêm/sửa/xóa khách hàng  
- [ ] Tìm kiếm và lọc nâng cao
- [ ] Thông báo push
- [ ] Chế độ offline
- [ ] Xuất báo cáo
- [ ] Tích hợp camera để chụp ảnh

## Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Liên hệ

- Email: support@decalxe.com
- Website: https://decalxe.com