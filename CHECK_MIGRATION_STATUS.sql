-- Script để kiểm tra trạng thái migration
-- Chạy lệnh này trong database để xem migration nào đã được apply

-- Kiểm tra bảng __EFMigrationsHistory
SELECT * FROM "__EFMigrationsHistory" ORDER BY "MigrationId";

-- Kiểm tra cột IsActive trong bảng Employees
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Employees' AND column_name = 'IsActive';

-- Kiểm tra tất cả cột trong bảng Employees
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Employees' 
ORDER BY ordinal_position;