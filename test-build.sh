#!/bin/bash

echo "Testing .NET build..."

# Test restore
echo "1. Testing dotnet restore..."
dotnet restore DecalXeAPI.sln

# Test build
echo "2. Testing dotnet build..."
dotnet build DecalXeAPI.csproj -c Release

# Test publish
echo "3. Testing dotnet publish..."
dotnet publish DecalXeAPI.csproj -c Release -o ./test-publish

echo "Build test completed!"