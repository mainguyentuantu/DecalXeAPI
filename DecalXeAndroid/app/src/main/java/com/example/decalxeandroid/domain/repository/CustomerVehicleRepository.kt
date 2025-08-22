package com.example.decalxeandroid.domain.repository

import com.example.decalxeandroid.domain.model.CustomerVehicle
import kotlinx.coroutines.flow.Flow

interface CustomerVehicleRepository {
    suspend fun getAllVehicles(): Result<List<CustomerVehicle>>
    suspend fun getVehicleById(id: String): Result<CustomerVehicle>
    suspend fun getVehiclesByCustomer(customerId: String): Result<List<CustomerVehicle>>
    suspend fun getVehicleByLicensePlate(licensePlate: String): Result<CustomerVehicle>
    suspend fun createVehicle(vehicle: CustomerVehicle): Result<CustomerVehicle>
    suspend fun updateVehicle(id: String, vehicle: CustomerVehicle): Result<CustomerVehicle>
    suspend fun deleteVehicle(id: String): Result<Unit>
    suspend fun checkVehicleExists(id: String): Result<Boolean>
    suspend fun checkLicensePlateExists(licensePlate: String): Result<Boolean>
    suspend fun checkChassisExists(chassisNumber: String): Result<Boolean>
}
