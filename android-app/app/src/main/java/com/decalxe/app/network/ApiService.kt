package com.decalxe.app.network

import com.decalxe.app.model.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    // Orders endpoints
    @GET("api/orders")
    suspend fun getOrders(
        @Query("pageNumber") pageNumber: Int = 1,
        @Query("pageSize") pageSize: Int = 10,
        @Query("status") status: String? = null,
        @Query("customerId") customerId: Int? = null
    ): Response<PaginatedResponse<Order>>
    
    @GET("api/orders/{id}")
    suspend fun getOrderById(@Path("id") id: Int): Response<Order>
    
    @POST("api/orders")
    suspend fun createOrder(@Body order: Order): Response<Order>
    
    @PUT("api/orders/{id}")
    suspend fun updateOrder(@Path("id") id: Int, @Body order: Order): Response<Order>
    
    @DELETE("api/orders/{id}")
    suspend fun deleteOrder(@Path("id") id: Int): Response<Unit>
    
    // Customers endpoints
    @GET("api/customers")
    suspend fun getCustomers(
        @Query("pageNumber") pageNumber: Int = 1,
        @Query("pageSize") pageSize: Int = 10,
        @Query("search") search: String? = null
    ): Response<PaginatedResponse<Customer>>
    
    @GET("api/customers/{id}")
    suspend fun getCustomerById(@Path("id") id: Int): Response<Customer>
    
    @POST("api/customers")
    suspend fun createCustomer(@Body customer: CustomerCreateRequest): Response<Customer>
    
    @PUT("api/customers/{id}")
    suspend fun updateCustomer(@Path("id") id: Int, @Body customer: CustomerUpdateRequest): Response<Customer>
    
    @DELETE("api/customers/{id}")
    suspend fun deleteCustomer(@Path("id") id: Int): Response<Unit>
    
    // Decals endpoints
    @GET("api/decals")
    suspend fun getDecals(
        @Query("pageNumber") pageNumber: Int = 1,
        @Query("pageSize") pageSize: Int = 10,
        @Query("category") category: String? = null,
        @Query("isActive") isActive: Boolean? = null
    ): Response<PaginatedResponse<Decal>>
    
    @GET("api/decals/{id}")
    suspend fun getDecalById(@Path("id") id: Int): Response<Decal>
    
    // Employees endpoints
    @GET("api/employees")
    suspend fun getEmployees(
        @Query("pageNumber") pageNumber: Int = 1,
        @Query("pageSize") pageSize: Int = 10,
        @Query("isActive") isActive: Boolean? = null
    ): Response<PaginatedResponse<Employee>>
    
    @GET("api/employees/{id}")
    suspend fun getEmployeeById(@Path("id") id: Int): Response<Employee>
    
    // Vehicles endpoints
    @GET("api/vehicles")
    suspend fun getVehicles(
        @Query("customerId") customerId: Int? = null
    ): Response<List<Vehicle>>
    
    @GET("api/vehicles/{id}")
    suspend fun getVehicleById(@Path("id") id: Int): Response<Vehicle>
}