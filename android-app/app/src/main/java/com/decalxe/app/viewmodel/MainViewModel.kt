package com.decalxe.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.decalxe.app.network.ApiClient
import com.decalxe.app.network.ApiResult
import com.decalxe.app.network.safeApiCall
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    private val _error = MutableLiveData<String?>()
    val error: LiveData<String?> = _error
    
    private val _dashboardStats = MutableLiveData<DashboardStats>()
    val dashboardStats: LiveData<DashboardStats> = _dashboardStats
    
    init {
        loadDashboardStats()
    }
    
    private fun loadDashboardStats() {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            
            try {
                // Load basic stats from API
                val ordersResult = safeApiCall { ApiClient.apiService.getOrders(pageSize = 1) }
                val customersResult = safeApiCall { ApiClient.apiService.getCustomers(pageSize = 1) }
                val decalsResult = safeApiCall { ApiClient.apiService.getDecals(pageSize = 1) }
                val employeesResult = safeApiCall { ApiClient.apiService.getEmployees(pageSize = 1) }
                
                val stats = DashboardStats(
                    totalOrders = if (ordersResult is ApiResult.Success) ordersResult.data.totalCount else 0,
                    totalCustomers = if (customersResult is ApiResult.Success) customersResult.data.totalCount else 0,
                    totalDecals = if (decalsResult is ApiResult.Success) decalsResult.data.totalCount else 0,
                    totalEmployees = if (employeesResult is ApiResult.Success) employeesResult.data.totalCount else 0
                )
                
                _dashboardStats.value = stats
                
            } catch (e: Exception) {
                _error.value = e.localizedMessage
            } finally {
                _isLoading.value = false
            }
        }
    }
    
    fun refreshData() {
        loadDashboardStats()
    }
    
    fun clearError() {
        _error.value = null
    }
}

data class DashboardStats(
    val totalOrders: Int = 0,
    val totalCustomers: Int = 0,
    val totalDecals: Int = 0,
    val totalEmployees: Int = 0
)