import React, { useState, useEffect } from 'react';
import { CustomerVehicleDto } from '../types/api';
import { apiService } from '../services/api';

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<CustomerVehicleDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAllVehicles();
      setVehicles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            📋 Danh sách tất cả xe khách hàng
          </h2>
          <p className="text-gray-600">
            Lấy danh sách tất cả xe trong hệ thống từ API production
          </p>
        </div>
        <button
          onClick={loadVehicles}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Đang tải...
            </span>
          ) : (
            '🔄 Tải lại'
          )}
        </button>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-blue-600 text-lg">🌐</span>
          <h3 className="font-semibold text-blue-800">API Endpoint</h3>
        </div>
        <p className="text-sm text-blue-700 font-mono bg-white px-3 py-2 rounded border">
          GET https://decalxeapi-production.up.railway.app/api/CustomerVehicles
        </p>
        <p className="text-sm text-blue-600 mt-2">
          Lấy danh sách tất cả xe khách hàng trong hệ thống production
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">❌</span>
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-1">Lỗi khi gọi API</h3>
              <p className="text-red-700 text-sm">{error}</p>
              <button
                onClick={loadVehicles}
                className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium underline"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col justify-center items-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🚗</span>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">Đang tải dữ liệu từ API...</p>
          <p className="text-gray-400 text-sm mt-1">Kết nối đến Railway production server</p>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-8xl mb-4">🚗</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Không có xe nào</h3>
          <p className="text-gray-500">Không tìm thấy xe nào trong hệ thống</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Tìm thấy <strong className="text-blue-600 text-lg">{vehicles.length}</strong> xe
            </div>
            <div className="text-xs text-gray-400">
              Cập nhật: {new Date().toLocaleString('vi-VN')}
            </div>
          </div>
          
          <div className="grid gap-4">
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.vehicleID}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-300 bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {vehicle.vehicleModelName}
                      </h3>
                      <p className="text-sm text-gray-600">{vehicle.vehicleBrandName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {vehicle.licensePlate || 'Chưa có biển số'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-1">
                      🚗 Thông tin xe
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium text-gray-600">ID:</span> 
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                          {vehicle.vehicleID}
                        </span>
                      </p>
                      <p><span className="font-medium text-gray-600">Số khung:</span> 
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                          {vehicle.chassisNumber}
                        </span>
                      </p>
                      <p><span className="font-medium text-gray-600">Màu sắc:</span> 
                        <span className="ml-2">{vehicle.color}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-1">
                      📊 Thông số kỹ thuật
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium text-gray-600">Năm sản xuất:</span> 
                        <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {vehicle.year}
                        </span>
                      </p>
                      <p><span className="font-medium text-gray-600">KM ban đầu:</span> 
                        <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded">
                          {vehicle.initialKM.toLocaleString()} km
                        </span>
                      </p>
                      <p><span className="font-medium text-gray-600">Model ID:</span> 
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                          {vehicle.modelID}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 border-b border-gray-200 pb-1">
                      👤 Thông tin khách hàng
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium text-gray-600">Tên:</span> 
                        <span className="ml-2 font-semibold text-purple-700">
                          {vehicle.customerFullName}
                        </span>
                      </p>
                      <p><span className="font-medium text-gray-600">ID khách hàng:</span> 
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                          {vehicle.customerID}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleList;