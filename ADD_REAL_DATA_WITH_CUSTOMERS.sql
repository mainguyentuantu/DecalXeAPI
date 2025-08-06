-- ==============================================
-- ADD REAL DATA FOR UPDATED BACKEND STRUCTURE
-- Includes CustomerID and Description in Orders
-- ==============================================

-- ==============================================
-- 1. CUSTOMERS - Real Vietnamese Customers
-- ==============================================
INSERT INTO public."Customers"(
    "CustomerID", "FirstName", "LastName", "PhoneNumber", "Email", "Address", "AccountID")
VALUES 
    ('CUST001', 'Nguyễn', 'Văn An', '0901234567', 'nguyenvanan@gmail.com', '123 Đường ABC, Quận 1, TP.HCM', NULL),
    ('CUST002', 'Trần', 'Thị Bình', '0912345678', 'tranthibinh@yahoo.com', '456 Đường XYZ, Quận 3, TP.HCM', NULL),
    ('CUST003', 'Lê', 'Văn Cường', '0923456789', 'levancuong@gmail.com', '789 Đường DEF, Quận 5, TP.HCM', NULL),
    ('CUST004', 'Phạm', 'Thị Dung', '0934567890', 'phamthidung@gmail.com', '321 Đường GHI, Quận 7, TP.HCM', NULL),
    ('CUST005', 'Hoàng', 'Văn Em', '0945678901', 'hoangvanem@yahoo.com', '654 Đường JKL, Quận 10, TP.HCM', NULL),
    ('CUST006', 'Vũ', 'Thị Phương', '0956789012', 'vuthiphuong@gmail.com', '987 Đường MNO, Quận 11, TP.HCM', NULL),
    ('CUST007', 'Đặng', 'Văn Giang', '0967890123', 'dangvangiang@gmail.com', '147 Đường PQR, Quận Bình Thạnh, TP.HCM', NULL),
    ('CUST008', 'Bùi', 'Thị Hoa', '0978901234', 'buithihoa@yahoo.com', '258 Đường STU, Quận Gò Vấp, TP.HCM', NULL),
    ('CUST009', 'Ngô', 'Văn Ích', '0989012345', 'ngovanich@gmail.com', '369 Đường VWX, Quận Tân Bình, TP.HCM', NULL),
    ('CUST010', 'Đỗ', 'Thị Kim', '0990123456', 'dothikim@gmail.com', '741 Đường YZA, Quận Phú Nhuận, TP.HCM', NULL);

-- ==============================================
-- 2. CUSTOMER VEHICLES - Real Vietnamese Vehicles
-- ==============================================
INSERT INTO public."CustomerVehicles"(
    "VehicleID", "ChassisNumber", "LicensePlate", "Color", "Year", "InitialKM", "CustomerID", "ModelID")
VALUES 
    ('VEH001', 'VNKJF19E2NA123456', '59H1-234.56', 'Đỏ đen', 2022, 15420, 'CUST001', 'MODEL001'),
    ('VEH002', 'VNKJF19E2NA123457', '59H1-345.67', 'Xanh dương', 2021, 23450, 'CUST002', 'MODEL002'),
    ('VEH003', 'VNKJF19E2NA123458', '59H1-456.78', 'Trắng', 2023, 8900, 'CUST003', 'MODEL003'),
    ('VEH004', 'VNKJF19E2NA123459', '59H1-567.89', 'Đen', 2020, 45670, 'CUST004', 'MODEL004'),
    ('VEH005', 'VNKJF19E2NA123460', '59H1-678.90', 'Xám', 2022, 12340, 'CUST005', 'MODEL005'),
    ('VEH006', 'VNKJF19E2NA123461', '59H1-789.01', 'Đỏ', 2021, 34560, 'CUST006', 'MODEL001'),
    ('VEH007', 'VNKJF19E2NA123462', '59H1-890.12', 'Xanh lá', 2023, 5670, 'CUST007', 'MODEL002'),
    ('VEH008', 'VNKJF19E2NA123463', '59H1-901.23', 'Vàng', 2020, 67890, 'CUST008', 'MODEL003'),
    ('VEH009', 'VNKJF19E2NA123464', '59H1-012.34', 'Cam', 2022, 23450, 'CUST009', 'MODEL004'),
    ('VEH010', 'VNKJF19E2NA123465', '59H1-123.45', 'Tím', 2021, 45670, 'CUST010', 'MODEL005');

