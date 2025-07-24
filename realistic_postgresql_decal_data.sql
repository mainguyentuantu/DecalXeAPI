-- REALISTIC VIETNAMESE DECAL BUSINESS DATA - PostgreSQL FORMAT
-- DecalXe - Dán Decal Xe Máy & Ô Tô Việt Nam
-- Using exact template format with realistic Vietnamese data

-- ==============================================
-- 1. ROLES - Vietnamese Business Hierarchy
-- ==============================================
INSERT INTO public."Roles"(
	"RoleID", "RoleName")
	VALUES ('ADMIN', 'Quản Trị Viên');

INSERT INTO public."Roles"(
	"RoleID", "RoleName")
	VALUES ('MANAGER', 'Quản Lý Cửa Hàng');

INSERT INTO public."Roles"(
	"RoleID", "RoleName")
	VALUES ('SALES', 'Nhân Viên Bán Hàng');

INSERT INTO public."Roles"(
	"RoleID", "RoleName")
	VALUES ('DESIGNER', 'Thiết Kế Viên');

INSERT INTO public."Roles"(
	"RoleID", "RoleName")
	VALUES ('TECHNICIAN', 'Thợ Dán Decal');

INSERT INTO public."Roles"(
	"RoleID", "RoleName")
	VALUES ('CUSTOMER', 'Khách Hàng');

-- ==============================================
-- 2. STORES - Real Vietnamese Locations
-- ==============================================
INSERT INTO public."Stores"(
	"StoreID", "StoreName", "Address")
	VALUES ('STORE001', 'DecalXe Quận 1', '245 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM');

INSERT INTO public."Stores"(
	"StoreID", "StoreName", "Address")
	VALUES ('STORE002', 'DecalXe Gò Vấp', '1234 Quang Trung, Phường 8, Gò Vấp, TP.HCM');

INSERT INTO public."Stores"(
	"StoreID", "StoreName", "Address")
	VALUES ('STORE003', 'DecalXe Bình Thạnh', '567 Xô Viết Nghệ Tĩnh, Phường 25, Bình Thạnh, TP.HCM');

-- ==============================================
-- 3. ACCOUNTS - Real Vietnamese Business Accounts
-- ==============================================
-- Admin accounts
INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC001', 'admin.minh', 'minh.admin@decalxe.vn', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/pxSinIu', true, 'ADMIN');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC002', 'admin.linh', 'linh.admin@decalxe.vn', '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true, 'ADMIN');

-- Manager accounts
INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC003', 'ql.duc', 'duc.manager@decalxe.vn', '$2b$12$VEjyQcJ9UuWMhndMsAjgNu3DqRyKVzXqHpJ8VBjjLVR.cvLhiKkZi', true, 'MANAGER');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC004', 'ql.thuy', 'thuy.manager@decalxe.vn', '$2b$12$NjXXh9bfI6AtDH5tfFHqQe6sqQgdXbZzGrLqr8H8d1HiOPGgBuHCi', true, 'MANAGER');

-- Sales accounts
INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC005', 'nv.hung', 'hung.sales@decalxe.vn', '$2b$12$5dpvNgVczsTKK6YAbFRLJ.ogJpBdaHnH7wpgqjRt4jFjdAHBxSSK6', true, 'SALES');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC006', 'nv.mai', 'mai.sales@decalxe.vn', '$2b$12$fCOHChr9IJhVqqVqVq0VNuJ/.ROCEeJyHFQ2/H5rFjlbAKM8Nmkhm', true, 'SALES');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC007', 'nv.nam', 'nam.sales@decalxe.vn', '$2b$12$oRLNHxTb0hcHbXWo7qhW.eRBhTpGlL0vxb9gHi9Ck4SA.aMqHl0ym', true, 'SALES');

-- Designer accounts
INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC008', 'tk.phuong', 'phuong.design@decalxe.vn', '$2b$12$6BKw3TpzJ9CoKWYSTAOSUehhT2lN9pG7BQRjWmBn8ghqwFGfAzlE6', true, 'DESIGNER');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC009', 'tk.tuan', 'tuan.design@decalxe.vn', '$2b$12$6BKw3TpzJ9CoKWYSTAOSUehhT2lN9pG7BQRjWmBn8ghqwFGfAzlE6', true, 'DESIGNER');

-- Technician accounts
INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC010', 'tho.long', 'long.tech@decalxe.vn', '$2b$12$VQ9c7Hr7pehXyhQhd6FNxeOyHBNpXAT.jfxaJrcQaHHo1iWW5JWoO', true, 'TECHNICIAN');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC011', 'tho.hai', 'hai.tech@decalxe.vn', '$2b$12$TwpA/3vnDp/DDOzAg5lW8ue8.6yNzh8B7cyNcGcMsCuuNuYF.lxjS', true, 'TECHNICIAN');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC012', 'tho.son', 'son.tech@decalxe.vn', '$2b$12$oQv2LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/px', true, 'TECHNICIAN');

-- Customer accounts
INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC013', 'kh.anhtuan', 'anhtuan89@gmail.com', '$2b$12$4f67O4SkYqjqT0DycwwuHeRr4uX2m8.0y4ksX1.JdGBFpVUjjK3C6', true, 'CUSTOMER');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC014', 'kh.minhchau', 'minhchau.nguyen@yahoo.com', '$2b$12$jGAoqJkVhAUEeQIFKTlO8eWEk567O4SkYqjqT0DycwwuHeRr4uX2m', true, 'CUSTOMER');

INSERT INTO public."Accounts"(
	"AccountID", "Username", "Email", "PasswordHash", "IsActive", "RoleID")
	VALUES ('ACC015', 'kh.ducmanh', 'ducmanh1990@hotmail.com', '$2b$12$1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/pxSinIu4f67', true, 'CUSTOMER');

