package com.example.decalxeandroid.data.dto

import com.google.gson.annotations.SerializedName

data class CustomerDto(
    @SerializedName("customerID")
    val customerID: String,
    @SerializedName("firstName")
    val firstName: String,
    @SerializedName("lastName")
    val lastName: String,
    @SerializedName("phoneNumber")
    val phoneNumber: String,
    @SerializedName("email")
    val email: String?,
    @SerializedName("address")
    val address: String?,
    @SerializedName("dateOfBirth")
    val dateOfBirth: String?,
    @SerializedName("gender")
    val gender: String?,
    @SerializedName("isActive")
    val isActive: Boolean
)
