import React, { useState } from 'react';
import './App.css';
import VehicleList from './components/VehicleList';
import VehicleSearch from './components/VehicleSearch';
import VehicleChecker from './components/VehicleChecker';
import ApiConfig from './components/ApiConfig';

function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'search' | 'check'>('list');
  const [showApiConfig, setShowApiConfig] = useState(false);

  return (
    <div className="App min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-center">
                🚗 API Test Dashboard - Customer Vehicles
              </h1>
              <p className="text-center mt-2 text-blue-100">
                Test toàn bộ API endpoints với phương thức GET
              </p>
            </div>
            <button
              onClick={() => setShowApiConfig(true)}
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ⚙️ Cấu hình API
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              📋 Danh sách xe
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              🔍 Tìm kiếm xe
            </button>
            <button
              onClick={() => setActiveTab('check')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'check'
                  ? 'bg-blue-500 text-white border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              ✅ Kiểm tra tồn tại
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'list' && <VehicleList />}
        {activeTab === 'search' && <VehicleSearch />}
        {activeTab === 'check' && <VehicleChecker />}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 API Test Dashboard. Built with React & Tailwind CSS</p>
        </div>
      </footer>

      <ApiConfig 
        isOpen={showApiConfig} 
        onClose={() => setShowApiConfig(false)} 
      />
    </div>
  );
}

export default App;
