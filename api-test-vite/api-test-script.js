// API Test Script for CustomerVehicles
// Run with: node api-test-script.js

const BASE_URL = 'https://decalxeapi-production.up.railway.app/api';

// Test data from actual API
const TEST_DATA = {
  vehicleId: '44c4a3df-0b76-4288-bccd-077387126c9e',
  licensePlate: '59H1-234.56',
  customerId: '9dc301f8-d3d3-4256-84b0-e748556d05ce',
  chassisNumber: 'VNKJF19E2NA123456'
};

async function testEndpoint(name, url, expectedStatus = 200) {
  try {
    console.log(`\n🧪 Testing: ${name}`);
    console.log(`📡 URL: ${url}`);
    
    const response = await fetch(url);
    const status = response.status;
    
    if (status === expectedStatus) {
      const data = await response.json();
      console.log(`✅ SUCCESS: ${status}`);
      console.log(`📊 Response:`, typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
      return true;
    } else {
      console.log(`❌ FAILED: Expected ${expectedStatus}, got ${status}`);
      return false;
    }
  } catch (error) {
    console.log(`💥 ERROR: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting API Tests for CustomerVehicles');
  console.log('🌐 Base URL:', BASE_URL);
  console.log('=' .repeat(60));

  const tests = [
    {
      name: 'Get All Vehicles',
      url: `${BASE_URL}/CustomerVehicles`
    },
    {
      name: 'Get Vehicle by ID',
      url: `${BASE_URL}/CustomerVehicles/${TEST_DATA.vehicleId}`
    },
    {
      name: 'Get Vehicle by License Plate',
      url: `${BASE_URL}/CustomerVehicles/by-license-plate/${encodeURIComponent(TEST_DATA.licensePlate)}`
    },
    {
      name: 'Get Vehicles by Customer ID',
      url: `${BASE_URL}/CustomerVehicles/by-customer/${TEST_DATA.customerId}`
    },
    {
      name: 'Check Vehicle Exists',
      url: `${BASE_URL}/CustomerVehicles/${TEST_DATA.vehicleId}/exists`
    },
    {
      name: 'Check License Plate Exists',
      url: `${BASE_URL}/CustomerVehicles/license-plate/${encodeURIComponent(TEST_DATA.licensePlate)}/exists`
    },
    {
      name: 'Check Chassis Exists',
      url: `${BASE_URL}/CustomerVehicles/chassis/${TEST_DATA.chassisNumber}/exists`
    }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    const success = await testEndpoint(test.name, test.url);
    if (success) passedTests++;
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST RESULTS');
  console.log('=' .repeat(60));
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! API is working perfectly.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the API server.');
  }

  console.log('\n🔗 You can now use the React app to test these endpoints visually!');
  console.log('🌐 React App: http://localhost:5173');
}

// Run the tests
runAllTests().catch(console.error);