package com.example.decalxeandroid.data.remote

import com.example.decalxeandroid.data.dto.LoginRequestDto
import com.example.decalxeandroid.data.dto.LoginResponseDto
import com.example.decalxeandroid.data.dto.RegisterRequestDto
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApiService {
    @POST("Auth/login")
    suspend fun login(@Body request: LoginRequestDto): LoginResponseDto
    
    @POST("Auth/register")
    suspend fun register(@Body request: RegisterRequestDto): String
    
    @POST("Auth/logout")
    suspend fun logout(): String
    
    @POST("Auth/refresh-token")
    suspend fun refreshToken(@Body request: Map<String, String>): LoginResponseDto
    
    @POST("Auth/reset-password-by-username")
    suspend fun resetPassword(@Body request: Map<String, String>): String
}
