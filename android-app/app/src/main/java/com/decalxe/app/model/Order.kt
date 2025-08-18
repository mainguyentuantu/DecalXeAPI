package com.decalxe.app.model

import com.google.gson.annotations.SerializedName
import java.util.Date

data class Order(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("customerId")
    val customerId: Int?,
    
    @SerializedName("customer")
    val customer: Customer?,
    
    @SerializedName("orderDate")
    val orderDate: String,
    
    @SerializedName("status")
    val status: String,
    
    @SerializedName("totalAmount")
    val totalAmount: Double,
    
    @SerializedName("notes")
    val notes: String?,
    
    @SerializedName("vehicleId")
    val vehicleId: Int?,
    
    @SerializedName("vehicle")
    val vehicle: Vehicle?,
    
    @SerializedName("orderDetails")
    val orderDetails: List<OrderDetail>?,
    
    @SerializedName("orderStages")
    val orderStages: List<OrderStage>?
)

data class OrderDetail(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("orderId")
    val orderId: Int,
    
    @SerializedName("decalId")
    val decalId: Int,
    
    @SerializedName("decal")
    val decal: Decal?,
    
    @SerializedName("quantity")
    val quantity: Int,
    
    @SerializedName("unitPrice")
    val unitPrice: Double,
    
    @SerializedName("totalPrice")
    val totalPrice: Double,
    
    @SerializedName("placement")
    val placement: String?
)

data class OrderStage(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("orderId")
    val orderId: Int,
    
    @SerializedName("stageType")
    val stageType: String,
    
    @SerializedName("status")
    val status: String,
    
    @SerializedName("startDate")
    val startDate: String?,
    
    @SerializedName("endDate")
    val endDate: String?,
    
    @SerializedName("employeeId")
    val employeeId: Int?,
    
    @SerializedName("employee")
    val employee: Employee?,
    
    @SerializedName("notes")
    val notes: String?
)