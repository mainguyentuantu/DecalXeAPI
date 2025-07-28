import React, { useState } from 'react';
import { CustomerVehicleDto } from '../types/api';
import { apiService } from '../services/api';

type SearchType = 'id' | 'licensePlate' | 'customerId';

const VehicleSearch: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>('id');
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState<CustomerVehicleDto | CustomerVehicleDto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError('Vui lòng nhập giá trị tìm kiếm');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let data;
      switch (searchType) {
        case 'id':
          data = await apiService.getVehicleById(searchValue.trim());
          break;
        case 'licensePlate':
          data = await apiService.getVehicleByLicensePlate(searchValue.trim());
          break;
        case 'customerId':
          data = await apiService.getVehiclesByCustomerId(searchValue.trim());
          break;
        default:
          throw new Error('Loại tìm kiếm không hợp lệ');
      }
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getApiEndpoint = () => {
    switch (searchType) {
      case 'id':
        return 'GET /api/CustomerVehicles/{id}';
      case 'licensePlate':
        return 'GET /api/CustomerVehicles/by-license-plate/{licensePlate}';
      case 'customerId':
        return 'GET /api/CustomerVehicles/by-customer/{customerId}';
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (searchType) {
      case 'id':
        return 'Lấy thông tin xe theo ID';
      case 'licensePlate':
        return 'Lấy thông tin xe theo biển số';
      case 'customerId':
        return 'Lấy danh sách xe của một khách hàng';
      default:
        return '';
    }
  };

  const renderVehicle = (vehicle: CustomerVehicleDto) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🔍 Tìm kiếm xe khách hàng
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loại tìm kiếm
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSearchType('id')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'id'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Theo ID xe
          </button>
          <button
            onClick={() => setSearchType('licensePlate')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'licensePlate'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Theo biển số
          </button>
          <button
            onClick={() => setSearchType('customerId')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === 'customerId'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Theo ID khách hàng
          </button>
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>API Endpoint:</strong> {getApiEndpoint()}
        </p>
        <p className="text-sm text-blue-600 mt-1">
          {getDescription()}
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {searchType === 'id' && 'ID xe'}
            {searchType === 'licensePlate' && 'Biển số xe (VD: 51F-12345)'}
            {searchType === 'customerId' && 'ID khách hàng'}
          </label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              searchType === 'id' ? 'Nhập ID xe...' :
              searchType === 'licensePlate' ? 'Nhập biển số xe...' :
              'Nhập ID khách hàng...'
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 self-end"
        >
          {loading ? '🔍 Đang tìm...' : '🔍 Tìm kiếm'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">❌</span>
            <div>
              <h3 className="font-semibold text-red-800">Lỗi khi tìm kiếm</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Đang tìm kiếm...</span>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4">
          {Array.isArray(result) ? (
            <>
              <div className="text-sm text-gray-600 mb-4">
                Tìm thấy <strong>{result.length}</strong> xe
              </div>
              {result.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl">🚗</span>
                  <p className="text-gray-500 mt-4">Không tìm thấy xe nào</p>
                </div>
              ) : (
                result.map((vehicle) => (
                  <div key={vehicle.vehicleID}>
                    {renderVehicle(vehicle)}
                  </div>
                ))
              )}
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600 mb-4">
                <strong>Tìm thấy 1 xe</strong>
              </div>
              {renderVehicle(result)}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;