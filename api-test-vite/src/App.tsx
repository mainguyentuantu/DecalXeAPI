import React, { useState, useEffect } from 'react';
import VehicleList from './components/VehicleList';
import VehicleSearch from './components/VehicleSearch';
import VehicleChecker from './components/VehicleChecker';
import ConnectionStatus from './components/ConnectionStatus';
import { apiService } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'search' | 'check'>('list');
  const [connectionStatus, setConnectionStatus] = useState<{
    status: string;
    message: string;
    data?: any;
  } | null>(null);

  useEffect(() => {
    // Test connection on app load
    const testConnection = async () => {
      const result = await apiService.testConnection();
      setConnectionStatus(result);
    };
    testConnection();
  }, []);

  const handleConnectionTest = async () => {
    setConnectionStatus({ status: 'loading', message: 'Testing connection...' });
    const result = await apiService.testConnection();
    setConnectionStatus(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                🚗 API Test Dashboard
              </h1>
              <p className="text-blue-100 text-lg">
                Test CustomerVehicles API - Production Environment
              </p>
              <p className="text-blue-200 text-sm mt-1">
                🌐 https://decalxeapi-production.up.railway.app/api
              </p>
            </div>
            <ConnectionStatus 
              status={connectionStatus} 
              onTest={handleConnectionTest}
            />
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'list'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500 shadow-md'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              📋 Danh sách xe
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'search'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500 shadow-md'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              🔍 Tìm kiếm xe
            </button>
            <button
              onClick={() => setActiveTab('check')}
              className={`px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === 'check'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500 shadow-md'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              ✅ Kiểm tra tồn tại
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="animate-fadeIn">
          {activeTab === 'list' && <VehicleList />}
          {activeTab === 'search' && <VehicleSearch />}
          {activeTab === 'check' && <VehicleChecker />}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">🚀 API Test Dashboard</h3>
            <p className="text-gray-300">
              Built with React + Vite + Tailwind CSS
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <span>⚡ Powered by Vite</span>
            <span>🎨 Styled with Tailwind</span>
            <span>🔗 Connected to Railway</span>
          </div>
          <p className="mt-4 text-gray-500">
            &copy; 2024 API Test Dashboard. Test all CustomerVehicles endpoints.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
