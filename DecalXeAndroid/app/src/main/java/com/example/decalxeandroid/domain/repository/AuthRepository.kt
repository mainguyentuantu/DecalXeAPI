package com.example.decalxeandroid.domain.repository

import com.example.decalxeandroid.domain.model.AuthResult
import com.example.decalxeandroid.domain.model.User
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    suspend fun login(username: String, password: String): AuthResult
    suspend fun register(username: String, password: String, roleID: String): AuthResult
    suspend fun logout(): Result<Unit>
    suspend fun refreshToken(accessToken: String, refreshToken: String): AuthResult
    suspend fun resetPassword(username: String): Result<Unit>
    
    // Local storage operations
    suspend fun saveAuthData(accessToken: String, refreshToken: String, user: User)
    suspend fun getStoredAuthData(): Triple<String?, String?, User?>?
    suspend fun clearAuthData()
    suspend fun isLoggedIn(): Boolean
    suspend fun getCurrentUser(): User?
}
