package com.example.decalxeandroid.domain.model

data class Order(
    val orderID: String,
    val orderDate: String,
    val orderStatus: String,
    val currentStage: String,
    val totalAmount: Double,
    val depositAmount: Double,
    val remainingAmount: Double,
    val customerID: String,
    val customerFullName: String,
    val vehicleID: String,
    val vehicleLicensePlate: String,
    val notes: String?,
    val estimatedCompletionDate: String?,
    val actualCompletionDate: String?
)