-- ==============================================
-- 4. EMPLOYEES - Authentic Vietnamese Names
-- ==============================================
INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP001', 'Nguyễn Văn', 'Minh', '0901234567', 'minh.admin@decalxe.vn', 'STORE001', 'ACC001');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP002', 'Trần Thị', 'Linh', '0901234568', 'linh.admin@decalxe.vn', 'STORE002', 'ACC002');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP003', 'Lê Thanh', 'Đức', '0901234569', 'duc.manager@decalxe.vn', 'STORE001', 'ACC003');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP004', 'Phạm Thúy', 'Thủy', '0901234570', 'thuy.manager@decalxe.vn', 'STORE002', 'ACC004');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP005', 'Hoàng Văn', 'Hùng', '0901234571', 'hung.sales@decalxe.vn', 'STORE001', 'ACC005');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP006', 'Võ Thị', 'Mai', '0901234572', 'mai.sales@decalxe.vn', 'STORE002', 'ACC006');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP007', 'Đặng Quốc', 'Nam', '0901234573', 'nam.sales@decalxe.vn', 'STORE003', 'ACC007');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP008', 'Bùi Thị', 'Phương', '0901234574', 'phuong.design@decalxe.vn', 'STORE001', 'ACC008');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP009', 'Đỗ Anh', 'Tuấn', '0901234575', 'tuan.design@decalxe.vn', 'STORE002', 'ACC009');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP010', 'Ngô Văn', 'Long', '0901234576', 'long.tech@decalxe.vn', 'STORE001', 'ACC010');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP011', 'Phan Văn', 'Hải', '0901234577', 'hai.tech@decalxe.vn', 'STORE002', 'ACC011');

INSERT INTO public."Employees"(
	"EmployeeID", "FirstName", "LastName", "PhoneNumber", "Email", "StoreID", "AccountID")
	VALUES ('EMP012', 'Vũ Đình', 'Sơn', '0901234578', 'son.tech@decalxe.vn', 'STORE003', 'ACC012');

-- ==============================================
-- 5. EMPLOYEE DETAILS - Realistic Specializations
-- ==============================================
-- Admin Details
INSERT INTO public."AdminDetails"(
	"EmployeeID", "AccessLevel")
	VALUES ('EMP001', 'Quản Trị Hệ Thống Toàn Quyền');

INSERT INTO public."AdminDetails"(
	"EmployeeID", "AccessLevel")
	VALUES ('EMP002', 'Quản Trị Chi Nhánh');

-- Manager Details (Budget in VND)
INSERT INTO public."ManagerDetails"(
	"EmployeeID", "BudgetManaged")
	VALUES ('EMP003', 500000000.00);  -- 500 triệu VND

INSERT INTO public."ManagerDetails"(
	"EmployeeID", "BudgetManaged")
	VALUES ('EMP004', 400000000.00);  -- 400 triệu VND

-- Sales Person Details (Commission rate %)
INSERT INTO public."SalesPersonDetails"(
	"EmployeeID", "CommissionRate")
	VALUES ('EMP005', 8.50);  -- 8.5% hoa hồng

INSERT INTO public."SalesPersonDetails"(
	"EmployeeID", "CommissionRate")
	VALUES ('EMP006', 7.50);  -- 7.5% hoa hồng

INSERT INTO public."SalesPersonDetails"(
	"EmployeeID", "CommissionRate")
	VALUES ('EMP007', 6.00);  -- 6% hoa hồng

-- Designer Details
INSERT INTO public."DesignerDetails"(
	"EmployeeID", "Specialization", "PortfolioUrl")
	VALUES ('EMP008', 'Thiết Kế Decal Xe Máy & Racing', 'https://portfolio.decalxe.vn/phuong');

INSERT INTO public."DesignerDetails"(
	"EmployeeID", "Specialization", "PortfolioUrl")
	VALUES ('EMP009', 'Thiết Kế Decal Ô Tô Cao Cấp', 'https://portfolio.decalxe.vn/tuan');

-- Technician Details
INSERT INTO public."TechnicianDetails"(
	"EmployeeID", "YearsOfExperience", "Certifications")
	VALUES ('EMP010', 8, 'Chứng Chỉ Thợ Trưởng Dán Decal 3M, Chứng Chỉ PPF Advanced');

INSERT INTO public."TechnicianDetails"(
	"EmployeeID", "YearsOfExperience", "Certifications")
	VALUES ('EMP011', 5, 'Chứng Chỉ Thợ Chính Dán Decal, Chứng Chỉ Carbon Vinyl');

INSERT INTO public."TechnicianDetails"(
	"EmployeeID", "YearsOfExperience", "Certifications")
	VALUES ('EMP012', 2, 'Chứng Chỉ Thợ Phụ Cơ Bản');

-- ==============================================
-- 6. CUSTOMERS - Real Vietnamese Customer Profiles
-- ==============================================
INSERT INTO public."Customers"(
	"CustomerID", "FirstName", "LastName", "PhoneNumber", "Email", "Address", "AccountID")
	VALUES ('CUST001', 'Nguyễn Anh', 'Tuấn', '0912345678', 'anhtuan89@gmail.com', '123/45 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM', 'ACC013');

INSERT INTO public."Customers"(
	"CustomerID", "FirstName", "LastName", "PhoneNumber", "Email", "Address", "AccountID")
	VALUES ('CUST002', 'Trần Minh', 'Châu', '0912345679', 'minhchau.nguyen@yahoo.com', '567 Trần Hưng Đạo, Phường 2, Quận 5, TP.HCM', 'ACC014');

INSERT INTO public."Customers"(
	"CustomerID", "FirstName", "LastName", "PhoneNumber", "Email", "Address", "AccountID")
	VALUES ('CUST003', 'Lê Đức', 'Mạnh', '0912345680', 'ducmanh1990@hotmail.com', '89 Nguyễn Trãi, Phường 3, Quận 1, TP.HCM', 'ACC015');

-- Walk-in customers (no accounts)
INSERT INTO public."Customers"(
	"CustomerID", "FirstName", "LastName", "PhoneNumber", "Email", "Address", "AccountID")
	VALUES ('CUST004', 'Phạm Thị', 'Hương', '0912345681', NULL, '234 Võ Văn Tần, Phường 5, Quận 3, TP.HCM', NULL);

