package com.example.decalxeandroid.data.mapper

import com.example.decalxeandroid.data.dto.LoginResponseDto
import com.example.decalxeandroid.data.dto.UserDataDto
import com.example.decalxeandroid.domain.model.AuthResult
import com.example.decalxeandroid.domain.model.User

object AuthMapper {
    fun mapLoginResponseToAuthResult(response: LoginResponseDto): AuthResult.Success {
        return AuthResult.Success(
            accessToken = response.accessToken,
            refreshToken = response.refreshToken,
            user = mapUserDataToUser(response.user)
        )
    }
    
    fun mapUserDataToUser(userData: UserDataDto): User {
        return User(
            accountID = userData.accountID,
            username = userData.username,
            email = userData.email,
            role = userData.role,
            accountRoleName = userData.accountRoleName,
            isActive = userData.isActive
        )
    }
}