-- ==============================================
-- 3. ORDERS WITH CUSTOMERID AND DESCRIPTION
-- ==============================================
INSERT INTO public."Orders"(
    "OrderID", "OrderDate", "TotalAmount", "OrderStatus", "CustomerID", "AssignedEmployeeID", 
    "VehicleID", "ExpectedArrivalTime", "CurrentStage", "Priority", "IsCustomDecal", "Description")
VALUES 
    ('ORD001', '2025-01-15 09:30:00', 2500000, 'Processing', 'CUST001', 'EMP010', 
     'VEH001', '2025-01-20 14:00:00', 'Design Review', 'High', true, 
     'Dán decal full xe Honda Wave Alpha 110, màu đỏ đen, thiết kế thể thao với logo đội bóng yêu thích'),

    ('ORD002', '2025-01-16 10:15:00', 1800000, 'New', 'CUST002', 'EMP011', 
     'VEH002', '2025-01-22 15:30:00', 'New Profile', 'Medium', false, 
     'Dán decal một phần xe Yamaha Exciter 150, màu xanh dương, thiết kế đơn giản'),

    ('ORD003', '2025-01-17 11:00:00', 3200000, 'Completed', 'CUST003', 'EMP010', 
     'VEH003', '2025-01-25 09:00:00', 'Completed', 'High', true, 
     'Dán decal full xe Honda Vision, màu trắng, thiết kế phong cách Nhật Bản với hoa anh đào'),

    ('ORD004', '2025-01-18 14:20:00', 1500000, 'Pending', 'CUST004', 'EMP011', 
     'VEH004', '2025-01-28 16:00:00', 'Design Review', 'Low', false, 
     'Dán decal logo công ty trên xe Honda Wave RSX, màu đen'),

    ('ORD005', '2025-01-19 08:45:00', 2800000, 'Processing', 'CUST005', 'EMP010', 
     'VEH005', '2025-01-30 10:30:00', 'Production', 'High', true, 
     'Dán decal full xe Yamaha Grande, màu xám, thiết kế phong cách Mỹ với cờ sao'),

    ('ORD006', '2025-01-20 13:10:00', 2000000, 'New', 'CUST006', 'EMP011', 
     'VEH006', '2025-02-02 14:00:00', 'New Profile', 'Medium', false, 
     'Dán decal một phần xe Honda Wave Alpha 110, màu đỏ, thiết kế đơn giản'),

    ('ORD007', '2025-01-21 09:30:00', 3500000, 'Processing', 'CUST007', 'EMP010', 
     'VEH007', '2025-02-05 11:00:00', 'Production', 'High', true, 
     'Dán decal full xe Yamaha Exciter 150, màu xanh lá, thiết kế phong cách Đức với logo BMW'),

    ('ORD008', '2025-01-22 16:45:00', 1200000, 'Pending', 'CUST008', 'EMP011', 
     'VEH008', '2025-02-08 15:30:00', 'Design Review', 'Low', false, 
     'Dán decal logo đội bóng trên xe Honda Vision, màu vàng'),

    ('ORD009', '2025-01-23 10:20:00', 3000000, 'New', 'CUST009', 'EMP010', 
     'VEH009', '2025-02-10 09:00:00', 'New Profile', 'High', true, 
     'Dán decal full xe Yamaha Grande, màu cam, thiết kế phong cách Ý với logo Ferrari'),

    ('ORD010', '2025-01-24 12:00:00', 2200000, 'Processing', 'CUST010', 'EMP011', 
     'VEH010', '2025-02-12 16:00:00', 'Production', 'Medium', false, 
     'Dán decal một phần xe Honda Wave RSX, màu tím, thiết kế đơn giản');

-- ==============================================
-- 4. ORDER STAGE HISTORIES
-- ==============================================
INSERT INTO public."OrderStageHistories"(
    "OrderStageHistoryID", "OrderID", "Stage", "ChangedDate", "ChangedByEmployeeID", "Notes")