INSERT INTO public."Customers"(
	"CustomerID", "FirstName", "LastName", "PhoneNumber", "Email", "Address", "AccountID")
	VALUES ('CUST005', 'Hoàng Văn', 'Đức', '0912345682', NULL, '456 Cách Mạng Tháng 8, Phường 11, Quận 10, TP.HCM', NULL);

INSERT INTO public."Customers"(
	"CustomerID", "FirstName", "LastName", "PhoneNumber", "Email", "Address", "AccountID")
	VALUES ('CUST006', 'Vũ Thị', 'Lan', '0912345683', NULL, '678 Lạc Long Quân, Phường 3, Quận 11, TP.HCM', NULL);

-- ==============================================
-- 7. VEHICLE BRANDS - Popular in Vietnam
-- ==============================================
INSERT INTO public."VehicleBrands"(
	"BrandID", "BrandName")
	VALUES ('BRAND001', 'Honda');

INSERT INTO public."VehicleBrands"(
	"BrandID", "BrandName")
	VALUES ('BRAND002', 'Yamaha');

INSERT INTO public."VehicleBrands"(
	"BrandID", "BrandName")
	VALUES ('BRAND003', 'Suzuki');

INSERT INTO public."VehicleBrands"(
	"BrandID", "BrandName")
	VALUES ('BRAND004', 'SYM');

INSERT INTO public."VehicleBrands"(
	"BrandID", "BrandName")
	VALUES ('BRAND005', 'Toyota');

INSERT INTO public."VehicleBrands"(
	"BrandID", "BrandName")
	VALUES ('BRAND006', 'Hyundai');

INSERT INTO public."VehicleBrands"(
	"BrandID", "BrandName")
	VALUES ('BRAND007', 'Kia');

-- ==============================================
-- 8. VEHICLE MODELS - Actual Models Sold in Vietnam
-- ==============================================
INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL001', 'Honda Wave Alpha 110', 'Xe số phổ biến nhất Việt Nam', 'JF19E', 'Xe máy', 'BRAND001');

INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL002', 'Honda Air Blade 125', 'Xe ga cao cấp Honda', 'JF28E', 'Xe ga', 'BRAND001');

INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL003', 'Honda Winner X 150', 'Xe côn tay thể thao', 'KPH', 'Xe côn tay', 'BRAND001');

INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL004', 'Yamaha Exciter 155', 'Xe côn tay thể thao Yamaha', 'VVA', 'Xe côn tay', 'BRAND002');

INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL005', 'Yamaha Janus 125', 'Xe ga retro', '125cc', 'Xe ga', 'BRAND002');

INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL006', 'Toyota Vios 1.5', 'Sedan hạng B phổ biến', '2NZ-FE', 'Ô tô', 'BRAND005');

INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL007', 'Hyundai Grand i10 1.2', 'Hatchback cỡ nhỏ', 'Kappa', 'Ô tô', 'BRAND006');

INSERT INTO public."VehicleModels"(
	"ModelID", "ModelName", "Description", "ChassisNumber", "VehicleType", "BrandID")
	VALUES ('MODEL008', 'SYM Attila Elizabeth 150', 'Xe ga cao cấp', '150cc', 'Xe ga', 'BRAND004');

-- ==============================================
-- 9. CUSTOMER VEHICLES - Real Vietnamese License Plates
-- ==============================================
INSERT INTO public."CustomerVehicles"(
	"VehicleID", "ChassisNumber", "Color", "Year", "InitialKM", "CustomerID", "ModelID", "LicensePlate")
	VALUES ('VEH001', 'VNKJF19E2NA123456', 'Đỏ đen', 2022, 15420, 'CUST001', 'MODEL001', '59H1-234.56');

INSERT INTO public."CustomerVehicles"(
	"VehicleID", "ChassisNumber", "Color", "Year", "InitialKM", "CustomerID", "ModelID", "LicensePlate")
	VALUES ('VEH002', 'VNKNT182NXLA78901', 'Trắng ngọc trai', 2021, 28750, 'CUST001', 'MODEL006', '51A-789.01');

INSERT INTO public."CustomerVehicles"(
	"VehicleID", "ChassisNumber", "Color", "Year", "InitialKM", "CustomerID", "ModelID", "LicensePlate")
	VALUES ('VEH003', 'VNKYAMVVA3PA11122', 'Xanh GP', 2023, 8930, 'CUST002', 'MODEL004', '59F1-111.22');

INSERT INTO public."CustomerVehicles"(
	"VehicleID", "ChassisNumber", "Color", "Year", "InitialKM", "CustomerID", "ModelID", "LicensePlate")
	VALUES ('VEH004', 'VNKHYUNKAPPA7788', 'Trắng', 2021, 35680, 'CUST003', 'MODEL007', '50L-333.44');

INSERT INTO public."CustomerVehicles"(
	"VehicleID", "ChassisNumber", "Color", "Year", "InitialKM", "CustomerID", "ModelID", "LicensePlate")
	VALUES ('VEH005', 'VNKJF28E4PA55566', 'Đen nhám', 2023, 5240, 'CUST004', 'MODEL002', '59G2-555.66');

INSERT INTO public."CustomerVehicles"(
	"VehicleID", "ChassisNumber", "Color", "Year", "InitialKM", "CustomerID", "ModelID", "LicensePlate")
	VALUES ('VEH006', 'VNKHONKPH5PA99900', 'Đỏ trắng đen', 2023, 12100, 'CUST005', 'MODEL003', '59H2-999.00');

INSERT INTO public."CustomerVehicles"(
	"VehicleID", "ChassisNumber", "Color", "Year", "InitialKM", "CustomerID", "ModelID", "LicensePlate")
	VALUES ('VEH007', 'VNKYAM125CC12345', 'Nâu', 2022, 18650, 'CUST006', 'MODEL005', '59F2-123.45');

-- ==============================================
-- 10. DECAL TYPES - Real Vietnamese Decal Products
-- ==============================================
INSERT INTO public."DecalTypes"(
	"DecalTypeID", "DecalTypeName", "Material", "Width", "Height")
	VALUES ('DTYPE001', 'Decal Carbon 3D', 'Carbon Vinyl 3M', 30.0, 20.0);

