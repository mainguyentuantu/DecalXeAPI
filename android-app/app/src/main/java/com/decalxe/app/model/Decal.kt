package com.decalxe.app.model

import com.google.gson.annotations.SerializedName

data class Decal(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("name")
    val name: String,
    
    @SerializedName("description")
    val description: String?,
    
    @SerializedName("price")
    val price: Double,
    
    @SerializedName("imageUrl")
    val imageUrl: String?,
    
    @SerializedName("category")
    val category: String?,
    
    @SerializedName("isActive")
    val isActive: Boolean,
    
    @SerializedName("createdAt")
    val createdAt: String?,
    
    @SerializedName("width")
    val width: Double?,
    
    @SerializedName("height")
    val height: Double?,
    
    @SerializedName("material")
    val material: String?
)

data class Vehicle(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("licensePlate")
    val licensePlate: String,
    
    @SerializedName("brand")
    val brand: String?,
    
    @SerializedName("model")
    val model: String?,
    
    @SerializedName("year")
    val year: Int?,
    
    @SerializedName("color")
    val color: String?,
    
    @SerializedName("customerId")
    val customerId: Int?
)

data class Employee(
    @SerializedName("id")
    val id: Int,
    
    @SerializedName("name")
    val name: String,
    
    @SerializedName("email")
    val email: String?,
    
    @SerializedName("phone")
    val phone: String?,
    
    @SerializedName("role")
    val role: String?,
    
    @SerializedName("isActive")
    val isActive: Boolean,
    
    @SerializedName("createdAt")
    val createdAt: String?
)