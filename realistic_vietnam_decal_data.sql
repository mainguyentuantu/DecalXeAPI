-- REALISTIC VIETNAMESE DECAL BUSINESS DATA
-- DecalXe - Dán Decal Xe Máy & Ô Tô
-- Realistic pricing in Vietnamese Dong (VND)
-- Authentic Vietnamese names, addresses, and business scenarios

-- ==============================================
-- 1. ROLES - Vietnamese Business Hierarchy
-- ==============================================
INSERT INTO Roles (RoleID, RoleName) VALUES 
('ADMIN', 'Quản Trị Viên'),
('MANAGER', 'Quản Lý'),
('SALES', 'Nhân Viên Bán Hàng'),
('DESIGNER', 'Thiết Kế Viên'),
('TECHNICIAN', 'Thợ Dán Decal'),
('CUSTOMER', 'Khách Hàng');

-- ==============================================
-- 2. STORES - Real Vietnamese Locations
-- ==============================================
INSERT INTO Stores (StoreID, StoreName, Address, PhoneNumber, Email) VALUES 
('STORE001', 'DecalXe Quận 1', '245 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM', '0283822456', 'q1@decalxe.vn'),
('STORE002', 'DecalXe Gò Vấp', '1234 Quang Trung, Phường 8, Gò Vấp, TP.HCM', '0283655789', 'govap@decalxe.vn'),
('STORE003', 'DecalXe Bình Thạnh', '567 Xô Viết Nghệ Tĩnh, Phường 25, Bình Thạnh, TP.HCM', '0283456123', 'binhthnh@decalxe.vn');

