import React, { useState } from 'react';
import { apiService } from '../services/api';

type CheckType = 'vehicle' | 'licensePlate' | 'chassis';

const VehicleChecker: React.FC = () => {
  const [checkType, setCheckType] = useState<CheckType>('vehicle');
  const [checkValue, setCheckValue] = useState('');
  const [result, setResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!checkValue.trim()) {
      setError('Vui lòng nhập giá trị cần kiểm tra');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let exists;
      switch (checkType) {
        case 'vehicle':
          exists = await apiService.checkVehicleExists(checkValue.trim());
          break;
        case 'licensePlate':
          exists = await apiService.checkLicensePlateExists(checkValue.trim());
          break;
        case 'chassis':
          exists = await apiService.checkChassisExists(checkValue.trim());
          break;
        default:
          throw new Error('Loại kiểm tra không hợp lệ');
      }
      setResult(exists);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const getApiEndpoint = () => {
    switch (checkType) {
      case 'vehicle':
        return 'GET /api/CustomerVehicles/{id}/exists';
      case 'licensePlate':
        return 'GET /api/CustomerVehicles/license-plate/{licensePlate}/exists';
      case 'chassis':
        return 'GET /api/CustomerVehicles/chassis/{chassisNumber}/exists';
      default:
        return '';
    }
  };

  const getDescription = () => {
    switch (checkType) {
      case 'vehicle':
        return 'Kiểm tra xe có tồn tại không theo ID';
      case 'licensePlate':
        return 'Kiểm tra biển số có tồn tại không';
      case 'chassis':
        return 'Kiểm tra số khung có tồn tại không';
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (checkType) {
      case 'vehicle':
        return 'Nhập ID xe cần kiểm tra...';
      case 'licensePlate':
        return 'Nhập biển số cần kiểm tra (VD: 51F-12345)...';
      case 'chassis':
        return 'Nhập số khung cần kiểm tra...';
      default:
        return '';
    }
  };

  const getLabel = () => {
    switch (checkType) {
      case 'vehicle':
        return 'ID xe';
      case 'licensePlate':
        return 'Biển số xe';
      case 'chassis':
        return 'Số khung xe';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        ✅ Kiểm tra sự tồn tại
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loại kiểm tra
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCheckType('vehicle')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              checkType === 'vehicle'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Kiểm tra xe tồn tại
          </button>
          <button
            onClick={() => setCheckType('licensePlate')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              checkType === 'licensePlate'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Kiểm tra biển số tồn tại
          </button>
          <button
            onClick={() => setCheckType('chassis')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              checkType === 'chassis'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Kiểm tra số khung tồn tại
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
            {getLabel()}
          </label>
          <input
            type="text"
            value={checkValue}
            onChange={(e) => setCheckValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 self-end"
        >
          {loading ? '⏳ Đang kiểm tra...' : '✅ Kiểm tra'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">❌</span>
            <div>
              <h3 className="font-semibold text-red-800">Lỗi khi kiểm tra</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Đang kiểm tra...</span>
        </div>
      )}

      {result !== null && !loading && (
        <div className="space-y-4">
          <div className={`p-6 rounded-lg border-2 ${
            result 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {result ? '✅' : '❌'}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  result ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result ? 'Tồn tại' : 'Không tồn tại'}
                </h3>
                <p className={`text-lg ${
                  result ? 'text-green-700' : 'text-red-700'
                }`}>
                  {checkType === 'vehicle' && (result 
                    ? `Xe với ID "${checkValue}" tồn tại trong hệ thống`
                    : `Xe với ID "${checkValue}" không tồn tại trong hệ thống`
                  )}
                  {checkType === 'licensePlate' && (result 
                    ? `Biển số "${checkValue}" đã được sử dụng`
                    : `Biển số "${checkValue}" chưa được sử dụng`
                  )}
                  {checkType === 'chassis' && (result 
                    ? `Số khung "${checkValue}" đã được sử dụng`
                    : `Số khung "${checkValue}" chưa được sử dụng`
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Thông tin kết quả:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Loại kiểm tra:</strong> {
                checkType === 'vehicle' ? 'Xe tồn tại' :
                checkType === 'licensePlate' ? 'Biển số tồn tại' :
                'Số khung tồn tại'
              }</p>
              <p><strong>Giá trị kiểm tra:</strong> {checkValue}</p>
              <p><strong>Kết quả:</strong> <code>{result.toString()}</code></p>
              <p><strong>API Endpoint:</strong> <code>{getApiEndpoint()}</code></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleChecker;