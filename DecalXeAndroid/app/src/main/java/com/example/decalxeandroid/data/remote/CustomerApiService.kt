package com.example.decalxeandroid.data.remote

import com.example.decalxeandroid.data.dto.CustomerDto
import retrofit2.http.*

interface CustomerApiService {
    @GET("Customers")
    suspend fun getCustomers(): List<CustomerDto>
    
    @GET("Customers/{id}")
    suspend fun getCustomerById(@Path("id") id: String): CustomerDto
    
    @POST("Customers")
    suspend fun createCustomer(@Body customer: CustomerDto): CustomerDto
    
    @PUT("Customers/{id}")
    suspend fun updateCustomer(@Path("id") id: String, @Body customer: CustomerDto): CustomerDto
    
    @DELETE("Customers/{id}")
    suspend fun deleteCustomer(@Path("id") id: String): String
    
    @GET("Orders/search-customers")
    suspend fun searchCustomers(@Query("searchTerm") searchTerm: String): List<CustomerDto>
}