VALUES 
    ('OSH001', 'ORD001', 'New Profile', '2025-01-15 09:30:00', 'EMP010', 'Đơn hàng được tạo'),
    ('OSH002', 'ORD001', 'Design Review', '2025-01-16 14:20:00', 'EMP008', 'Thiết kế đã được review'),
    ('OSH003', 'ORD001', 'Production', '2025-01-17 09:00:00', 'EMP010', 'Bắt đầu sản xuất'),
    ('OSH004', 'ORD001', 'Processing', '2025-01-18 15:30:00', 'EMP010', 'Đang xử lý'),

    ('OSH005', 'ORD002', 'New Profile', '2025-01-16 10:15:00', 'EMP011', 'Đơn hàng được tạo'),

    ('OSH006', 'ORD003', 'New Profile', '2025-01-17 11:00:00', 'EMP010', 'Đơn hàng được tạo'),
    ('OSH007', 'ORD003', 'Design Review', '2025-01-18 10:30:00', 'EMP008', 'Thiết kế đã được review'),
    ('OSH008', 'ORD003', 'Production', '2025-01-19 08:00:00', 'EMP010', 'Bắt đầu sản xuất'),
    ('OSH009', 'ORD003', 'Processing', '2025-01-20 14:00:00', 'EMP010', 'Đang xử lý'),
    ('OSH010', 'ORD003', 'Completed', '2025-01-25 09:00:00', 'EMP010', 'Hoàn thành'),

    ('OSH011', 'ORD004', 'New Profile', '2025-01-18 14:20:00', 'EMP011', 'Đơn hàng được tạo'),
    ('OSH012', 'ORD004', 'Design Review', '2025-01-19 16:00:00', 'EMP008', 'Thiết kế đã được review'),

    ('OSH013', 'ORD005', 'New Profile', '2025-01-19 08:45:00', 'EMP010', 'Đơn hàng được tạo'),
    ('OSH014', 'ORD005', 'Design Review', '2025-01-20 11:30:00', 'EMP008', 'Thiết kế đã được review'),
    ('OSH015', 'ORD005', 'Production', '2025-01-21 09:00:00', 'EMP010', 'Bắt đầu sản xuất'),
    ('OSH016', 'ORD005', 'Processing', '2025-01-22 15:00:00', 'EMP010', 'Đang xử lý'),

    ('OSH017', 'ORD006', 'New Profile', '2025-01-20 13:10:00', 'EMP011', 'Đơn hàng được tạo'),

    ('OSH018', 'ORD007', 'New Profile', '2025-01-21 09:30:00', 'EMP010', 'Đơn hàng được tạo'),
    ('OSH019', 'ORD007', 'Design Review', '2025-01-22 14:00:00', 'EMP008', 'Thiết kế đã được review'),
    ('OSH020', 'ORD007', 'Production', '2025-01-23 08:30:00', 'EMP010', 'Bắt đầu sản xuất'),
    ('OSH021', 'ORD007', 'Processing', '2025-01-24 16:00:00', 'EMP010', 'Đang xử lý'),

    ('OSH022', 'ORD008', 'New Profile', '2025-01-22 16:45:00', 'EMP011', 'Đơn hàng được tạo'),
    ('OSH023', 'ORD008', 'Design Review', '2025-01-23 10:00:00', 'EMP008', 'Thiết kế đã được review'),

    ('OSH024', 'ORD009', 'New Profile', '2025-01-23 10:20:00', 'EMP010', 'Đơn hàng được tạo'),

    ('OSH025', 'ORD010', 'New Profile', '2025-01-24 12:00:00', 'EMP011', 'Đơn hàng được tạo'),
    ('OSH026', 'ORD010', 'Design Review', '2025-01-25 09:30:00', 'EMP008', 'Thiết kế đã được review'),
    ('OSH027', 'ORD010', 'Production', '2025-01-26 08:00:00', 'EMP010', 'Bắt đầu sản xuất'),
    ('OSH028', 'ORD010', 'Processing', '2025-01-27 14:30:00', 'EMP010', 'Đang xử lý');

-- ==============================================
-- 5. ORDER DETAILS
-- ==============================================
INSERT INTO public."OrderDetails"(
    "OrderDetailID", "OrderID", "DecalServiceID", "Quantity", "UnitPrice", "TotalPrice", "Notes")
