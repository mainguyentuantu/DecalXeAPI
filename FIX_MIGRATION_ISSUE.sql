-- Script để sửa lỗi migration IsActive column
-- Chạy từng lệnh một cách cẩn thận

-- 1. Kiểm tra xem migration đã được apply chưa
SELECT * FROM "__EFMigrationsHistory" WHERE "MigrationId" = '20250124000000_AddIsActiveToEmployee';

-- 2. Nếu migration chưa được apply, thêm vào history
-- (Chỉ chạy nếu migration chưa có trong bảng __EFMigrationsHistory)
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion") 
VALUES ('20250124000000_AddIsActiveToEmployee', '8.0.0')
ON CONFLICT ("MigrationId") DO NOTHING;

-- 3. Kiểm tra xem cột IsActive đã tồn tại chưa
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Employees' AND column_name = 'IsActive';

-- 4. Nếu cột IsActive chưa tồn tại, thêm vào
-- (Chỉ chạy nếu cột IsActive chưa có)
ALTER TABLE "Employees" ADD COLUMN "IsActive" boolean NOT NULL DEFAULT true;

-- 5. Kiểm tra lại kết quả
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'Employees' AND column_name = 'IsActive';