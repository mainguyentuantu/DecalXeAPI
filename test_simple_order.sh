#!/bin/bash

API_BASE_URL="https://decalxeapi-production.up.railway.app/api"

# Dữ liệu test đơn giản hơn
ORDER_DATA='{
  "customerName": "Test Customer",
  "customerPhone": "0987654321",
  "customerEmail": "test@example.com",
  "vehicleID": "",
  "licensePlate": "TEST-123",
  "chassisNumber": "TEST123456",
  "assignedEmployeeID": "",
  "estimatedCompletionDate": null,
  "notes": "",
  "totalAmount": 500000,
  "orderDetails": [
    {
      "decalServiceId": "SERV001",
      "quantity": 1
    }
  ]
}'

echo "Testing simple order creation..."
echo "URL: $API_BASE_URL/Orders"
echo "Data: $ORDER_DATA"
echo ""

curl -X POST "$API_BASE_URL/Orders" \
  -H "Content-Type: application/json" \
  -d "$ORDER_DATA" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v