VALUES 
    ('OD001', 'ORD001', 'DS001', 1, 2500000, 2500000, 'Dán decal full xe'),
    ('OD002', 'ORD002', 'DS002', 1, 1800000, 1800000, 'Dán decal một phần'),
    ('OD003', 'ORD003', 'DS001', 1, 3200000, 3200000, 'Dán decal full xe'),
    ('OD004', 'ORD004', 'DS003', 1, 1500000, 1500000, 'Dán logo công ty'),
    ('OD005', 'ORD005', 'DS001', 1, 2800000, 2800000, 'Dán decal full xe'),
    ('OD006', 'ORD006', 'DS002', 1, 2000000, 2000000, 'Dán decal một phần'),
    ('OD007', 'ORD007', 'DS001', 1, 3500000, 3500000, 'Dán decal full xe'),
    ('OD008', 'ORD008', 'DS003', 1, 1200000, 1200000, 'Dán logo đội bóng'),
    ('OD009', 'ORD009', 'DS001', 1, 3000000, 3000000, 'Dán decal full xe'),
    ('OD010', 'ORD010', 'DS002', 1, 2200000, 2200000, 'Dán decal một phần');

-- ==============================================
-- 6. DESIGNS FOR CUSTOM ORDERS
-- ==============================================
INSERT INTO public."Designs"(
    "DesignID", "OrderID", "DesignName", "DesignDescription", "DesignStatus", "CreatedDate", "DesignerID")
VALUES 
    ('DES001', 'ORD001', 'Thiết kế thể thao Honda Wave', 'Decal full xe với logo đội bóng yêu thích', 'Approved', '2025-01-16 10:00:00', 'EMP008'),
    ('DES002', 'ORD003', 'Thiết kế phong cách Nhật Bản', 'Decal full xe với hoa anh đào', 'Approved', '2025-01-18 09:30:00', 'EMP008'),
    ('DES003', 'ORD005', 'Thiết kế phong cách Mỹ', 'Decal full xe với cờ sao', 'Approved', '2025-01-20 11:00:00', 'EMP008'),
    ('DES004', 'ORD007', 'Thiết kế phong cách Đức', 'Decal full xe với logo BMW', 'Approved', '2025-01-22 14:30:00', 'EMP008'),
    ('DES005', 'ORD009', 'Thiết kế phong cách Ý', 'Decal full xe với logo Ferrari', 'In Progress', '2025-01-23 16:00:00', 'EMP008');

-- ==============================================
-- 7. PAYMENTS
-- ==============================================
INSERT INTO public."Payments"(
    "PaymentID", "OrderID", "PaymentAmount", "PaymentMethod", "PaymentStatus", "PaymentDate", "Notes")
VALUES 
    ('PAY001', 'ORD001', 1250000, 'Cash', 'Completed', '2025-01-15 09:30:00', 'Đặt cọc 50%'),
    ('PAY002', 'ORD001', 1250000, 'Bank Transfer', 'Completed', '2025-01-25 14:00:00', 'Thanh toán nốt'),
    ('PAY003', 'ORD002', 1800000, 'Cash', 'Completed', '2025-01-16 10:15:00', 'Thanh toán toàn bộ'),
    ('PAY004', 'ORD003', 1600000, 'Cash', 'Completed', '2025-01-17 11:00:00', 'Đặt cọc 50%'),
    ('PAY005', 'ORD003', 1600000, 'Bank Transfer', 'Completed', '2025-01-25 09:00:00', 'Thanh toán nốt'),
    ('PAY006', 'ORD004', 1500000, 'Cash', 'Completed', '2025-01-18 14:20:00', 'Thanh toán toàn bộ'),
    ('PAY007', 'ORD005', 1400000, 'Cash', 'Completed', '2025-01-19 08:45:00', 'Đặt cọc 50%'),
    ('PAY008', 'ORD005', 1400000, 'Bank Transfer', 'Pending', NULL, 'Chờ thanh toán'),
    ('PAY009', 'ORD006', 2000000, 'Cash', 'Completed', '2025-01-20 13:10:00', 'Thanh toán toàn bộ'),
    ('PAY010', 'ORD007', 1750000, 'Cash', 'Completed', '2025-01-21 09:30:00', 'Đặt cọc 50%'),
    ('PAY011', 'ORD007', 1750000, 'Bank Transfer', 'Pending', NULL, 'Chờ thanh toán'),
    ('PAY012', 'ORD008', 1200000, 'Cash', 'Completed', '2025-01-22 16:45:00', 'Thanh toán toàn bộ'),
    ('PAY013', 'ORD009', 1500000, 'Cash', 'Completed', '2025-01-23 10:20:00', 'Đặt cọc 50%'),
    ('PAY014', 'ORD010', 1100000, 'Cash', 'Completed', '2025-01-24 12:00:00', 'Đặt cọc 50%'),
    ('PAY015', 'ORD010', 1100000, 'Bank Transfer', 'Pending', NULL, 'Chờ thanh toán');

