# Hướng Dẫn Sửa Lỗi Migration

## Vấn Đề
Lỗi `column "IsActive" of relation "Employees" already exists` xảy ra khi cột `IsActive` đã tồn tại trong database nhưng migration chưa được đánh dấu là đã apply.

## Giải Pháp

### Cách 1: Sửa Thủ Công (Khuyến Nghị)

#### Bước 1: Kết nối vào Database
```bash
# Sử dụng psql hoặc pgAdmin để kết nối vào database
psql -h localhost -U your_username -d your_database
```

#### Bước 2: Kiểm tra trạng thái migration
```sql
-- Kiểm tra migration history
SELECT * FROM "__EFMigrationsHistory" ORDER BY "MigrationId";

-- Kiểm tra cột IsActive
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Employees' AND column_name = 'IsActive';
```

#### Bước 3: Thêm migration vào history (nếu chưa có)
```sql
-- Chỉ chạy nếu migration chưa có trong __EFMigrationsHistory
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion") 
VALUES ('20250124000000_AddIsActiveToEmployee', '8.0.0')
ON CONFLICT ("MigrationId") DO NOTHING;
```

#### Bước 4: Kiểm tra lại
```sql
-- Kiểm tra migration đã được thêm
SELECT * FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250124000000_AddIsActiveToEmployee';

-- Kiểm tra cột IsActive
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Employees' AND column_name = 'IsActive';
```

### Cách 2: Sử dụng Script PowerShell

#### Bước 1: Chạy script PowerShell
```powershell
# Chạy script fix_migration.ps1
.\fix_migration.ps1
```

#### Bước 2: Chạy migration
```bash
dotnet ef database update
```

### Cách 3: Reset Migration (Cẩn Thận!)

#### ⚠️ CẢNH BÁO: Chỉ sử dụng nếu database chưa có dữ liệu quan trọng

```bash
# Xóa tất cả migration và tạo lại
dotnet ef database drop --force
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Kiểm Tra Sau Khi Sửa

### 1. Kiểm tra migration history
```sql
SELECT * FROM "__EFMigrationsHistory" ORDER BY "MigrationId";
```

### 2. Kiểm tra cột IsActive
```sql
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Employees' AND column_name = 'IsActive';
```

### 3. Test API
```bash
# Chạy ứng dụng
dotnet run

# Test endpoint
curl -X GET "https://localhost:7001/api/employees"
```

## Nguyên Nhân Lỗi

1. **Database Schema Không Đồng Bộ**: Cột `IsActive` đã tồn tại trong database nhưng migration chưa được đánh dấu là đã apply
2. **Migration History Không Đúng**: Bảng `__EFMigrationsHistory` không có record cho migration `20250124000000_AddIsActiveToEmployee`
3. **Manual Database Changes**: Có thể đã có thay đổi thủ công trong database mà không thông qua migration

## Phòng Tránh Trong Tương Lai

1. **Luôn sử dụng Migration**: Không thay đổi database schema thủ công
2. **Backup trước khi migration**: Luôn backup database trước khi chạy migration
3. **Test migration**: Test migration trên database development trước khi apply lên production
4. **Version Control**: Commit migration files vào git để track changes

## Các File Liên Quan

- `Migrations/20250124000000_AddIsActiveToEmployee.cs` - Migration file
- `fix_migration.ps1` - Script PowerShell tự động
- `FIX_MIGRATION_ISSUE.sql` - Script SQL thủ công
- `CHECK_MIGRATION_STATUS.sql` - Script kiểm tra trạng thái