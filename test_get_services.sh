#!/bin/bash

API_BASE_URL="https://decalxeapi-production.up.railway.app/api"

echo "Getting DecalServices..."
curl -X GET "$API_BASE_URL/DecalServices" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v

echo ""
echo "Getting DecalTypes..."
curl -X GET "$API_BASE_URL/DecalTypes" \
  -H "Content-Type: application/json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -v