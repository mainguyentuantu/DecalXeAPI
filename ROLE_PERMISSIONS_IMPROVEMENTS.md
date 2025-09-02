# Cải tiến Hệ thống Phân quyền Dựa trên Yêu cầu Chức năng

## Tổng quan

Hệ thống phân quyền đã được cải tiến để phù hợp chính xác với yêu cầu chức năng cụ thể của từng vai trò trong hệ thống quản lý decal xe.

## Vấn đề ban đầu

- Phân quyền không phù hợp với yêu cầu chức năng thực tế
- Thiếu các quyền chi tiết cho từng vai trò
- Không có sự phân biệt rõ ràng giữa các hành động cụ thể

## Giải pháp đã triển khai

### 1. Cập nhật cấu trúc phân quyền

#### File: `src/constants/permissions.js`
- Định nghĩa lại `ROLE_PERMISSIONS` dựa trên yêu cầu chức năng cụ thể
- Phân chia quyền theo từng module và hành động chi tiết
- Loại bỏ vai trò `Accountant` không cần thiết
- **Cập nhật Admin**: Loại bỏ quyền truy cập vào installations, designs, notifications, payments, warranty, và reports

#### File: `src/constants/ui.js`
- Cập nhật `USER_ROLES` với mô tả chức năng chính xác
- Định nghĩa `PERMISSIONS` chi tiết cho từng hành động
- Tổ chức quyền theo nhóm chức năng

### 2. Cải tiến hệ thống kiểm tra quyền

#### File: `src/services/auth.js`
- Cập nhật `roleHierarchy` (loại bỏ Accountant)
- Cải tiến các hàm kiểm tra quyền
- Tích hợp với hệ thống phân quyền mới

#### File: `src/hooks/useAuth.js`
- Export các hàm kiểm tra quyền mới
- Cung cấp interface cho components

### 3. Giao diện hiển thị quyền

#### File: `src/components/auth/RolePermissionsDisplay.jsx`
- Hiển thị quyền theo module với icon trực quan
- Nhãn tiếng Việt chi tiết cho từng hành động
- Tổ chức layout responsive

#### File: `src/pages/settings/UserProfilePage.jsx`
- Thêm tab "Quyền hạn" để xem quyền hiện tại
- Tích hợp `RolePermissionsDisplay` component

## Ma trận phân quyền chi tiết

### Admin (Quản trị viên)
**Chức năng chính:**
- Quản lý tài khoản người dùng và phân quyền
- Bảo trì hệ thống, cập nhật và kiểm soát tham số hệ thống
- Phân tích hệ thống (không bao gồm báo cáo)
- Quản lý chuỗi cửa hàng và giám sát hoạt động tổng thể
- **KHÔNG có quyền truy cập**: Lắp đặt, Thiết kế, Hệ thống tin nhắn, Tài chính, Bảo hành và Hỗ trợ, Báo cáo

**Quyền chi tiết:**
- `accounts`: view, create, edit, delete, assign_permissions
- `employees`: view, create, edit, delete, assign_roles
- `settings`: view, edit, system_maintenance, update_parameters
- `analytics`: view, export, system_analytics
- `stores`: view, create, edit, delete, monitor_all
- `orders`: view, create, edit, delete, assign, approve
- `customers`: view, create, edit, delete
- `services`: view, create, edit, delete
- `vehicles`: view, create, edit, delete
- `templates`: view, create, edit, delete

### Manager (Quản lý)
**Chức năng chính:**
- Quản lý thông tin dịch vụ decal và loại decal
- Kiểm soát hoạt động nhân viên, phân công công việc
- Theo dõi và quản lý đơn hàng
- Giám sát báo cáo doanh thu và hiệu suất kinh doanh tại cửa hàng
- Thực hiện điều chỉnh và thay đổi trong danh mục dịch vụ và mẫu decal

**Quyền chi tiết:**
- `services`: view, create, edit, manage_types
- `decal_types`: view, create, edit, manage
- `templates`: view, create, edit, manage_catalog
- `employees`: view, assign_tasks, control_activities
- `orders`: view, create, edit, track, manage
- `reports`: view, revenue_reports, business_performance
- `analytics`: view, store_analytics
- `stores`: view, manage_store
- `customers`: view, create, edit
- `notifications`: view, create, send
- `payments`: view, process
- `installations`: view, assign, track
- `designs`: view, approve, manage
- `vehicles`: view, create, edit
- `warranty`: view, create, edit

### Sales (Nhân viên bán hàng)
**Chức năng chính:**
- Tư vấn và nhận yêu cầu từ khách hàng
- Ghi lại thông tin khách hàng và đơn hàng
- Giới thiệu dịch vụ decal và mẫu thiết kế decal có sẵn
- Theo dõi và báo cáo hiệu suất bán hàng
- Hướng dẫn khách hàng về quy trình dịch vụ decal xe
- Tạo đơn hàng và chuyển yêu cầu đến bộ phận thiết kế

