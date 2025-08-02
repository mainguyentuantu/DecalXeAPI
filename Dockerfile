# --- Giai đoạn 1: Build ứng dụng ---

# 1. Bước "Chuẩn bị nguyên liệu": Lấy phiên bản .NET SDK 8.0 để build.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# 2. Bước "Pha trộn nguyên liệu khô": Sao chép file solution và project trước.
# Điều này giúp Docker tận dụng cache, chỉ khi các file này thay đổi thì mới cần restore lại.
COPY ["DecalXeAPI.sln", "DecalXeAPI.csproj", "./"]

# 3. Bước "Restore packages": Khôi phục các dependencies
RUN dotnet restore "DecalXeAPI.sln" --verbosity normal

# 4. Bước "Thêm nguyên liệu còn lại": Sao chép toàn bộ mã nguồn vào.
COPY . .

# 5. Bước "Build ứng dụng": Build trước khi publish để kiểm tra lỗi
RUN dotnet build "DecalXeAPI.csproj" -c Release --no-restore --verbosity normal

# 6. Bước "Nướng bánh": Xuất bản ứng dụng, chỉ định rõ file dự án cần publish.
# Kết quả sẽ được đưa vào một thư mục riêng là /app/publish để giữ mọi thứ sạch sẽ.
RUN dotnet publish "DecalXeAPI.csproj" -c Release -o /app/publish --no-build --verbosity normal

# --- Giai đoạn 2: Tạo image cuối cùng để chạy ---

# 7. Bước "Đặt bánh lên đĩa": Sử dụng một image runtime nhẹ hơn, chỉ chứa những gì cần thiết để chạy.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# 8. Bước "Chuyển bánh từ lò ra đĩa": Sao chép kết quả đã publish ở giai đoạn build vào đây.
COPY --from=build /app/publish .

# 9. Bước "Mở cửa tiệm và nói chào khách": Cấu hình cổng mà ứng dụng sẽ lắng nghe.
# Railway/OnRender sẽ sử dụng cổng này.
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

# 10. Bước "Bắt đầu làm việc": Lệnh khởi động ứng dụng.
ENTRYPOINT ["dotnet", "DecalXeAPI.dll"]