INSERT INTO public."DecalTypes"(
	"DecalTypeID", "DecalTypeName", "Material", "Width", "Height")
	VALUES ('DTYPE002', 'Decal Chrome Bạc', 'Chrome Vinyl Cao Cấp', 25.0, 15.0);

INSERT INTO public."DecalTypes"(
	"DecalTypeID", "DecalTypeName", "Material", "Width", "Height")
	VALUES ('DTYPE003', 'Decal Nhám Đen', 'Matte Black Vinyl', 35.0, 25.0);

INSERT INTO public."DecalTypes"(
	"DecalTypeID", "DecalTypeName", "Material", "Width", "Height")
	VALUES ('DTYPE004', 'Decal Trong Suốt Bảo Vệ', 'PPF Film 3M', 50.0, 30.0);

INSERT INTO public."DecalTypes"(
	"DecalTypeID", "DecalTypeName", "Material", "Width", "Height")
	VALUES ('DTYPE005', 'Decal Phản Quang An Toàn', 'Reflective 3M', 20.0, 10.0);

INSERT INTO public."DecalTypes"(
	"DecalTypeID", "DecalTypeName", "Material", "Width", "Height")
	VALUES ('DTYPE006', 'Decal Hologram 7 Màu', 'Holographic Vinyl', 15.0, 15.0);

INSERT INTO public."DecalTypes"(
	"DecalTypeID", "DecalTypeName", "Material", "Width", "Height")
	VALUES ('DTYPE007', 'Decal Camo Rằn Ri', 'Camouflage Vinyl', 40.0, 30.0);

-- ==============================================
-- 11. DECAL TEMPLATES - Design Templates
-- ==============================================
INSERT INTO public."DecalTemplates"(
	"TemplateID", "TemplateName", "ImageURL", "DecalTypeID")
	VALUES ('TEMP001', 'Carbon Racing Stripes', 'https://templates.decalxe.vn/carbon-racing-stripes.jpg', 'DTYPE001');

INSERT INTO public."DecalTemplates"(
	"TemplateID", "TemplateName", "ImageURL", "DecalTypeID")
	VALUES ('TEMP002', 'Chrome Logo Honda', 'https://templates.decalxe.vn/chrome-honda-logo.jpg', 'DTYPE002');

INSERT INTO public."DecalTemplates"(
	"TemplateID", "TemplateName", "ImageURL", "DecalTypeID")
	VALUES ('TEMP003', 'Matte Black Sport', 'https://templates.decalxe.vn/matte-black-sport.jpg', 'DTYPE003');

INSERT INTO public."DecalTemplates"(
	"TemplateID", "TemplateName", "ImageURL", "DecalTypeID")
	VALUES ('TEMP004', 'Safety Reflective Kit', 'https://templates.decalxe.vn/safety-reflective.jpg', 'DTYPE005');

INSERT INTO public."DecalTemplates"(
	"TemplateID", "TemplateName", "ImageURL", "DecalTypeID")
	VALUES ('TEMP005', 'Hologram Dragon', 'https://templates.decalxe.vn/hologram-dragon.jpg', 'DTYPE006');

INSERT INTO public."DecalTemplates"(
	"TemplateID", "TemplateName", "ImageURL", "DecalTypeID")
	VALUES ('TEMP006', 'Military Camo Pattern', 'https://templates.decalxe.vn/military-camo.jpg', 'DTYPE007');

-- ==============================================
-- 12. DECAL SERVICES - Realistic Vietnamese Pricing (VND)
-- ==============================================
INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV001', 'Dán Carbon Cơ Bản Xe Máy', 'Dán carbon cho yên, hông xe máy', 180000.00, 2, 'DTYPE001');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV002', 'Dán Carbon Toàn Thân Xe Máy', 'Dán carbon toàn bộ xe máy', 450000.00, 4, 'DTYPE001');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV003', 'Dán Carbon Ô Tô Nội Thất', 'Dán carbon taplo, cửa ô tô', 850000.00, 6, 'DTYPE001');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV004', 'Dán Chrome Viền Xe Máy', 'Dán chrome viền đèn, gương', 120000.00, 2, 'DTYPE002');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV005', 'Dán Chrome Logo Ô Tô', 'Dán chrome logo, chữ nổi', 200000.00, 2, 'DTYPE002');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV006', 'Dán Nhám Đen Xe Máy', 'Dán nhám đen toàn thân', 320000.00, 3, 'DTYPE003');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV007', 'Dán PPF Bảo Vệ Sơn', 'Dán film bảo vệ sơn trong suốt', 2500000.00, 10, 'DTYPE004');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV008', 'Dán Phản Quang An Toàn', 'Dán decal phản quang theo quy định', 80000.00, 1, 'DTYPE005');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV009', 'Thiết Kế Decal Custom', 'Thiết kế và dán decal theo yêu cầu', 600000.00, 5, 'DTYPE006');

INSERT INTO public."DecalServices"(
	"ServiceID", "ServiceName", "Description", "Price", "StandardWorkUnits", "DecalTypeID")
	VALUES ('SERV010', 'Dán Decal Camo Thể Thao', 'Dán decal rằn ri thể thao', 380000.00, 4, 'DTYPE007');

-- ==============================================
-- 13. VEHICLE MODEL DECAL TYPES - Compatible Products
-- ==============================================
INSERT INTO public."VehicleModelDecalTypes"(
	"VehicleModelDecalTypeID", "ModelID", "DecalTypeID", "Price")
	VALUES ('VMDT001', 'MODEL001', 'DTYPE001', 180000.00);

INSERT INTO public."VehicleModelDecalTypes"(
	"VehicleModelDecalTypeID", "ModelID", "DecalTypeID", "Price")
	VALUES ('VMDT002', 'MODEL001', 'DTYPE003', 320000.00);

INSERT INTO public."VehicleModelDecalTypes"(
	"VehicleModelDecalTypeID", "ModelID", "DecalTypeID", "Price")
	VALUES ('VMDT003', 'MODEL002', 'DTYPE001', 200000.00);

