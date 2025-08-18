package com.decalxe.app

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.decalxe.app.adapter.CustomersAdapter
import com.decalxe.app.databinding.ActivityCustomerBinding
import com.decalxe.app.model.Customer
import com.decalxe.app.viewmodel.CustomersViewModel

class CustomerActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityCustomerBinding
    private lateinit var viewModel: CustomersViewModel
    private lateinit var customersAdapter: CustomersAdapter
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCustomerBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupToolbar()
        setupRecyclerView()
        setupViewModel()
        setupListeners()
        observeViewModel()
    }
    
    private fun setupToolbar() {
        setSupportActionBar(binding.toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        binding.toolbar.setNavigationOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }
    }
    
    private fun setupRecyclerView() {
        customersAdapter = CustomersAdapter(
            onCustomerClick = { customer ->
                showToast("Xem chi tiết khách hàng: ${customer.name}")
            },
            onCustomerMenuClick = { customer ->
                showToast("Menu cho khách hàng: ${customer.name}")
            }
        )
        
        binding.recyclerViewCustomers.apply {
            layoutManager = LinearLayoutManager(this@CustomerActivity)
            adapter = customersAdapter
        }
    }
    
    private fun setupViewModel() {
        viewModel = ViewModelProvider(this)[CustomersViewModel::class.java]
        viewModel.loadCustomers()
    }
    
    private fun setupListeners() {
        binding.swipeRefresh.setOnRefreshListener {
            viewModel.refreshCustomers()
        }
        
        binding.fabAddCustomer.setOnClickListener {
            // TODO: Implement add customer functionality
            showToast("Thêm khách hàng mới")
        }
    }
    
    private fun observeViewModel() {
        viewModel.customers.observe(this) { customers ->
            customersAdapter.submitList(customers)
            updateEmptyState(customers.isEmpty())
        }
        
        viewModel.isLoading.observe(this) { isLoading ->
            binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
            binding.swipeRefresh.isRefreshing = false
        }
        
        viewModel.error.observe(this) { error ->
            error?.let {
                showToast("Lỗi: $it")
                viewModel.clearError()
            }
        }
    }
    
    private fun updateEmptyState(isEmpty: Boolean) {
        binding.layoutEmptyState.visibility = if (isEmpty) View.VISIBLE else View.GONE
        binding.recyclerViewCustomers.visibility = if (isEmpty) View.GONE else View.VISIBLE
    }
    
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}