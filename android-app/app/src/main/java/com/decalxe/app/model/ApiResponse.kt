package com.decalxe.app.model

import com.google.gson.annotations.SerializedName

data class ApiResponse<T>(
    @SerializedName("success")
    val success: Boolean,
    
    @SerializedName("data")
    val data: T?,
    
    @SerializedName("message")
    val message: String?,
    
    @SerializedName("errors")
    val errors: List<String>?
)

data class PaginatedResponse<T>(
    @SerializedName("items")
    val items: List<T>,
    
    @SerializedName("totalCount")
    val totalCount: Int,
    
    @SerializedName("pageNumber")
    val pageNumber: Int,
    
    @SerializedName("pageSize")
    val pageSize: Int,
    
    @SerializedName("totalPages")
    val totalPages: Int,
    
    @SerializedName("hasPreviousPage")
    val hasPreviousPage: Boolean,
    
    @SerializedName("hasNextPage")
    val hasNextPage: Boolean
)