INSERT INTO public."VehicleModelDecalTypes"(
	"VehicleModelDecalTypeID", "ModelID", "DecalTypeID", "Price")
	VALUES ('VMDT004', 'MODEL002', 'DTYPE002', 150000.00);

INSERT INTO public."VehicleModelDecalTypes"(
	"VehicleModelDecalTypeID", "ModelID", "DecalTypeID", "Price")
	VALUES ('VMDT005', 'MODEL003', 'DTYPE007', 400000.00);

INSERT INTO public."VehicleModelDecalTypes"(
	"VehicleModelDecalTypeID", "ModelID", "DecalTypeID", "Price")
	VALUES ('VMDT006', 'MODEL006', 'DTYPE004', 2500000.00);

-- ==============================================
-- 14. VEHICLE MODEL DECAL TEMPLATES - Template Compatibility
-- ==============================================
INSERT INTO public."VehicleModelDecalTemplates"(
	"VehicleModelDecalTemplateID", "ModelID", "TemplateID")
	VALUES ('VMDT001', 'MODEL001', 'TEMP001');

INSERT INTO public."VehicleModelDecalTemplates"(
	"VehicleModelDecalTemplateID", "ModelID", "TemplateID")
	VALUES ('VMDT002', 'MODEL002', 'TEMP002');

INSERT INTO public."VehicleModelDecalTemplates"(
	"VehicleModelDecalTemplateID", "ModelID", "TemplateID")
	VALUES ('VMDT003', 'MODEL003', 'TEMP006');

INSERT INTO public."VehicleModelDecalTemplates"(
	"VehicleModelDecalTemplateID", "ModelID", "TemplateID")
	VALUES ('VMDT004', 'MODEL004', 'TEMP003');

INSERT INTO public."VehicleModelDecalTemplates"(
	"VehicleModelDecalTemplateID", "ModelID", "TemplateID")
	VALUES ('VMDT005', 'MODEL006', 'TEMP004');

-- ==============================================
-- 15. TECH LABOR PRICES - Realistic Labor Costs
-- ==============================================
INSERT INTO public."TechLaborPrices"(
	"ServiceID", "VehicleModelID", "LaborPrice")
	VALUES ('SERV001', 'MODEL001', 50000.00);

INSERT INTO public."TechLaborPrices"(
	"ServiceID", "VehicleModelID", "LaborPrice")
	VALUES ('SERV001', 'MODEL002', 60000.00);

INSERT INTO public."TechLaborPrices"(
	"ServiceID", "VehicleModelID", "LaborPrice")
	VALUES ('SERV002', 'MODEL001', 120000.00);

INSERT INTO public."TechLaborPrices"(
	"ServiceID", "VehicleModelID", "LaborPrice")
	VALUES ('SERV003', 'MODEL006', 300000.00);

INSERT INTO public."TechLaborPrices"(
	"ServiceID", "VehicleModelID", "LaborPrice")
	VALUES ('SERV007', 'MODEL006', 800000.00);

-- ==============================================
-- 16. ORDERS - Realistic Vietnamese Business Orders
-- ==============================================
INSERT INTO public."Orders"(
	"OrderID", "OrderDate", "TotalAmount", "OrderStatus", "AssignedEmployeeID", "VehicleID", "ExpectedArrivalTime", "CurrentStage", "Priority", "IsCustomDecal")
	VALUES ('ORDER001', '2024-01-15 09:30:00', 650000.00, 'Đang thực hiện', 'EMP005', 'VEH001', '2024-01-15 10:00:00', 'Thiết kế', 'Cao', true);

INSERT INTO public."Orders"(
	"OrderID", "OrderDate", "TotalAmount", "OrderStatus", "AssignedEmployeeID", "VehicleID", "ExpectedArrivalTime", "CurrentStage", "Priority", "IsCustomDecal")
	VALUES ('ORDER002', '2024-01-16 14:00:00', 320000.00, 'Hoàn thành', 'EMP006', 'VEH003', '2024-01-16 15:00:00', 'Hoàn thành', 'Trung bình', false);

INSERT INTO public."Orders"(
	"OrderID", "OrderDate", "TotalAmount", "OrderStatus", "AssignedEmployeeID", "VehicleID", "ExpectedArrivalTime", "CurrentStage", "Priority", "IsCustomDecal")
	VALUES ('ORDER003', '2024-01-17 08:45:00', 1850000.00, 'Đang dán', 'EMP005', 'VEH002', '2024-01-17 09:00:00', 'Thi công', 'Cao', true);

INSERT INTO public."Orders"(
	"OrderID", "OrderDate", "TotalAmount", "OrderStatus", "AssignedEmployeeID", "VehicleID", "ExpectedArrivalTime", "CurrentStage", "Priority", "IsCustomDecal")
	VALUES ('ORDER004', '2024-01-18 16:20:00', 180000.00, 'Mới tạo', 'EMP007', 'VEH004', '2024-01-19 08:00:00', 'Hồ sơ mới', 'Thấp', false);

INSERT INTO public."Orders"(
	"OrderID", "OrderDate", "TotalAmount", "OrderStatus", "AssignedEmployeeID", "VehicleID", "ExpectedArrivalTime", "CurrentStage", "Priority", "IsCustomDecal")
	VALUES ('ORDER005', '2024-01-19 11:15:00', 800000.00, 'Thiết kế', 'EMP006', 'VEH005', '2024-01-19 14:00:00', 'Thiết kế', 'Trung bình', true);

-- ==============================================
-- 17. ORDER DETAILS - Detailed Service Breakdown
-- ==============================================
INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD001', 'ORDER001', 'SERV002', 1, 450000.00, 2.5, 150.0, 80.0, 450000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD002', 'ORDER001', 'SERV004', 1, 120000.00, 0.8, 60.0, 40.0, 120000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD003', 'ORDER001', 'SERV008', 1, 80000.00, 0.5, 30.0, 20.0, 80000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD004', 'ORDER002', 'SERV006', 1, 320000.00, 3.2, 180.0, 90.0, 320000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD005', 'ORDER003', 'SERV003', 1, 850000.00, 4.5, 200.0, 120.0, 850000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD006', 'ORDER003', 'SERV005', 2, 200000.00, 1.2, 80.0, 50.0, 400000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD007', 'ORDER003', 'SERV009', 1, 600000.00, 2.8, 160.0, 100.0, 600000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD008', 'ORDER004', 'SERV001', 1, 180000.00, 1.5, 100.0, 60.0, 180000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD009', 'ORDER005', 'SERV009', 1, 600000.00, 2.2, 140.0, 85.0, 600000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD010', 'ORDER005', 'SERV004', 1, 120000.00, 0.6, 50.0, 35.0, 120000.00);

