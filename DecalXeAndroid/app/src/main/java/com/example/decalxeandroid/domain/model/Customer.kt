package com.example.decalxeandroid.domain.model

data class Customer(
    val customerID: String,
    val firstName: String,
    val lastName: String,
    val phoneNumber: String,
    val email: String?,
    val address: String?,
    val dateOfBirth: String?,
    val gender: String?,
    val isActive: Boolean
) {
    val fullName: String
        get() = "$firstName $lastName"
}
