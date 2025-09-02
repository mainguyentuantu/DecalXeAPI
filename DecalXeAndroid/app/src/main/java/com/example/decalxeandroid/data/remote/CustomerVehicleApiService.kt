package com.example.decalxeandroid.data.remote

import com.example.decalxeandroid.data.dto.CustomerVehicleDto
import retrofit2.http.*

interface CustomerVehicleApiService {
    @GET("CustomerVehicles")
    suspend fun getAllVehicles(): List<CustomerVehicleDto>
    
    @GET("CustomerVehicles/{id}")
    suspend fun getVehicleById(@Path("id") id: String): CustomerVehicleDto
    
    @GET("CustomerVehicles/by-customer/{customerId}")
    suspend fun getVehiclesByCustomer(@Path("customerId") customerId: String): List<CustomerVehicleDto>
    
    @GET("CustomerVehicles/by-license-plate/{licensePlate}")
    suspend fun getVehicleByLicensePlate(@Path("licensePlate") licensePlate: String): CustomerVehicleDto
    
    @POST("CustomerVehicles")
    suspend fun createVehicle(@Body vehicle: CustomerVehicleDto): CustomerVehicleDto
    
    @PUT("CustomerVehicles/{id}")
    suspend fun updateVehicle(@Path("id") id: String, @Body vehicle: CustomerVehicleDto): CustomerVehicleDto
    
    @DELETE("CustomerVehicles/{id}")
    suspend fun deleteVehicle(@Path("id") id: String): String
    
    @GET("CustomerVehicles/{id}/exists")
    suspend fun checkVehicleExists(@Path("id") id: String): Boolean
    
    @GET("CustomerVehicles/license-plate/{licensePlate}/exists")
    suspend fun checkLicensePlateExists(@Path("licensePlate") licensePlate: String): Boolean
    
    @GET("CustomerVehicles/chassis/{chassisNumber}/exists")
    suspend fun checkChassisExists(@Path("chassisNumber") chassisNumber: String): Boolean
}