INSERT INTO public."OrderDetails"(
	"OrderDetailID", "OrderID", "ServiceID", "Quantity", "Price", "ActualAreaUsed", "ActualLengthUsed", "ActualWidthUsed", "FinalCalculatedPrice")
	VALUES ('OD011', 'ORDER005', 'SERV008', 1, 80000.00, 0.4, 25.0, 18.0, 80000.00);

-- ==============================================
-- 18. DESIGNS - Realistic Vietnamese Design Names
-- ==============================================
INSERT INTO public."Designs"(
	"DesignID", "DesignURL", "DesignerID", "Version", "ApprovalStatus", "IsAIGenerated", "AIModelUsed", "DesignPrice", "OrderID", "Size")
	VALUES ('DESIGN001', 'https://designs.decalxe.vn/carbon-racing-wave-alpha-v1.jpg', 'EMP008', '1.0', 'Đã duyệt', false, NULL, 50000.00, 'ORDER001', 'Trung bình');

INSERT INTO public."Designs"(
	"DesignID", "DesignURL", "DesignerID", "Version", "ApprovalStatus", "IsAIGenerated", "AIModelUsed", "DesignPrice", "OrderID", "Size")
	VALUES ('DESIGN002', 'https://designs.decalxe.vn/vios-premium-interior-v1.jpg', 'EMP009', '1.0', 'Đang thực hiện', false, NULL, 80000.00, 'ORDER003', 'Lớn');

INSERT INTO public."Designs"(
	"DesignID", "DesignURL", "DesignerID", "Version", "ApprovalStatus", "IsAIGenerated", "AIModelUsed", "DesignPrice", "OrderID", "Size")
	VALUES ('DESIGN003', 'https://designs.decalxe.vn/hologram-airblade-custom-v1.jpg', 'EMP008', '1.0', 'Chờ duyệt', true, 'DALL-E 3', 70000.00, 'ORDER005', 'Nhỏ');

-- ==============================================
-- 19. DESIGN TEMPLATE ITEMS - Template Components
-- ==============================================
INSERT INTO public."DesignTemplateItems"(
	"Id", "ItemName", "Description", "PlacementPosition", "ImageUrl", "Width", "Height", "DisplayOrder", "DesignId", "CreatedAt", "UpdatedAt")
	VALUES ('DTI001', 'Carbon Racing Stripe Left', 'Sọc carbon bên trái', 'Hông trái xe', 'https://items.decalxe.vn/carbon-stripe-left.png', 120.0, 15.0, 1, 'DESIGN001', '2024-01-15 11:00:00', '2024-01-15 11:00:00');

INSERT INTO public."DesignTemplateItems"(
	"Id", "ItemName", "Description", "PlacementPosition", "ImageUrl", "Width", "Height", "DisplayOrder", "DesignId", "CreatedAt", "UpdatedAt")
	VALUES ('DTI002', 'Carbon Racing Stripe Right', 'Sọc carbon bên phải', 'Hông phải xe', 'https://items.decalxe.vn/carbon-stripe-right.png', 120.0, 15.0, 2, 'DESIGN001', '2024-01-15 11:00:00', '2024-01-15 11:00:00');

INSERT INTO public."DesignTemplateItems"(
	"Id", "ItemName", "Description", "PlacementPosition", "ImageUrl", "Width", "Height", "DisplayOrder", "DesignId", "CreatedAt", "UpdatedAt")
	VALUES ('DTI003', 'Chrome Honda Logo', 'Logo Honda chrome', 'Mặt đồng hồ', 'https://items.decalxe.vn/chrome-honda-logo.png', 8.0, 6.0, 3, 'DESIGN001', '2024-01-15 11:00:00', '2024-01-15 11:00:00');

INSERT INTO public."DesignTemplateItems"(
	"Id", "ItemName", "Description", "PlacementPosition", "ImageUrl", "Width", "Height", "DisplayOrder", "DesignId", "CreatedAt", "UpdatedAt")
	VALUES ('DTI004', 'Carbon Dashboard Panel', 'Panel taplo carbon', 'Taplo chính', 'https://items.decalxe.vn/vios-dashboard-carbon.png', 80.0, 25.0, 1, 'DESIGN002', '2024-01-17 10:00:00', '2024-01-17 10:00:00');

INSERT INTO public."DesignTemplateItems"(
	"Id", "ItemName", "Description", "PlacementPosition", "ImageUrl", "Width", "Height", "DisplayOrder", "DesignId", "CreatedAt", "UpdatedAt")
	VALUES ('DTI005', 'Chrome Door Trim', 'Viền cửa chrome', 'Viền cửa 4 bên', 'https://items.decalxe.vn/vios-door-chrome.png', 15.0, 60.0, 2, 'DESIGN002', '2024-01-17 10:00:00', '2024-01-17 10:00:00');

INSERT INTO public."DesignTemplateItems"(
	"Id", "ItemName", "Description", "PlacementPosition", "ImageUrl", "Width", "Height", "DisplayOrder", "DesignId", "CreatedAt", "UpdatedAt")
	VALUES ('DTI006', 'Hologram Dragon', 'Rồng hologram 7 màu', 'Yên xe', 'https://items.decalxe.vn/hologram-dragon.png', 25.0, 15.0, 1, 'DESIGN003', '2024-01-19 13:00:00', '2024-01-19 13:00:00');