**Quyền chi tiết:**
- `customers`: view, create, edit, consult
- `orders`: view, create, edit, track
- `services`: view, introduce
- `templates`: view, show_available
- `reports`: view, sales_performance
- `vehicles`: view, create, edit
- `notifications`: view, create, send_customer
- `payments`: view, process
- `warranty`: view
- `designs`: view, transmit_requests

### Designer (Thiết kế viên)
**Chức năng chính:**
- Nhận yêu cầu thiết kế decal từ khách hàng
- Tạo và chỉnh sửa thiết kế decal cho khách hàng
- Xác nhận và phê duyệt thiết kế với khách hàng
- Chuẩn bị và chuyển thiết kế cho nhân viên lắp đặt
- Quản lý mẫu thiết kế hoàn thành và lưu trữ dữ liệu thiết kế

**Quyền chi tiết:**
- `designs`: view, create, edit, receive_requests
- `templates`: view, create, edit, manage_completed
- `customers`: view, confirm_designs
- `orders`: view, update_design_status
- `installations`: view, transfer_designs
- `notifications`: view, create, design_notifications
- `design_data`: view, store, manage

### Technician (Kỹ thuật viên)
**Chức năng chính:**
- Áp dụng decal lên xe theo thiết kế đã được phê duyệt
- Kiểm tra chất lượng lắp đặt và bảo vệ lớp decal khỏi các yếu tố ảnh hưởng
- Bàn giao sản phẩm hoàn thành cho khách hàng sau khi lắp đặt
- Thực hiện điều chỉnh và sửa chữa nếu cần thiết trong quá trình lắp đặt

**Quyền chi tiết:**
- `installations`: view, create, edit, apply_decals
- `quality_control`: view, check_quality, protect_decals
- `orders`: view, update_installation_status
- `designs`: view, receive_approved
- `customers`: view, handover_product
- `notifications`: view, create, installation_notifications
- `warranty`: view, create, perform_repairs
- `vehicles`: view, edit_installation_notes

### Customer (Khách hàng)
**Chức năng chính:**
- Đặt đơn hàng dịch vụ decal xe trực tuyến hoặc tại cửa hàng
- Cung cấp yêu cầu tùy chỉnh cho thiết kế decal
- Theo dõi tiến độ lắp đặt và thời gian hoàn thành dự kiến
- Thanh toán và nhận sản phẩm sau khi hoàn thành dịch vụ

**Quyền chi tiết:**
- `orders`: view_own, place_orders, track_progress
- `designs`: view_own, request_customization
- `services`: view, browse_services
- `templates`: view, browse_templates
- `payments`: view_own, pay
- `notifications`: view_own, receive_notifications
- `vehicles`: view_own, add_vehicle

## Lợi ích của cải tiến

### 1. Phù hợp với yêu cầu thực tế
- Phân quyền chính xác theo chức năng của từng vai trò
- Đảm bảo mỗi vai trò chỉ có quyền cần thiết
- Tăng tính bảo mật và kiểm soát
- **Admin có quyền hạn giới hạn phù hợp với vai trò quản trị hệ thống**

### 2. Dễ dàng quản lý
- Cấu trúc phân quyền rõ ràng, dễ hiểu
- Dễ dàng thêm/sửa/xóa quyền khi cần
- Hỗ trợ mở rộng trong tương lai

### 3. Giao diện thân thiện
- Hiển thị quyền trực quan với icon và nhãn tiếng Việt
- Tổ chức theo module dễ theo dõi
- Responsive design cho mọi thiết bị

### 4. Tích hợp tốt
- Tích hợp với hệ thống authentication hiện tại
- Cung cấp API kiểm tra quyền linh hoạt
- Hỗ trợ kiểm tra quyền ở nhiều cấp độ

## Cách sử dụng

### Kiểm tra quyền trong component
```javascript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { hasModulePermission, hasSpecificPermission } = useAuth();
  
  // Kiểm tra quyền module
  const canViewOrders = hasModulePermission('orders', 'view');
  const canCreateOrders = hasModulePermission('orders', 'create');
  
  // Kiểm tra quyền cụ thể
  const canManageStaff = hasSpecificPermission('staff_management');
  
  return (
    <div>
      {canViewOrders && <OrderList />}
      {canCreateOrders && <CreateOrderButton />}
    </div>
  );
};
```

### Hiển thị quyền người dùng
```javascript
import RolePermissionsDisplay from '../components/auth/RolePermissionsDisplay';

const UserProfile = () => {
  return (
    <div>
      <h2>Thông tin cá nhân</h2>
      <RolePermissionsDisplay />
    </div>
  );
};
```

## Kết luận

Hệ thống phân quyền mới đã được thiết kế để phù hợp chính xác với yêu cầu chức năng của từng vai trò trong hệ thống quản lý decal xe. **Admin giờ đây có quyền hạn giới hạn, tập trung vào quản lý hệ thống và người dùng, không can thiệp vào các hoạt động nghiệp vụ cụ thể như lắp đặt, thiết kế, tài chính, v.v.** Việc cải tiến này đảm bảo tính bảo mật, dễ quản lý và mở rộng trong tương lai.
