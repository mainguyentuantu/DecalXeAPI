const axios = require('axios');

const API_BASE_URL = 'https://decalxeapi-production.up.railway.app/api';

async function testOrderCreation() {
  try {
    // Dữ liệu test
    const orderData = {
      customerName: "Nguyễn Văn A",
      customerPhone: "0123456789",
      customerEmail: "test@example.com",
      vehicleID: "", // Để trống để test
      licensePlate: "30A-12345",
      chassisNumber: "ABC123456789",
      storeId: "",
      assignedEmployeeID: "",
      estimatedCompletionDate: null,
      notes: "Test order",
      totalAmount: 1000000,
      orderDetails: [
        {
          decalServiceId: "1", // Giả sử có service với ID này
          quantity: 1
        }
      ]
    };

    console.log('Sending order data:', JSON.stringify(orderData, null, 2));

    const response = await axios.post(`${API_BASE_URL}/Orders`, orderData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Success! Order created:', response.data);
  } catch (error) {
    console.error('Error creating order:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
  }
}

testOrderCreation();