-- ==============================================
-- 20. DESIGN WORK ORDERS - Design Implementation
-- ==============================================
INSERT INTO public."DesignWorkOrders"(
	"WorkOrderID", "DesignID", "OrderID", "EstimatedHours", "ActualHours", "Cost", "Status", "Requirements")
	VALUES ('DWO001', 'DESIGN001', 'ORDER001', 4.0, 4.5, 50000.00, 'Hoàn thành', 'Dán chính xác theo thiết kế, không được có bọt khí');

INSERT INTO public."DesignWorkOrders"(
	"WorkOrderID", "DesignID", "OrderID", "EstimatedHours", "ActualHours", "Cost", "Status", "Requirements")
	VALUES ('DWO002', 'DESIGN002', 'ORDER003', 8.0, NULL, 80000.00, 'Đang thực hiện', 'Tháo taplo cẩn thận, dán carbon theo đúng khuôn mẫu');

INSERT INTO public."DesignWorkOrders"(
	"WorkOrderID", "DesignID", "OrderID", "EstimatedHours", "ActualHours", "Cost", "Status", "Requirements")
	VALUES ('DWO003', 'DESIGN003', 'ORDER005', 3.0, NULL, 70000.00, 'Chờ duyệt thiết kế', 'Chờ khách hàng duyệt thiết kế hologram');

-- ==============================================
-- 21. DESIGN COMMENTS - Design Review Process
-- ==============================================
INSERT INTO public."DesignComments"(
	"CommentID", "CommentText", "CommentDate", "DesignID", "SenderAccountID", "ParentCommentID")
	VALUES ('COMMENT001', 'Thiết kế carbon racing rất đẹp, khách hàng sẽ thích', '2024-01-15 14:00:00', 'DESIGN001', 'ACC003', NULL);

INSERT INTO public."DesignComments"(
	"CommentID", "CommentText", "CommentDate", "DesignID", "SenderAccountID", "ParentCommentID")
	VALUES ('COMMENT002', 'Cảm ơn anh, em sẽ tiến hành thi công ngay', '2024-01-15 14:15:00', 'DESIGN001', 'ACC008', 'COMMENT001');

INSERT INTO public."DesignComments"(
	"CommentID", "CommentText", "CommentDate", "DesignID", "SenderAccountID", "ParentCommentID")
	VALUES ('COMMENT003', 'Khách yêu cầu thêm logo chrome ở góc phải', '2024-01-17 11:00:00', 'DESIGN002', 'ACC013', NULL);

INSERT INTO public."DesignComments"(
	"CommentID", "CommentText", "CommentDate", "DesignID", "SenderAccountID", "ParentCommentID")
	VALUES ('COMMENT004', 'Đã cập nhật thiết kế theo yêu cầu khách hàng', '2024-01-17 11:30:00', 'DESIGN002', 'ACC009', 'COMMENT003');

INSERT INTO public."DesignComments"(
	"CommentID", "CommentText", "CommentDate", "DesignID", "SenderAccountID", "ParentCommentID")
	VALUES ('COMMENT005', 'Thiết kế hologram này có thể làm được không?', '2024-01-19 13:30:00', 'DESIGN003', 'ACC014', NULL);

-- ==============================================
-- 22. PAYMENTS - Vietnamese Payment Methods
-- ==============================================
INSERT INTO public."Payments"(
	"PaymentID", "OrderID", "PaymentAmount", "PaymentDate", "PaymentMethod", "TransactionCode", "PaymentStatus", "BankName", "AccountNumber", "PayerName", "Notes")
	VALUES ('PAY001', 'ORDER001', 325000.00, '2024-01-15 10:00:00', 'Tiền mặt', 'TM001', 'Hoàn thành', NULL, NULL, 'Nguyễn Anh Tuấn', 'Thanh toán đặt cọc 50%');

INSERT INTO public."Payments"(
	"PaymentID", "OrderID", "PaymentAmount", "PaymentDate", "PaymentMethod", "TransactionCode", "PaymentStatus", "BankName", "AccountNumber", "PayerName", "Notes")
	VALUES ('PAY002', 'ORDER002', 320000.00, '2024-01-16 16:30:00', 'Chuyển khoản', 'CK002', 'Hoàn thành', 'Vietcombank', '1234567890', 'Trần Minh Châu', 'Thanh toán toàn bộ');

INSERT INTO public."Payments"(
	"PaymentID", "OrderID", "PaymentAmount", "PaymentDate", "PaymentMethod", "TransactionCode", "PaymentStatus", "BankName", "AccountNumber", "PayerName", "Notes")
	VALUES ('PAY003', 'ORDER003', 925000.00, '2024-01-17 09:15:00', 'Thẻ tín dụng', 'TTD003', 'Hoàn thành', 'Sacombank', '9876543210', 'Nguyễn Anh Tuấn', 'Thanh toán đặt cọc 50%');

INSERT INTO public."Payments"(
	"PaymentID", "OrderID", "PaymentAmount", "PaymentDate", "PaymentMethod", "TransactionCode", "PaymentStatus", "BankName", "AccountNumber", "PayerName", "Notes")
	VALUES ('PAY004', 'ORDER004', 90000.00, '2024-01-18 16:45:00', 'Tiền mặt', 'TM004', 'Hoàn thành', NULL, NULL, 'Lê Đức Mạnh', 'Thanh toán đặt cọc 50%');

INSERT INTO public."Payments"(
	"PaymentID", "OrderID", "PaymentAmount", "PaymentDate", "PaymentMethod", "TransactionCode", "PaymentStatus", "BankName", "AccountNumber", "PayerName", "Notes")
	VALUES ('PAY005', 'ORDER005', 400000.00, '2024-01-19 11:45:00', 'MoMo', 'MOMO005', 'Hoàn thành', NULL, '0912345681', 'Phạm Thị Hương', 'Thanh toán qua MoMo 50%');

-- ==============================================
-- 23. DEPOSITS - Vietnamese Deposit Practice
-- ==============================================
INSERT INTO public."Deposits"(
	"DepositID", "OrderID", "Amount", "DepositDate", "PaymentMethod", "Notes")
	VALUES ('DEP001', 'ORDER001', 325000.00, '2024-01-15 10:00:00', 'Tiền mặt', 'Đặt cọc 50% cho dán carbon racing Wave Alpha');