-- ==============================================
-- 3. ACCOUNTS - Real Vietnamese Usernames
-- ==============================================
INSERT INTO Accounts (AccountID, Username, Email, PasswordHash, IsActive, RoleID) VALUES 
-- Admin accounts
('ACC001', 'admin.minh', 'minh.admin@decalxe.vn', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/pxSinIu', 1, 'ADMIN'),
('ACC002', 'admin.linh', 'linh.admin@decalxe.vn', '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 'ADMIN'),
-- Manager accounts  
('ACC003', 'ql.duc', 'duc.manager@decalxe.vn', '$2b$12$VEjyQcJ9UuWMhndMsAjgNu3DqRyKVzXqHpJ8VBjjLVR.cvLhiKkZi', 1, 'MANAGER'),
('ACC004', 'ql.thuy', 'thuy.manager@decalxe.vn', '$2b$12$NjXXh9bfI6AtDH5tfFHqQe6sqQgdXbZzGrLqr8H8d1HiOPGgBuHCi', 1, 'MANAGER'),
-- Sales accounts
('ACC005', 'nv.hung', 'hung.sales@decalxe.vn', '$2b$12$5dpvNgVczsTKK6YAbFRLJ.ogJpBdaHnH7wpgqjRt4jFjdAHBxSSK6', 1, 'SALES'),
('ACC006', 'nv.mai', 'mai.sales@decalxe.vn', '$2b$12$fCOHChr9IJhVqqVqVq0VNuJ/.ROCEeJyHFQ2/H5rFjlbAKM8Nmkhm', 1, 'SALES'),
('ACC007', 'nv.nam', 'nam.sales@decalxe.vn', '$2b$12$oRLNHxTb0hcHbXWo7qhW.eRBhTpGlL0vxb9gHi9Ck4SA.aMqHl0ym', 1, 'SALES'),
-- Designer accounts
('ACC008', 'tk.phuong', 'phuong.design@decalxe.vn', '$2b$12$6BKw3TpzJ9CoKWYSTAOSUehhT2lN9pG7BQRjWmBn8ghqwFGfAzlE6', 1, 'DESIGNER'),
('ACC009', 'tk.tuan', 'tuan.design@decalxe.vn', '$2b$12$6BKw3TpzJ9CoKWYSTAOSUehhT2lN9pG7BQRjWmBn8ghqwFGfAzlE6', 1, 'DESIGNER'),
-- Technician accounts
('ACC010', 'tho.long', 'long.tech@decalxe.vn', '$2b$12$VQ9c7Hr7pehXyhQhd6FNxeOyHBNpXAT.jfxaJrcQaHHo1iWW5JWoO', 1, 'TECHNICIAN'),
('ACC011', 'tho.hai', 'hai.tech@decalxe.vn', '$2b$12$TwpA/3vnDp/DDOzAg5lW8ue8.6yNzh8B7cyNcGcMsCuuNuYF.lxjS', 1, 'TECHNICIAN'),
('ACC012', 'tho.son', 'son.tech@decalxe.vn', '$2b$12$oQv2LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/px', 1, 'TECHNICIAN'),
-- Customer accounts
('ACC013', 'kh.anhtuan', 'anhtuan89@gmail.com', '$2b$12$4f67O4SkYqjqT0DycwwuHeRr4uX2m8.0y4ksX1.JdGBFpVUjjK3C6', 1, 'CUSTOMER'),
('ACC014', 'kh.minhchau', 'minhchau.nguyen@yahoo.com', '$2b$12$jGAoqJkVhAUEeQIFKTlO8eWEk567O4SkYqjqT0DycwwuHeRr4uX2m', 1, 'CUSTOMER'),
('ACC015', 'kh.ducmanh', 'ducmanh1990@hotmail.com', '$2b$12$1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/pxSinIu4f67', 1, 'CUSTOMER');

-- ==============================================
-- 4. EMPLOYEES - Authentic Vietnamese Names
-- ==============================================
INSERT INTO Employees (EmployeeID, FirstName, LastName, PhoneNumber, Email, StoreID, AccountID) VALUES 
('EMP001', 'Nguyễn Văn', 'Minh', '0901234567', 'minh.admin@decalxe.vn', 'STORE001', 'ACC001'),
('EMP002', 'Trần Thị', 'Linh', '0901234568', 'linh.admin@decalxe.vn', 'STORE002', 'ACC002'),
('EMP003', 'Lê Thanh', 'Đức', '0901234569', 'duc.manager@decalxe.vn', 'STORE001', 'ACC003'),
('EMP004', 'Phạm Thúy', 'Thủy', '0901234570', 'thuy.manager@decalxe.vn', 'STORE002', 'ACC004'),
('EMP005', 'Hoàng Văn', 'Hùng', '0901234571', 'hung.sales@decalxe.vn', 'STORE001', 'ACC005'),
('EMP006', 'Võ Thị', 'Mai', '0901234572', 'mai.sales@decalxe.vn', 'STORE002', 'ACC006'),
('EMP007', 'Đặng Quốc', 'Nam', '0901234573', 'nam.sales@decalxe.vn', 'STORE003', 'ACC007'),
('EMP008', 'Bùi Thị', 'Phương', '0901234574', 'phuong.design@decalxe.vn', 'STORE001', 'ACC008'),
('EMP009', 'Đỗ Anh', 'Tuấn', '0901234575', 'tuan.design@decalxe.vn', 'STORE002', 'ACC009'),
('EMP010', 'Ngô Văn', 'Long', '0901234576', 'long.tech@decalxe.vn', 'STORE001', 'ACC010'),
('EMP011', 'Phan Văn', 'Hải', '0901234577', 'hai.tech@decalxe.vn', 'STORE002', 'ACC011'),
('EMP012', 'Vũ Đình', 'Sơn', '0901234578', 'son.tech@decalxe.vn', 'STORE003', 'ACC012');

-- ==============================================
-- 5. EMPLOYEE DETAILS - Realistic Specializations
-- ==============================================
-- Admin Details
INSERT INTO AdminDetails (AdminDetailID, EmployeeID, AdminLevel) VALUES 
('ADMIN001', 'EMP001', 'Quản Trị Hệ Thống'),
('ADMIN002', 'EMP002', 'Quản Trị Chi Nhánh');

-- Manager Details
INSERT INTO ManagerDetails (ManagerDetailID, EmployeeID, Department) VALUES 
('MGR001', 'EMP003', 'Vận Hành & Kỹ Thuật'),
('MGR002', 'EMP004', 'Kinh Doanh & Marketing');

-- Sales Person Details (Monthly targets in VND)
INSERT INTO SalesPersonDetails (SalesPersonDetailID, EmployeeID, SalesTarget) VALUES 
('SALES001', 'EMP005', 50000000.00),  -- 50 triệu VND/tháng
('SALES002', 'EMP006', 45000000.00),  -- 45 triệu VND/tháng  
('SALES003', 'EMP007', 40000000.00);  -- 40 triệu VND/tháng

-- Designer Details
INSERT INTO DesignerDetails (DesignerDetailID, EmployeeID, Specialization) VALUES 
('DESIGN001', 'EMP008', 'Thiết Kế Decal Xe Máy'),
('DESIGN002', 'EMP009', 'Thiết Kế Decal Ô Tô');

-- Technician Details
INSERT INTO TechnicianDetails (TechnicianDetailID, EmployeeID, CertificationLevel) VALUES 
('TECH001', 'EMP010', 'Thợ Trưởng - 8 năm kinh nghiệm'),
('TECH002', 'EMP011', 'Thợ Chính - 5 năm kinh nghiệm'),
('TECH003', 'EMP012', 'Thợ Phụ - 2 năm kinh nghiệm');

-- ==============================================
-- 6. CUSTOMERS - Real Vietnamese Customer Profiles
-- ==============================================
INSERT INTO Customers (CustomerID, FirstName, LastName, PhoneNumber, Email, Address, AccountID) VALUES 
('CUST001', 'Nguyễn Anh', 'Tuấn', '0912345678', 'anhtuan89@gmail.com', '123/45 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM', 'ACC013'),
('CUST002', 'Trần Minh', 'Châu', '0912345679', 'minhchau.nguyen@yahoo.com', '567 Trần Hưng Đạo, Phường 2, Quận 5, TP.HCM', 'ACC014'),
('CUST003', 'Lê Đức', 'Mạnh', '0912345680', 'ducmanh1990@hotmail.com', '89 Nguyễn Trãi, Phường 3, Quận 1, TP.HCM', 'ACC015'),
-- Walk-in customers (typical Vietnamese names)
('CUST004', 'Phạm Thị', 'Hương', '0912345681', NULL, '234 Võ Văn Tần, Phường 5, Quận 3, TP.HCM', NULL),
('CUST005', 'Hoàng Văn', 'Đức', '0912345682', NULL, '456 Cách Mạng Tháng 8, Phường 11, Quận 10, TP.HCM', NULL),
('CUST006', 'Vũ Thị', 'Lan', '0912345683', NULL, '678 Lạc Long Quân, Phường 3, Quận 11, TP.HCM', NULL),
('CUST007', 'Đặng Quốc', 'Bảo', '0912345684', NULL, '890 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM', NULL);

-- ==============================================
-- 7. VEHICLE BRANDS - Popular in Vietnam
-- ==============================================
INSERT INTO VehicleBrands (BrandID, BrandName) VALUES 
('BRAND001', 'Honda'),
('BRAND002', 'Yamaha'), 
('BRAND003', 'Suzuki'),
('BRAND004', 'SYM'),
('BRAND005', 'Piaggio'),
('BRAND006', 'Toyota'),
('BRAND007', 'Hyundai'),
('BRAND008', 'Kia'),
('BRAND009', 'Mazda'),
('BRAND010', 'Mitsubishi');

-- ==============================================
-- 8. VEHICLE MODELS - Actual Models Sold in Vietnam
-- ==============================================
INSERT INTO VehicleModels (ModelID, ModelName, Description, ChassisNumber, VehicleType, BrandID) VALUES 
-- Honda Motorcycles (most popular in Vietnam)
('MODEL001', 'Honda Wave Alpha 110', 'Xe số phổ biến nhất Việt Nam', 'JF19E', 'Xe máy', 'BRAND001'),
('MODEL002', 'Honda Air Blade 125', 'Xe ga cao cấp Honda', 'JF28E', 'Xe ga', 'BRAND001'),
('MODEL003', 'Honda Winner X 150', 'Xe côn tay thể thao', 'KPH', 'Xe côn tay', 'BRAND001'),
('MODEL004', 'Honda Vision 110', 'Xe ga phổ thông', 'JF19E', 'Xe ga', 'BRAND001'),
-- Yamaha Motorcycles
('MODEL005', 'Yamaha Exciter 155', 'Xe côn tay thể thao Yamaha', 'VVA', 'Xe côn tay', 'BRAND002'),
('MODEL006', 'Yamaha Janus 125', 'Xe ga retro', '125cc', 'Xe ga', 'BRAND002'),
('MODEL007', 'Yamaha Sirius 110', 'Xe số tiết kiệm', '110cc', 'Xe máy', 'BRAND002'),
-- Cars popular in Vietnam
('MODEL008', 'Toyota Vios 1.5', 'Sedan hạng B phổ biến', '2NZ-FE', 'Ô tô', 'BRAND006'),
('MODEL009', 'Hyundai Grand i10 1.2', 'Hatchback cỡ nhỏ', 'Kappa', 'Ô tô', 'BRAND007'),
('MODEL010', 'Honda City 1.5', 'Sedan Honda', 'L15B', 'Ô tô', 'BRAND001'),
-- Other popular models
('MODEL011', 'SYM Attila Elizabeth 150', 'Xe ga cao cấp', '150cc', 'Xe ga', 'BRAND004'),
('MODEL012', 'Suzuki Raider R150', 'Xe côn tay Suzuki', '150cc', 'Xe côn tay', 'BRAND003');

-- ==============================================
-- 9. CUSTOMER VEHICLES - Real Vietnamese License Plates
-- ==============================================
INSERT INTO CustomerVehicles (VehicleID, CustomerID, ModelID, LicensePlate, Color, Year, VIN) VALUES 
-- TP.HCM license plates (59, 50-59 series)
('VEH001', 'CUST001', 'MODEL001', '59H1-234.56', 'Đỏ đen', 2022, 'VNKJF19E2NA123456'),
('VEH002', 'CUST001', 'MODEL008', '51A-789.01', 'Trắng ngọc trai', 2021, 'VNKNT182NXLA78901'),
('VEH003', 'CUST002', 'MODEL005', '59F1-111.22', 'Xanh GP', 2023, 'VNKYAMVVA3PA11122'),
('VEH004', 'CUST003', 'MODEL010', '50L-333.44', 'Bạc', 2022, 'VNKHONDL15B33344'),
('VEH005', 'CUST004', 'MODEL002', '59G2-555.66', 'Đen nhám', 2023, 'VNKJF28E4PA55566'),
('VEH006', 'CUST005', 'MODEL009', '51B-777.88', 'Trắng', 2021, 'VNKHYUNKAPPA7788'),
('VEH007', 'CUST006', 'MODEL003', '59H2-999.00', 'Đỏ trắng đen', 2023, 'VNKHONKPH5PA99900'),
('VEH008', 'CUST007', 'MODEL006', '59F2-123.45', 'Nâu', 2022, 'VNKYAM125CC12345');

-- ==============================================
-- 10. DECAL TYPES - Real Vietnamese Decal Products
-- ==============================================
INSERT INTO DecalTypes (DecalTypeID, DecalTypeName, Material, Width, Height) VALUES 
('DTYPE001', 'Decal Carbon 3D', 'Carbon Vinyl 3M', 30.0, 20.0),
('DTYPE002', 'Decal Chrome Bạc', 'Chrome Vinyl Cao Cấp', 25.0, 15.0),
('DTYPE003', 'Decal Nhám Đen', 'Matte Black Vinyl', 35.0, 25.0),
('DTYPE004', 'Decal Trong Suốt Bảo Vệ', 'PPF Film 3M', 50.0, 30.0),
('DTYPE005', 'Decal Phản Quang An Toàn', 'Reflective 3M', 20.0, 10.0),
('DTYPE006', 'Decal Hologram 7 Màu', 'Holographic Vinyl', 15.0, 15.0),
('DTYPE007', 'Decal Camo Rằn Ri', 'Camouflage Vinyl', 40.0, 30.0),
('DTYPE008', 'Decal Glossy Bóng', 'Gloss Vinyl', 30.0, 20.0);

-- ==============================================
-- 11. DECAL SERVICES - Realistic Vietnamese Pricing (VND)
-- ==============================================
INSERT INTO DecalServices (ServiceID, ServiceName, Description, Price, StandardWorkUnits, DecalTypeID) VALUES 
-- Carbon decal services
('SERV001', 'Dán Carbon Cơ Bản Xe Máy', 'Dán carbon cho yên, hông xe máy', 180000.00, 2, 'DTYPE001'),
('SERV002', 'Dán Carbon Toàn Thân Xe Máy', 'Dán carbon toàn bộ xe máy', 450000.00, 4, 'DTYPE001'),
('SERV003', 'Dán Carbon Ô Tô Phần Nội Thất', 'Dán carbon taplo, cửa ô tô', 850000.00, 6, 'DTYPE001'),
-- Chrome services
('SERV004', 'Dán Chrome Viền Xe Máy', 'Dán chrome viền đèn, gương', 120000.00, 2, 'DTYPE002'),
('SERV005', 'Dán Chrome Logo Ô Tô', 'Dán chrome logo, chữ nổi', 200000.00, 2, 'DTYPE002'),
-- Matte black services  
('SERV006', 'Dán Nhám Đen Xe Máy', 'Dán nhám đen toàn thân', 320000.00, 3, 'DTYPE003'),
('SERV007', 'Dán Nhám Đen Ô Tô', 'Dán nhám đen nóc, gương ô tô', 1200000.00, 8, 'DTYPE003'),
-- Protection film
('SERV008', 'Dán PPF Bảo Vệ Sơn', 'Dán film bảo vệ sơn trong suốt', 2500000.00, 10, 'DTYPE004'),
-- Safety reflective
('SERV009', 'Dán Phản Quang An Toàn', 'Dán decal phản quang theo quy định', 80000.00, 1, 'DTYPE005'),
-- Custom designs
('SERV010', 'Thiết Kế Decal Theo Yêu Cầu', 'Thiết kế và dán decal custom', 600000.00, 5, 'DTYPE006'),
('SERV011', 'Dán Decal Camo Thể Thao', 'Dán decal rằn ri thể thao', 380000.00, 4, 'DTYPE007');

-- ==============================================
-- 12. VEHICLE MODEL DECAL TYPES - Compatible Products
-- ==============================================
INSERT INTO VehicleModelDecalTypes (VehicleModelDecalTypeID, ModelID, DecalTypeID, Price) VALUES 
-- Honda Wave Alpha compatible
('VMDT001', 'MODEL001', 'DTYPE001', 180000.00),
('VMDT002', 'MODEL001', 'DTYPE003', 320000.00),
('VMDT003', 'MODEL001', 'DTYPE005', 80000.00),
('VMDT004', 'MODEL001', 'DTYPE007', 380000.00),
-- Honda Air Blade compatible
('VMDT005', 'MODEL002', 'DTYPE001', 200000.00),
('VMDT006', 'MODEL002', 'DTYPE002', 150000.00),
('VMDT007', 'MODEL002', 'DTYPE006', 600000.00),
-- Winner X compatible
('VMDT008', 'MODEL003', 'DTYPE001', 220000.00),
('VMDT009', 'MODEL003', 'DTYPE007', 400000.00),
-- Car models compatible
('VMDT010', 'MODEL008', 'DTYPE001', 850000.00),
('VMDT011', 'MODEL008', 'DTYPE004', 2500000.00),
('VMDT012', 'MODEL009', 'DTYPE002', 200000.00),
('VMDT013', 'MODEL010', 'DTYPE003', 1200000.00);

-- ==============================================
-- 13. TECH LABOR PRICES - Realistic Labor Costs
-- ==============================================
INSERT INTO TechLaborPrices (ServiceID, VehicleModelID, LaborPrice) VALUES 
-- Motorcycle labor costs
('SERV001', 'MODEL001', 50000.00),   -- Wave Alpha basic
('SERV001', 'MODEL002', 60000.00),   -- Air Blade basic  
('SERV002', 'MODEL001', 120000.00),  -- Wave full carbon
('SERV002', 'MODEL003', 150000.00),  -- Winner X full carbon
('SERV006', 'MODEL005', 100000.00),  -- Exciter matte
-- Car labor costs (higher)
('SERV003', 'MODEL008', 300000.00),  -- Vios interior carbon
('SERV007', 'MODEL010', 400000.00),  -- City matte black
('SERV008', 'MODEL008', 800000.00),  -- Vios PPF
('SERV008', 'MODEL009', 600000.00);  -- Grand i10 PPF

-- ==============================================
-- 14. ORDERS - Realistic Vietnamese Business Orders
-- ==============================================
INSERT INTO Orders (OrderID, OrderDate, TotalAmount, OrderStatus, AssignedEmployeeID, VehicleID, ExpectedArrivalTime, CurrentStage, Priority, IsCustomDecal) VALUES 
('ORDER001', '2024-01-15 09:30:00', 650000.00, 'Đang thực hiện', 'EMP005', 'VEH001', '2024-01-15 10:00:00', 'Thiết kế', 'Cao', 1),
('ORDER002', '2024-01-16 14:00:00', 320000.00, 'Hoàn thành', 'EMP006', 'VEH003', '2024-01-16 15:00:00', 'Hoàn thành', 'Trung bình', 0),
('ORDER003', '2024-01-17 08:45:00', 1850000.00, 'Đang dán', 'EMP005', 'VEH002', '2024-01-17 09:00:00', 'Thi công', 'Cao', 1),
('ORDER004', '2024-01-18 16:20:00', 180000.00, 'Mới tạo', 'EMP007', 'VEH004', '2024-01-19 08:00:00', 'Hồ sơ mới', 'Thấp', 0),
('ORDER005', '2024-01-19 11:15:00', 800000.00, 'Thiết kế', 'EMP006', 'VEH005', '2024-01-19 14:00:00', 'Thiết kế', 'Trung bình', 1),
('ORDER006', '2024-01-20 13:30:00', 280000.00, 'Chờ duyệt', 'EMP007', 'VEH007', '2024-01-20 15:00:00', 'Chờ duyệt', 'Trung bình', 0),
('ORDER007', '2024-01-21 10:00:00', 3200000.00, 'Đang dán', 'EMP005', 'VEH008', '2024-01-21 11:00:00', 'Thi công', 'Rất cao', 1);

-- ==============================================
-- 15. ORDER DETAILS - Detailed Service Breakdown
-- ==============================================
INSERT INTO OrderDetails (OrderDetailID, OrderID, ServiceID, Quantity, UnitPrice, Subtotal) VALUES 
-- Order 1: Custom carbon + chrome for Wave Alpha
('OD001', 'ORDER001', 'SERV002', 1, 450000.00, 450000.00),
('OD002', 'ORDER001', 'SERV004', 1, 120000.00, 120000.00),
('OD003', 'ORDER001', 'SERV009', 1, 80000.00, 80000.00),
-- Order 2: Basic matte for Exciter  
('OD004', 'ORDER002', 'SERV006', 1, 320000.00, 320000.00),
-- Order 3: Premium car package for Vios
('OD005', 'ORDER003', 'SERV003', 1, 850000.00, 850000.00),
('OD006', 'ORDER003', 'SERV005', 2, 200000.00, 400000.00),
('OD007', 'ORDER003', 'SERV010', 1, 600000.00, 600000.00),
-- Order 4: Basic carbon for City
('OD008', 'ORDER004', 'SERV001', 1, 180000.00, 180000.00),
-- Order 5: Custom hologram for Air Blade
('OD009', 'ORDER005', 'SERV010', 1, 600000.00, 600000.00),
('OD010', 'ORDER005', 'SERV004', 1, 120000.00, 120000.00),
('OD011', 'ORDER005', 'SERV009', 1, 80000.00, 80000.00),
-- Order 6: Camo design for Winner X
('OD012', 'ORDER006', 'SERV011', 1, 380000.00, 380000.00),
-- Order 7: Full PPF protection for Janus
('OD013', 'ORDER007', 'SERV008', 1, 2500000.00, 2500000.00),
('OD014', 'ORDER007', 'SERV010', 1, 600000.00, 600000.00),
('OD015', 'ORDER007', 'SERV009', 1, 100000.00, 100000.00);

-- ==============================================
-- 16. DESIGNS - Realistic Vietnamese Design Names
-- ==============================================
INSERT INTO Designs (DesignID, OrderID, DesignerID, DesignName, DesignDescription, DesignStatus, CreatedDate, Size) VALUES 
('DESIGN001', 'ORDER001', 'EMP008', 'Carbon Racing Wave Alpha', 'Thiết kế carbon thể thao cho Wave Alpha với họa tiết racing', 'Đã duyệt', '2024-01-15 11:00:00', 'Trung bình'),
('DESIGN002', 'ORDER003', 'EMP009', 'Gói Nội Thất Vios Premium', 'Thiết kế carbon toàn bộ nội thất Vios kèm logo chrome', 'Đang thực hiện', '2024-01-17 10:00:00', 'Lớn'),
('DESIGN003', 'ORDER005', 'EMP008', 'Hologram Custom Air Blade', 'Thiết kế hologram 7 màu độc đáo cho Air Blade', 'Chờ duyệt', '2024-01-19 13:00:00', 'Nhỏ'),
('DESIGN004', 'ORDER007', 'EMP009', 'PPF + Custom Logo Janus', 'Film bảo vệ trong suốt kèm logo hologram custom', 'Đang thiết kế', '2024-01-21 11:30:00', 'Lớn');

-- ==============================================
-- 17. PAYMENTS - Vietnamese Payment Methods
-- ==============================================
INSERT INTO Payments (PaymentID, OrderID, PaymentDate, Amount, PaymentMethod, PaymentStatus, TransactionID) VALUES 
('PAY001', 'ORDER001', '2024-01-15 10:00:00', 325000.00, 'Tiền mặt', 'Hoàn thành', 'TM001'),
('PAY002', 'ORDER002', '2024-01-16 16:30:00', 320000.00, 'Chuyển khoản', 'Hoàn thành', 'CK002'),
('PAY003', 'ORDER003', '2024-01-17 09:15:00', 925000.00, 'Thẻ tín dụng', 'Hoàn thành', 'TTD003'),
('PAY004', 'ORDER004', '2024-01-18 16:45:00', 90000.00, 'Tiền mặt', 'Hoàn thành', 'TM004'),
('PAY005', 'ORDER005', '2024-01-19 11:45:00', 400000.00, 'MoMo', 'Hoàn thành', 'MOMO005'),
('PAY006', 'ORDER006', '2024-01-20 14:00:00', 140000.00, 'ZaloPay', 'Hoàn thành', 'ZALO006'),
('PAY007', 'ORDER007', '2024-01-21 10:30:00', 1600000.00, 'Chuyển khoản', 'Hoàn thành', 'CK007');

-- ==============================================
-- 18. DEPOSITS - Vietnamese Deposit Practice
-- ==============================================
INSERT INTO Deposits (DepositID, OrderID, DepositAmount, DepositDate, DepositStatus) VALUES 
('DEP001', 'ORDER001', 325000.00, '2024-01-15 10:00:00', 'Đã thanh toán'),
('DEP002', 'ORDER003', 925000.00, '2024-01-17 09:15:00', 'Đã thanh toán'),
('DEP003', 'ORDER004', 90000.00, '2024-01-18 16:45:00', 'Đã thanh toán'),
('DEP004', 'ORDER005', 400000.00, '2024-01-19 11:45:00', 'Đã thanh toán'),
('DEP005', 'ORDER006', 140000.00, '2024-01-20 14:00:00', 'Đã thanh toán'),
('DEP006', 'ORDER007', 1600000.00, '2024-01-21 10:30:00', 'Đã thanh toán');

-- ==============================================
-- 19. ORDER STAGE HISTORIES - Vietnamese Workflow
-- ==============================================
INSERT INTO OrderStageHistories (OrderStageHistoryID, OrderID, Stage, ChangedDate, ChangedByEmployeeID, Notes) VALUES 
-- Order 1 progression
('OSH001', 'ORDER001', 'Hồ sơ mới', '2024-01-15 09:30:00', 'EMP005', 'Khách hàng đặt dán carbon racing cho Wave Alpha'),
('OSH002', 'ORDER001', 'Thiết kế', '2024-01-15 11:00:00', 'EMP008', 'Bắt đầu thiết kế carbon racing'),
('OSH003', 'ORDER001', 'Chờ duyệt', '2024-01-15 15:30:00', 'EMP008', 'Hoàn thành thiết kế, gửi khách duyệt'),
('OSH004', 'ORDER001', 'Thiết kế', '2024-01-16 09:00:00', 'EMP008', 'Khách yêu cầu chỉnh sửa màu sắc'),
-- Order 2 (completed)
('OSH005', 'ORDER002', 'Hồ sơ mới', '2024-01-16 14:00:00', 'EMP006', 'Dán nhám đen cho Exciter'),
('OSH006', 'ORDER002', 'Thi công', '2024-01-16 15:30:00', 'EMP011', 'Bắt đầu thi công dán'),
('OSH007', 'ORDER002', 'Hoàn thành', '2024-01-16 17:00:00', 'EMP011', 'Hoàn thành thi công, giao xe'),
-- Order 3 progression  
('OSH008', 'ORDER003', 'Hồ sơ mới', '2024-01-17 08:45:00', 'EMP005', 'Gói premium cho Vios - khách VIP'),
('OSH009', 'ORDER003', 'Thiết kế', '2024-01-17 10:00:00', 'EMP009', 'Thiết kế nội thất carbon + logo chrome'),
('OSH010', 'ORDER003', 'Thi công', '2024-01-18 08:00:00', 'EMP010', 'Bắt đầu thi công - dự kiến 2 ngày');

-- ==============================================
-- 20. FEEDBACKS - Realistic Vietnamese Customer Reviews
-- ==============================================
INSERT INTO Feedbacks (FeedbackID, OrderID, CustomerID, Rating, Comments, FeedbackDate) VALUES 
('FB001', 'ORDER002', 'CUST002', 5, 'Rất hài lòng với chất lượng dán nhám đen cho Exciter. Thợ dán rất tỉ mỉ, không có bọt khí. Giá cả hợp lý. Sẽ giới thiệu bạn bè.', '2024-01-16 18:00:00'),
('FB002', 'ORDER001', 'CUST001', 4, 'Thiết kế carbon racing đẹp, nhưng thời gian chờ hơi lâu. Chất lượng thi công tốt, nhân viên nhiệt tình tư vấn.', '2024-01-20 10:00:00');

-- ==============================================
-- 21. WARRANTIES - Vietnamese Warranty Terms
-- ==============================================
INSERT INTO Warranties (WarrantyID, OrderID, WarrantyStartDate, WarrantyEndDate, WarrantyType, WarrantyStatus, Terms) VALUES 
('WAR001', 'ORDER001', '2024-01-15', '2025-01-15', 'Bảo hành tiêu chuẩn', 'Đang hiệu lực', 'Bảo hành 12 tháng về độ bám dính và phai màu. Không bảo hành do va chạm, trầy xước từ bên ngoài.'),
('WAR002', 'ORDER002', '2024-01-16', '2025-01-16', 'Bảo hành tiêu chuẩn', 'Đang hiệu lực', 'Bảo hành 12 tháng về độ bám dính decal nhám. Miễn phí sửa chữa nếu bong tróc do lỗi thi công.'),
('WAR003', 'ORDER003', '2024-01-17', '2026-01-17', 'Bảo hành cao cấp', 'Đang hiệu lực', 'Bảo hành 24 tháng cho gói premium. Bao gồm carbon nội thất và logo chrome. Bảo trì định kỳ 6 tháng/lần.');

-- ==============================================
-- 22. PROMOTIONS - Vietnamese Seasonal Promotions
-- ==============================================
INSERT INTO Promotions (PromotionID, PromotionName, Description, DiscountPercentage, StartDate, EndDate, IsActive) VALUES 
('PROMO001', 'Khuyến Mãi Tết Nguyên Đán', 'Giảm 20% tất cả dịch vụ dán carbon dịp Tết', 20.00, '2024-01-01', '2024-02-15', 1),
('PROMO002', 'Combo Chrome + Carbon', 'Giảm 15% khi dán combo chrome và carbon', 15.00, '2024-01-15', '2024-03-15', 1),
('PROMO003', 'Ưu Đãi Sinh Viên', 'Giảm 10% cho sinh viên có thẻ học sinh, sinh viên', 10.00, '2024-01-01', '2024-12-31', 1),
('PROMO004', 'Khách Hàng Thân Thiết', 'Giảm 25% cho khách hàng từ lần thứ 3 trở lên', 25.00, '2024-01-01', '2024-12-31', 1),
('PROMO005', 'Dán PPF Cao Cấp', 'Giảm 30% dịch vụ dán PPF bảo vệ sơn', 30.00, '2024-02-01', '2024-04-30', 1);

-- ==============================================
-- ADDITIONAL REALISTIC DATA
-- ==============================================

-- More customer vehicles for variety
INSERT INTO CustomerVehicles (VehicleID, CustomerID, ModelID, LicensePlate, Color, Year, VIN) VALUES 
('VEH009', 'CUST002', 'MODEL007', '59H3-456.78', 'Xanh đen', 2022, 'VNKYAMSIRIUS45678'),
('VEH010', 'CUST003', 'MODEL011', '59G3-789.01', 'Trắng bạc', 2023, 'VNKSYMATTILA78901');

-- More realistic orders for business volume
INSERT INTO Orders (OrderID, OrderDate, TotalAmount, OrderStatus, AssignedEmployeeID, VehicleID, ExpectedArrivalTime, CurrentStage, Priority, IsCustomDecal) VALUES 
('ORDER008', '2024-01-22 09:00:00', 150000.00, 'Hoàn thành', 'EMP007', 'VEH009', '2024-01-22 10:00:00', 'Hoàn thành', 'Thấp', 0),
('ORDER009', '2024-01-22 15:30:00', 420000.00, 'Đang dán', 'EMP006', 'VEH010', '2024-01-22 16:00:00', 'Thi công', 'Trung bình', 0);

-- Corresponding order details
INSERT INTO OrderDetails (OrderDetailID, OrderID, ServiceID, Quantity, UnitPrice, Subtotal) VALUES 
('OD016', 'ORDER008', 'SERV009', 2, 80000.00, 160000.00),
('OD017', 'ORDER009', 'SERV006', 1, 320000.00, 320000.00),
('OD018', 'ORDER009', 'SERV009', 1, 80000.00, 80000.00);

-- ==============================================
-- VERIFICATION QUERIES - Business Intelligence
-- ==============================================
/*
-- Total revenue by month
SELECT MONTH(OrderDate) as Thang, SUM(TotalAmount) as DoanhThu 
FROM Orders 
WHERE YEAR(OrderDate) = 2024 
GROUP BY MONTH(OrderDate);

-- Most popular services
SELECT ds.ServiceName, COUNT(od.OrderDetailID) as SoLuongDat
FROM DecalServices ds
JOIN OrderDetails od ON ds.ServiceID = od.ServiceID
GROUP BY ds.ServiceID, ds.ServiceName
ORDER BY SoLuongDat DESC;

-- Customer satisfaction
SELECT AVG(Rating) as DiemTrungBinh, COUNT(*) as SoLuongDanhGia
FROM Feedbacks;

-- Employee performance
SELECT e.FirstName + ' ' + e.LastName as TenNhanVien, 
       COUNT(o.OrderID) as SoDonHang,
       SUM(o.TotalAmount) as TongDoanhThu
FROM Employees e
LEFT JOIN Orders o ON e.EmployeeID = o.AssignedEmployeeID
GROUP BY e.EmployeeID, e.FirstName, e.LastName;
*/