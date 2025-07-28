import React, { useState, useEffect } from 'react';
import { Server, Database, Shield, Car, Store } from 'lucide-react';
import TestCard from './components/TestCard';
import ApiStatus from './components/ApiStatus';
import { apiService } from './services/api';

function App() {
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    lastChecked: null,
    error: null
  });

  const [testResults, setTestResults] = useState({});
  const [loadingTests, setLoadingTests] = useState({});

  // Test connection on component mount
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      await apiService.testConnection();
      setConnectionStatus({
        isConnected: true,
        lastChecked: new Date(),
        error: null
      });
    } catch (error) {
      setConnectionStatus({
        isConnected: false,
        lastChecked: new Date(),
        error: error.message
      });
    }
  };

  const runTest = async (testName, testFunction) => {
    setLoadingTests(prev => ({ ...prev, [testName]: true }));
    
    try {
      const response = await testFunction();
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          status: 'success',
          data: response.data,
          timestamp: new Date()
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          status: 'error',
          error: {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
          },
          timestamp: new Date()
        }
      }));
    } finally {
      setLoadingTests(prev => ({ ...prev, [testName]: false }));
    }
  };

  const testCases = [
    {
      id: 'stores',
      title: 'Test Stores API',
      description: 'Kiểm tra API lấy danh sách cửa hàng (GET /api/stores)',
      icon: <Store className="w-6 h-6" />,
      testFunction: () => apiService.getStores()
    },
    {
      id: 'decaltypes',
      title: 'Test Decal Types API',
      description: 'Kiểm tra API lấy danh sách loại decal (GET /api/decaltypes)',
      icon: <Database className="w-6 h-6" />,
      testFunction: () => apiService.getDecalTypes()
    },
    {
      id: 'roles',
      title: 'Test Roles API',
      description: 'Kiểm tra API lấy danh sách vai trò (GET /api/roles)',
      icon: <Shield className="w-6 h-6" />,
      testFunction: () => apiService.getRoles()
    },
    {
      id: 'vehiclebrands',
      title: 'Test Vehicle Brands API',
      description: 'Kiểm tra API lấy danh sách hãng xe (GET /api/vehiclebrands)',
      icon: <Car className="w-6 h-6" />,
      testFunction: () => apiService.getVehicleBrands()
    },
    {
      id: 'vehiclemodels',
      title: 'Test Vehicle Models API',
      description: 'Kiểm tra API lấy danh sách model xe (GET /api/vehiclemodels)',
      icon: <Car className="w-6 h-6" />,
      testFunction: () => apiService.getVehicleModels()
    }
  ];

  const runAllTests = async () => {
    for (const testCase of testCases) {
      await runTest(testCase.id, testCase.testFunction);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const clearResults = () => {
    setTestResults({});
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Server className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">DecalXe API Test</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Công cụ kiểm tra API DecalXe để xác minh CORS và kết nối từ React frontend
          </p>
        </div>

        {/* API Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trạng thái kết nối</h2>
          <ApiStatus 
            isConnected={connectionStatus.isConnected}
            lastChecked={connectionStatus.lastChecked}
            error={connectionStatus.error}
          />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={testConnection}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Kiểm tra kết nối
            </button>
            <button
              onClick={runAllTests}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Chạy tất cả test
            </button>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Xóa kết quả
            </button>
          </div>
        </div>

        {/* Test Cases */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testCases.map((testCase) => {
              const result = testResults[testCase.id];
              const loading = loadingTests[testCase.id];
              
              return (
                <TestCard
                  key={testCase.id}
                  title={testCase.title}
                  description={testCase.description}
                  status={result?.status || 'idle'}
                  result={result?.status === 'success' ? result.data : result?.error}
                  onTest={() => runTest(testCase.id, testCase.testFunction)}
                  loading={loading}
                />
              );
            })}
          </div>
        </div>

        {/* Console Logs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Console Logs</h2>
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="mb-2">🔍 Mở Developer Tools (F12) để xem chi tiết logs</div>
            <div className="mb-2">📡 Network tab: Xem CORS headers và requests</div>
            <div className="mb-2">🐛 Console tab: Xem errors và debug info</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            API Base URL: <span className="font-mono bg-gray-200 px-2 py-1 rounded">
              https://decalxeapi-backend-production.up.railway.app
            </span>
          </p>
          <p className="mt-2">
            Frontend URL: <span className="font-mono bg-gray-200 px-2 py-1 rounded">
              http://localhost:5173
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;