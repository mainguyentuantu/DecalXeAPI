# 1. Bước "Chuẩn bị nguyên liệu": Lấy phiên bản .NET SDK 8.0 để build ứng dụng của bạn.
# Chúng ta dùng "8.0" vì đây là phiên bản ổn định và phổ biến.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# 2. Bước "Pha trộn nguyên liệu khô": Sao chép file dự án và khôi phục các gói cần thiết.
# Điều này giúp Docker chỉ build lại những phần cần thiết khi code thay đổi, làm mọi thứ nhanh hơn.
COPY DecalXeAPI.csproj ./
RUN dotnet restore

# 3. Bước "Thêm nguyên liệu còn lại": Sao chép toàn bộ mã nguồn của bạn vào trong "nhà máy" Docker.
COPY . ./

# 4. Bước "Vào đúng chỗ làm việc": Chuyển đến thư mục chứa mã nguồn của ứng dụng.
WORKDIR /app/DecalXeAPI

# 5. Bước "Nướng bánh": Xuất bản ứng dụng của bạn ra phiên bản "sẵn sàng để dùng".
# Lệnh này sẽ tạo ra một phiên bản tối ưu và gọn nhẹ cho môi trường production.
RUN dotnet publish -c Release -o out

# 6. Bước "Đặt bánh lên đĩa": Sử dụng một image .NET ASP.NET runtime nhẹ hơn để chạy ứng dụng.
# Image này chỉ chứa những gì cần thiết để chạy, giúp "cửa tiệm" của bạn nhỏ gọn và nhanh chóng.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# 7. Bước "Chuyển bánh từ lò ra đĩa": Sao chép những gì đã "nướng" ở bước trên vào đây.
COPY --from=build /app/DecalXeAPI/out .

# 8. Bước "Mở cửa tiệm và nói chào khách": Cấu hình cổng mà ứng dụng của bạn sẽ "lắng nghe" yêu cầu.
# OnRender sẽ sử dụng cổng 8080 này để kết nối với ứng dụng của bạn.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# 9. Bước "Bắt đầu làm việc": Đây là lệnh "khởi động" thực sự của ứng dụng.
# Khi "cửa tiệm" mở, nó sẽ chạy file .dll chính của ứng dụng bạn.
ENTRYPOINT ["dotnet", "DecalXeAPI.dll"]