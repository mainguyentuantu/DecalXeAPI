package com.example.decalxeandroid.domain.repository

import com.example.decalxeandroid.domain.model.Order
import kotlinx.coroutines.flow.Flow

interface OrderRepository {
    suspend fun getOrders(): Result<List<Order>>
    suspend fun getOrderById(id: String): Result<Order>
    suspend fun createOrder(order: Order): Result<Order>
    suspend fun updateOrder(id: String, order: Order): Result<Order>
    suspend fun deleteOrder(id: String): Result<Unit>
    suspend fun updateOrderStatus(id: String, status: String): Result<Order>
    suspend fun trackOrder(orderId: String?, customerPhone: String?, licensePlate: String?): Result<Order>
    suspend fun getOrdersByCustomer(customerId: String): Result<List<Order>>
}
