package com.example.decalxeandroid.data.dto

import com.google.gson.annotations.SerializedName

data class RegisterRequestDto(
    @SerializedName("username")
    val username: String,
    @SerializedName("password")
    val password: String,
    @SerializedName("roleID")
    val roleID: String
)
