package com.decalxe.app.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.decalxe.app.model.Customer
import com.decalxe.app.network.ApiClient
import com.decalxe.app.network.ApiResult
import com.decalxe.app.network.safeApiCall
import kotlinx.coroutines.launch

class CustomersViewModel : ViewModel() {
    
    private val _customers = MutableLiveData<List<Customer>>()
    val customers: LiveData<List<Customer>> = _customers
    
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading
    
    private val _error = MutableLiveData<String?>()
    val error: LiveData<String?> = _error
    
    private var currentPage = 1
    private val pageSize = 20
    private var isLastPage = false
    
    fun loadCustomers() {
        if (_isLoading.value == true) return
        
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            
            when (val result = safeApiCall { 
                ApiClient.apiService.getCustomers(
                    pageNumber = currentPage,
                    pageSize = pageSize
                )
            }) {
                is ApiResult.Success -> {
                    val newCustomers = result.data.items
                    
                    if (currentPage == 1) {
                        _customers.value = newCustomers
                    } else {
                        val currentCustomers = _customers.value?.toMutableList() ?: mutableListOf()
                        currentCustomers.addAll(newCustomers)
                        _customers.value = currentCustomers
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
    
    fun refreshCustomers() {
        currentPage = 1
        isLastPage = false
        loadCustomers()
    }
    
    fun loadMoreCustomers() {
        if (!isLastPage && _isLoading.value != true) {
            currentPage++
            loadCustomers()
        }
    }
    
    fun searchCustomers(query: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            
            when (val result = safeApiCall { 
                ApiClient.apiService.getCustomers(
                    pageNumber = 1,
                    pageSize = pageSize,
                    search = query
                )
            }) {
                is ApiResult.Success -> {
                    _customers.value = result.data.items
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
    
    fun clearError() {
        _error.value = null
    }
}