-- ==============================================
-- 8. FEEDBACKS FROM CUSTOMERS
-- ==============================================
INSERT INTO public."Feedbacks"(
    "FeedbackID", "OrderID", "CustomerID", "Rating", "Comment", "FeedbackDate")
VALUES 
    ('FB001', 'ORD003', 'CUST003', 5, 'Dịch vụ rất tốt, nhân viên thân thiện, sản phẩm đẹp', '2025-01-25 10:00:00'),
    ('FB002', 'ORD001', 'CUST001', 4, 'Chất lượng decal tốt, giao hàng đúng hẹn', '2025-01-20 15:30:00'),
    ('FB003', 'ORD005', 'CUST005', 5, 'Thiết kế đẹp, phù hợp với yêu cầu', '2025-01-30 11:00:00'),
    ('FB004', 'ORD002', 'CUST002', 4, 'Giá cả hợp lý, chất lượng tốt', '2025-01-22 16:45:00'),
    ('FB005', 'ORD004', 'CUST004', 3, 'Sản phẩm tốt nhưng thời gian giao hàng hơi chậm', '2025-01-28 14:20:00');

-- ==============================================
-- 9. WARRANTIES
-- ==============================================
INSERT INTO public."Warranties"(
    "WarrantyID", "OrderID", "WarrantyType", "WarrantyDuration", "StartDate", "EndDate", "Terms")
VALUES 
    ('WAR001', 'ORD001', 'Standard', '12 months', '2025-01-20 14:00:00', '2026-01-20 14:00:00', 'Bảo hành decal không bong tróc trong 12 tháng'),
    ('WAR002', 'ORD003', 'Premium', '24 months', '2025-01-25 09:00:00', '2027-01-25 09:00:00', 'Bảo hành decal không bong tróc trong 24 tháng'),
    ('WAR003', 'ORD005', 'Standard', '12 months', '2025-01-30 10:30:00', '2026-01-30 10:30:00', 'Bảo hành decal không bong tróc trong 12 tháng'),
    ('WAR004', 'ORD007', 'Premium', '24 months', '2025-02-05 11:00:00', '2027-02-05 11:00:00', 'Bảo hành decal không bong tróc trong 24 tháng'),
    ('WAR005', 'ORD009', 'Standard', '12 months', '2025-02-10 09:00:00', '2026-02-10 09:00:00', 'Bảo hành decal không bong tróc trong 12 tháng');

-- ==============================================
-- 10. DEPOSITS
-- ==============================================
INSERT INTO public."Deposits"(
    "DepositID", "OrderID", "DepositAmount", "DepositDate", "DepositMethod", "Notes")
VALUES 
    ('DEP001', 'ORD001', 1250000, '2025-01-15 09:30:00', 'Cash', 'Đặt cọc 50%'),
    ('DEP002', 'ORD003', 1600000, '2025-01-17 11:00:00', 'Cash', 'Đặt cọc 50%'),
    ('DEP003', 'ORD005', 1400000, '2025-01-19 08:45:00', 'Cash', 'Đặt cọc 50%'),
    ('DEP004', 'ORD007', 1750000, '2025-01-21 09:30:00', 'Cash', 'Đặt cọc 50%'),
    ('DEP005', 'ORD009', 1500000, '2025-01-23 10:20:00', 'Cash', 'Đặt cọc 50%'),
    ('DEP006', 'ORD010', 1100000, '2025-01-24 12:00:00', 'Cash', 'Đặt cọc 50%');

-- ==============================================
-- SUCCESS MESSAGE
-- ==============================================
SELECT 'Real data has been successfully added to the database!' as Status;