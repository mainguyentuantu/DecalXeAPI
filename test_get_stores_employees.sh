#!/bin/bash

API_BASE_URL="https://decalxeapi-production.up.railway.app/api"

echo "Getting Stores..."
curl -X GET "$API_BASE_URL/Stores" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

echo ""
echo "Getting Employees..."
curl -X GET "$API_BASE_URL/Employees" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v