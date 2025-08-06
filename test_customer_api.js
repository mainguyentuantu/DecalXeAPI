// Test script để kiểm tra Customer API endpoints
const API_BASE_URL = 'https://decalxeapi-production.up.railway.app/api';

async function testCustomerAPI() {
  console.log('🔍 Testing Customer API endpoints...\n');

  // Test 1: Search customers
  console.log('1. Testing search customers...');
  try {
    const searchResponse = await fetch(`${API_BASE_URL}/Orders/search-customers?searchTerm=0901234567`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Search Response Status:', searchResponse.status);
    console.log('Search Response Headers:', searchResponse.headers);
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('✅ Search customers successful:', searchData);
    } else {
      const errorText = await searchResponse.text();
      console.log('❌ Search customers failed:', errorText);
    }
  } catch (error) {
    console.log('❌ Search customers error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Create customer
  console.log('2. Testing create customer...');
  try {
    const createResponse = await fetch(`${API_BASE_URL}/Orders/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'Customer',
        phoneNumber: '0901234567',
        email: 'test@example.com',
        address: 'Test Address',
        createAccount: false,
      }),
    });
    
    console.log('Create Response Status:', createResponse.status);
    console.log('Create Response Headers:', createResponse.headers);
    
    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log('✅ Create customer successful:', createData);
    } else {
      const errorText = await createResponse.text();
      console.log('❌ Create customer failed:', errorText);
    }
  } catch (error) {
    console.log('❌ Create customer error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Create order with customer
  console.log('3. Testing create order with customer...');
  try {
    const orderResponse = await fetch(`${API_BASE_URL}/Orders/with-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalAmount: 1500000,
        newCustomerPayload: {
          firstName: 'Test',
          lastName: 'Customer',
          phoneNumber: '0901234568',
          email: 'test2@example.com',
          address: 'Test Address 2',
          createAccount: false,
        },
        assignedEmployeeID: 'EMP010',
        vehicleID: 'VEH001',
        expectedArrivalTime: '2025-01-30T10:00:00Z',
        priority: 'Medium',
        isCustomDecal: false,
        description: 'Test order with new customer',
      }),
    });
    
    console.log('Order Response Status:', orderResponse.status);
    console.log('Order Response Headers:', orderResponse.headers);
    
    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log('✅ Create order with customer successful:', orderData);
    } else {
      const errorText = await orderResponse.text();
      console.log('❌ Create order with customer failed:', errorText);
    }
  } catch (error) {
    console.log('❌ Create order with customer error:', error.message);
  }
}

// Run the test
testCustomerAPI().catch(console.error);