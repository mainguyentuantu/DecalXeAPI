# --- Giai đoạn 1: Build ứng dụng ---

# 1. Bước "Chuẩn bị nguyên liệu": Lấy phiên bản .NET SDK 8.0 để build.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# 2. Bước "Pha trộn nguyên liệu khô": Sao chép file solution và project trước.
# Điều này giúp Docker tận dụng cache, chỉ khi các file này thay đổi thì mới cần restore lại.
COPY ["DecalXeAPI.sln", "DecalXeAPI.csproj", "./"]
RUN dotnet restore "DecalXeAPI.sln"

# 3. Bước "Thêm nguyên liệu còn lại": Sao chép toàn bộ mã nguồn vào.
COPY . .

# 4. Bước "Nướng bánh": Xuất bản ứng dụng, chỉ định rõ file dự án cần publish.
# Kết quả sẽ được đưa vào một thư mục riêng là /app/publish để giữ mọi thứ sạch sẽ.
RUN dotnet publish "DecalXeAPI.csproj" -c Release -o /app/publish

# --- Giai đoạn 2: Tạo image cuối cùng để chạy ---

# 5. Bước "Đặt bánh lên đĩa": Sử dụng một image runtime nhẹ hơn, chỉ chứa những gì cần thiết để chạy.
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# 6. Bước "Chuyển bánh từ lò ra đĩa": Sao chép kết quả đã publish ở giai đoạn build vào đây.
COPY --from=build /app/publish .

# 7. Bước "Mở cửa tiệm và nói chào khách": Cấu hình cổng mà ứng dụng sẽ lắng nghe.
# Railway/OnRender sẽ sử dụng cổng này.
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# 8. Bước "Bắt đầu làm việc": Lệnh khởi động ứng dụng.
ENTRYPOINT ["dotnet", "DecalXeAPI.dll"]
