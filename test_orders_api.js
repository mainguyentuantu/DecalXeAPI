// Test script để kiểm tra GET /api/Orders endpoint với customer information
const API_BASE_URL = 'https://decalxeapi-production.up.railway.app/api';

async function testOrdersAPI() {
  console.log('🔍 Testing GET /api/Orders endpoint with customer information...\n');

  // Test 1: Get orders list
  console.log('1. Testing GET /api/Orders...');
  try {
    const ordersResponse = await fetch(`${API_BASE_URL}/Orders?page=1&pageSize=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Orders Response Status:', ordersResponse.status);
    console.log('Orders Response Headers:', ordersResponse.headers);
    
    if (ordersResponse.ok) {
      const ordersData = await ordersResponse.json();
      console.log('✅ GET /api/Orders successful');
      console.log('Response structure:', JSON.stringify(ordersData, null, 2));
      
      // Check if orders have customer information
      if (ordersData.items && ordersData.items.length > 0) {
        const firstOrder = ordersData.items[0];
        console.log('\n📋 First order details:');
        console.log('- OrderID:', firstOrder.orderID);
        console.log('- CustomerID:', firstOrder.customerID);
        console.log('- CustomerFullName:', firstOrder.customerFullName);
        console.log('- CustomerPhoneNumber:', firstOrder.customerPhoneNumber);
        console.log('- CustomerEmail:', firstOrder.customerEmail);
        console.log('- CustomerAddress:', firstOrder.customerAddress);
        console.log('- AccountID:', firstOrder.accountID);
        console.log('- AccountUsername:', firstOrder.accountUsername);
        console.log('- AccountCreated:', firstOrder.accountCreated);
        console.log('- Description:', firstOrder.description);
      } else {
        console.log('⚠️ No orders found in response');
      }
    } else {
      const errorText = await ordersResponse.text();
      console.log('❌ GET /api/Orders failed:', errorText);
    }
  } catch (error) {
    console.log('❌ GET /api/Orders error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Get specific order by ID (if we have orders)
  console.log('2. Testing GET /api/Orders/{id}...');
  try {
    // First get orders to find an ID
    const ordersResponse = await fetch(`${API_BASE_URL}/Orders?page=1&pageSize=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (ordersResponse.ok) {
      const ordersData = await ordersResponse.json();
      if (ordersData.items && ordersData.items.length > 0) {
        const orderId = ordersData.items[0].orderID;
        console.log(`Testing with order ID: ${orderId}`);
        
        const orderResponse = await fetch(`${API_BASE_URL}/Orders/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Order Response Status:', orderResponse.status);
        
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          console.log('✅ GET /api/Orders/{id} successful');
          console.log('Order details:', JSON.stringify(orderData, null, 2));
        } else {
          const errorText = await orderResponse.text();
          console.log('❌ GET /api/Orders/{id} failed:', errorText);
        }
      } else {
        console.log('⚠️ No orders available to test GET /api/Orders/{id}');
      }
    }
  } catch (error) {
    console.log('❌ GET /api/Orders/{id} error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Search orders by customer name
  console.log('3. Testing search orders by customer name...');
  try {
    const searchResponse = await fetch(`${API_BASE_URL}/Orders?searchTerm=Nguyễn&page=1&pageSize=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Search Response Status:', searchResponse.status);
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('✅ Search orders successful');
      console.log('Found orders:', searchData.items ? searchData.items.length : 0);
    } else {
      const errorText = await searchResponse.text();
      console.log('❌ Search orders failed:', errorText);
    }
  } catch (error) {
    console.log('❌ Search orders error:', error.message);
  }
}

// Run the test
testOrdersAPI().catch(console.error);