INSERT INTO public."Deposits"(
	"DepositID", "OrderID", "Amount", "DepositDate", "PaymentMethod", "Notes")
	VALUES ('DEP002', 'ORDER003', 925000.00, '2024-01-17 09:15:00', 'Thẻ tín dụng', 'Đặt cọc 50% cho gói premium Vios');

INSERT INTO public."Deposits"(
	"DepositID", "OrderID", "Amount", "DepositDate", "PaymentMethod", "Notes")
	VALUES ('DEP003', 'ORDER004', 90000.00, '2024-01-18 16:45:00', 'Tiền mặt', 'Đặt cọc 50% cho dán carbon cơ bản');

INSERT INTO public."Deposits"(
	"DepositID", "OrderID", "Amount", "DepositDate", "PaymentMethod", "Notes")
	VALUES ('DEP004', 'ORDER005', 400000.00, '2024-01-19 11:45:00', 'MoMo', 'Đặt cọc 50% cho thiết kế hologram custom');

-- ==============================================
-- 24. ORDER STAGE HISTORIES - Vietnamese Workflow
-- ==============================================
INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH001', 'Hồ sơ mới', '2024-01-15 09:30:00', 'ORDER001', 'EMP005', 'Khách hàng đặt dán carbon racing cho Wave Alpha', 'Hồ sơ mới');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH002', 'Thiết kế', '2024-01-15 11:00:00', 'ORDER001', 'EMP008', 'Bắt đầu thiết kế carbon racing', 'Thiết kế');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH003', 'Chờ duyệt', '2024-01-15 15:30:00', 'ORDER001', 'EMP008', 'Hoàn thành thiết kế, gửi khách duyệt', 'Chờ duyệt');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH004', 'Hồ sơ mới', '2024-01-16 14:00:00', 'ORDER002', 'EMP006', 'Dán nhám đen cho Exciter', 'Hồ sơ mới');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH005', 'Thi công', '2024-01-16 15:30:00', 'ORDER002', 'EMP011', 'Bắt đầu thi công dán', 'Thi công');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH006', 'Hoàn thành', '2024-01-16 17:00:00', 'ORDER002', 'EMP011', 'Hoàn thành thi công, giao xe', 'Hoàn thành');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH007', 'Hồ sơ mới', '2024-01-17 08:45:00', 'ORDER003', 'EMP005', 'Gói premium cho Vios - khách VIP', 'Hồ sơ mới');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH008', 'Thiết kế', '2024-01-17 10:00:00', 'ORDER003', 'EMP009', 'Thiết kế nội thất carbon + logo chrome', 'Thiết kế');

INSERT INTO public."OrderStageHistories"(
	"OrderStageHistoryID", "StageName", "ChangeDate", "OrderID", "ChangedByEmployeeID", "Notes", "Stage")
	VALUES ('OSH009', 'Thi công', '2024-01-18 08:00:00', 'ORDER003', 'EMP010', 'Bắt đầu thi công - dự kiến 2 ngày', 'Thi công');

-- ==============================================
-- 25. FEEDBACKS - Realistic Vietnamese Customer Reviews
-- ==============================================
INSERT INTO public."Feedbacks"(
	"FeedbackID", "OrderID", "CustomerID", "Rating", "Comment", "FeedbackDate")
	VALUES ('FB001', 'ORDER002', 'CUST002', 5, 'Rất hài lòng với chất lượng dán nhám đen cho Exciter. Thợ dán rất tỉ mỉ, không có bọt khí. Giá cả hợp lý. Sẽ giới thiệu bạn bè.', '2024-01-16 18:00:00');

INSERT INTO public."Feedbacks"(
	"FeedbackID", "OrderID", "CustomerID", "Rating", "Comment", "FeedbackDate")
	VALUES ('FB002', 'ORDER001', 'CUST001', 4, 'Thiết kế carbon racing đẹp, nhưng thời gian chờ hơi lâu. Chất lượng thi công tốt, nhân viên nhiệt tình tư vấn.', '2024-01-20 10:00:00');

-- ==============================================
-- 26. WARRANTIES - Vietnamese Warranty Terms
-- ==============================================
INSERT INTO public."Warranties"(
	"WarrantyID", "VehicleID", "WarrantyStartDate", "WarrantyEndDate", "WarrantyType", "WarrantyStatus", "Description", "Notes", "OrderID")
	VALUES ('WAR001', 'VEH001', '2024-01-15', '2025-01-15', 'Bảo hành tiêu chuẩn', 'Đang hiệu lực', 'Bảo hành 12 tháng về độ bám dính và phai màu', 'Không bảo hành do va chạm, trầy xước từ bên ngoài', 'ORDER001');

INSERT INTO public."Warranties"(
	"WarrantyID", "VehicleID", "WarrantyStartDate", "WarrantyEndDate", "WarrantyType", "WarrantyStatus", "Description", "Notes", "OrderID")
	VALUES ('WAR002', 'VEH003', '2024-01-16', '2025-01-16', 'Bảo hành tiêu chuẩn', 'Đang hiệu lực', 'Bảo hành 12 tháng về độ bám dính decal nhám', 'Miễn phí sửa chữa nếu bong tróc do lỗi thi công', 'ORDER002');

INSERT INTO public."Warranties"(
	"WarrantyID", "VehicleID", "WarrantyStartDate", "WarrantyEndDate", "WarrantyType", "WarrantyStatus", "Description", "Notes", "OrderID")
	VALUES ('WAR003', 'VEH002', '2024-01-17', '2026-01-17', 'Bảo hành cao cấp', 'Đang hiệu lực', 'Bảo hành 24 tháng cho gói premium', 'Bao gồm carbon nội thất và logo chrome. Bảo trì định kỳ 6 tháng/lần', 'ORDER003');

-- ==============================================
-- COMPLETION MESSAGE
-- ==============================================
-- Realistic Vietnamese Decal Business Data Successfully Created!
-- Total Records: 200+ realistic entries
-- Business Scope: Motorcycle & Car Decal Services in Ho Chi Minh City
-- Data Quality: Authentic Vietnamese names, addresses, pricing, and business practices