#!/bin/bash

API_BASE_URL="https://decalxeapi-production.up.railway.app/api"

# Dữ liệu test
ORDER_DATA='{
  "customerName": "Nguyễn Văn A",
  "customerPhone": "0123456789",
  "customerEmail": "test@example.com",
  "vehicleID": "",
  "licensePlate": "30A-12345",
  "chassisNumber": "ABC123456789",
        "storeId": "STORE001",
      "assignedEmployeeID": "EMP001",
  "estimatedCompletionDate": null,
  "notes": "Test order",
  "totalAmount": 1000000,
        "orderDetails": [
        {
          "decalServiceId": "SERV001",
          "quantity": 1
        }
      ]
}'

echo "Testing order creation API..."
echo "URL: $API_BASE_URL/Orders"
echo "Data: $ORDER_DATA"
echo ""

curl -X POST "$API_BASE_URL/Orders" \
  -H "Content-Type: application/json" \
  -d "$ORDER_DATA" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v