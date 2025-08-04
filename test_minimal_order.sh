#!/bin/bash

API_BASE_URL="https://decalxeapi-production.up.railway.app/api"

# Dữ liệu test tối thiểu
ORDER_DATA='{
  "customerName": "Minimal Test",
  "customerPhone": "0123456789",
  "customerEmail": "",
  "vehicleID": "",
  "licensePlate": "",
  "chassisNumber": "MIN123456",
  "assignedEmployeeID": "",
  "estimatedCompletionDate": null,
  "expectedArrivalTime": null,
  "priority": "Medium",
  "isCustomDecal": false,
  "notes": "",
  "totalAmount": 100000,
  "orderDetails": [
    {
      "decalServiceId": "SERV001",
      "quantity": 1
    }
  ]
}'

echo "Testing minimal order creation..."
echo "URL: $API_BASE_URL/Orders"
echo "Data: $ORDER_DATA"
echo ""

curl -X POST "$API_BASE_URL/Orders" \
  -H "Content-Type: application/json" \
  -d "$ORDER_DATA" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v