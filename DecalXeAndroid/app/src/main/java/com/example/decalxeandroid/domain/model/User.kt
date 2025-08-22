package com.example.decalxeandroid.domain.model

data class User(
    val accountID: String,
    val username: String,
    val email: String?,
    val role: String,
    val accountRoleName: String,
    val isActive: Boolean
)
