package com.example.decalxeandroid.domain.repository

import com.example.decalxeandroid.domain.model.Customer
import kotlinx.coroutines.flow.Flow

interface CustomerRepository {
    suspend fun getCustomers(): Result<List<Customer>>
    suspend fun getCustomerById(id: String): Result<Customer>
    suspend fun createCustomer(customer: Customer): Result<Customer>
    suspend fun updateCustomer(id: String, customer: Customer): Result<Customer>
    suspend fun deleteCustomer(id: String): Result<Unit>
    suspend fun searchCustomers(searchTerm: String): Result<List<Customer>>
}
