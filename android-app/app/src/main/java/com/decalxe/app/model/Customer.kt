package com.decalxe.app.model

import com.google.gson.annotations.SerializedName

data class Customer(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("name")
    val name: String,
    
    @SerializedName("phone")
    val phone: String?,
    
    @SerializedName("email")
    val email: String?,
    
    @SerializedName("address")
    val address: String?,
    
    @SerializedName("createdAt")
    val createdAt: String?,
    
    @SerializedName("orders")
    val orders: List<Order>?
)

data class CustomerCreateRequest(
    val name: String,
    val phone: String?,
    val email: String?,
    val address: String?
)

data class CustomerUpdateRequest(
    val name: String?,
    val phone: String?,
    val email: String?,
    val address: String?
)