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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📋 Danh sách tất cả xe khách hàng
        </h2>
        <button
          onClick={loadVehicles}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? '🔄 Đang tải...' : '🔄 Tải lại'}
        </button>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>API Endpoint:</strong> GET /api/CustomerVehicles
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Lấy danh sách tất cả xe khách hàng trong hệ thống
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">❌</span>
            <div>
              <h3 className="font-semibold text-red-800">Lỗi khi gọi API</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl">🚗</span>
          <p className="text-gray-500 mt-4">Không có xe nào trong hệ thống</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Tìm thấy <strong>{vehicles.length}</strong> xe
          </div>
          
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.vehicleID}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {vehicle.vehicleModelName}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">ID:</span> {vehicle.vehicleID}</p>
                    <p><span className="font-medium">Biển số:</span> 
                      <span className="bg-yellow-100 px-2 py-1 rounded ml-1">
                        {vehicle.licensePlate || 'Chưa có'}
                      </span>
                    </p>
                    <p><span className="font-medium">Số khung:</span> {vehicle.chassisNumber}</p>
                  </div>
                </div>
                
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Thương hiệu:</span> {vehicle.vehicleBrandName}</p>
                  <p><span className="font-medium">Màu sắc:</span> {vehicle.color}</p>
                  <p><span className="font-medium">Năm sản xuất:</span> {vehicle.year}</p>
                  <p><span className="font-medium">KM ban đầu:</span> {vehicle.initialKM.toLocaleString()} km</p>
                </div>
                
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Khách hàng:</span> {vehicle.customerFullName}</p>
                  <p><span className="font-medium">ID khách hàng:</span> {vehicle.customerID}</p>
                  <p><span className="font-medium">ID model:</span> {vehicle.modelID}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;