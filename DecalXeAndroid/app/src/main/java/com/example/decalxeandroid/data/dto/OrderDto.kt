package com.example.decalxeandroid.data.dto

import com.google.gson.annotations.SerializedName

data class OrderDto(
    @SerializedName("orderID")
    val orderID: String,
    @SerializedName("orderDate")
    val orderDate: String,
    @SerializedName("orderStatus")
    val orderStatus: String,
    @SerializedName("currentStage")
    val currentStage: String,
    @SerializedName("totalAmount")
    val totalAmount: Double,
    @SerializedName("depositAmount")
    val depositAmount: Double,
    @SerializedName("remainingAmount")
    val remainingAmount: Double,
    @SerializedName("customerID")
    val customerID: String,
    @SerializedName("customerFullName")
    val customerFullName: String,
    @SerializedName("vehicleID")
    val vehicleID: String,
    @SerializedName("vehicleLicensePlate")
    val vehicleLicensePlate: String,
    @SerializedName("notes")
    val notes: String?,
    @SerializedName("estimatedCompletionDate")
    val estimatedCompletionDate: String?,
    @SerializedName("actualCompletionDate")
    val actualCompletionDate: String?
)
