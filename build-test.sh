#!/bin/bash

echo "=== .NET Build Test Script ==="

# Check .NET version
echo "1. Checking .NET version..."
dotnet --version

# Clean previous builds
echo "2. Cleaning previous builds..."
dotnet clean

# Restore packages
echo "3. Restoring packages..."
dotnet restore

# Build project
echo "4. Building project..."
dotnet build -c Release --verbosity normal

# Publish project
echo "5. Publishing project..."
dotnet publish -c Release -o ./publish --verbosity normal

echo "=== Build test completed ==="