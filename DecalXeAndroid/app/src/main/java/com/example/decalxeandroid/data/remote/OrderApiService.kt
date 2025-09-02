package com.example.decalxeandroid.data.remote

import com.example.decalxeandroid.data.dto.OrderDto
import retrofit2.http.*

interface OrderApiService {
    @GET("Orders")
    suspend fun getOrders(): List<OrderDto>
    
    @GET("Orders/{id}")
    suspend fun getOrderById(@Path("id") id: String): OrderDto
    
    @POST("Orders")
    suspend fun createOrder(@Body order: OrderDto): OrderDto
    
    @PUT("Orders/{id}")
    suspend fun updateOrder(@Path("id") id: String, @Body order: OrderDto): OrderDto
    
    @DELETE("Orders/{id}")
    suspend fun deleteOrder(@Path("id") id: String): String
    
    @PUT("Orders/{id}/status")
    suspend fun updateOrderStatus(@Path("id") id: String, @Body status: Map<String, String>): OrderDto
    
    @GET("Orders/tracking")
    suspend fun trackOrder(
        @Query("orderId") orderId: String?,
        @Query("customerPhone") customerPhone: String?,
        @Query("licensePlate") licensePlate: String?
    ): OrderDto
}
