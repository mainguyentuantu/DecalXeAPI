package com.decalxe.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.decalxe.app.model.Order
import com.decalxe.app.network.ApiClient
import com.decalxe.app.network.ApiResult
import com.decalxe.app.network.safeApiCall
import kotlinx.coroutines.launch

class OrdersViewModel : ViewModel() {
    
    private val _orders = MutableLiveData<List<Order>>()
    val orders: LiveData<List<Order>> = _orders
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    private val _error = MutableLiveData<String?>()
    val error: LiveData<String?> = _error
    
    private var currentPage = 1
    private val pageSize = 20
    private var isLastPage = false
    
    fun loadOrders() {
        if (_isLoading.value == true) return
        
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            
            when (val result = safeApiCall { 
                ApiClient.apiService.getOrders(
                    pageNumber = currentPage,
                    pageSize = pageSize
                )
            }) {
                is ApiResult.Success -> {
                    val newOrders = result.data.items
                    
                    if (currentPage == 1) {
                        _orders.value = newOrders
                    } else {
                        val currentOrders = _orders.value?.toMutableList() ?: mutableListOf()
                        currentOrders.addAll(newOrders)
                        _orders.value = currentOrders
                    }
                    
                    isLastPage = !result.data.hasNextPage
                }
                is ApiResult.Error -> {
                    _error.value = result.message
                }
                else -> {
                    _error.value = "Unknown error occurred"
                }
            }
            
            _isLoading.value = false
        }
    }
    
    fun refreshOrders() {
        currentPage = 1
        isLastPage = false
        loadOrders()
    }
    
    fun loadMoreOrders() {
        if (!isLastPage && _isLoading.value != true) {
            currentPage++
            loadOrders()
        }
    }
    
    fun searchOrders(query: String) {
        // TODO: Implement search functionality
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            
            // For now, just filter locally
            val allOrders = _orders.value ?: emptyList()
            val filteredOrders = if (query.isEmpty()) {
                allOrders
            } else {
                allOrders.filter { order ->
                    order.id.toString().contains(query, ignoreCase = true) ||
                    order.customer?.name?.contains(query, ignoreCase = true) == true ||
                    order.status.contains(query, ignoreCase = true)
                }
            }
            
            _orders.value = filteredOrders
            _isLoading.value = false
        }
    }
    
    fun clearError() {
        _error.value = null
    }
}