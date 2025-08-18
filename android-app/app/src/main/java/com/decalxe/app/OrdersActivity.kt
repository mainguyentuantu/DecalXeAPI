package com.decalxe.app

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.decalxe.app.adapter.OrdersAdapter
import com.decalxe.app.databinding.ActivityOrdersBinding
import com.decalxe.app.model.Order
import com.decalxe.app.viewmodel.OrdersViewModel

class OrdersActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityOrdersBinding
    private lateinit var viewModel: OrdersViewModel
    private lateinit var ordersAdapter: OrdersAdapter
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOrdersBinding.inflate(layoutInflater)
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
        ordersAdapter = OrdersAdapter { order ->
            // Handle order item click
            showToast("Xem chi tiết đơn hàng #${order.id}")
        }
        
        binding.recyclerViewOrders.apply {
            layoutManager = LinearLayoutManager(this@OrdersActivity)
            adapter = ordersAdapter
        }
    }
    
    private fun setupViewModel() {
        viewModel = ViewModelProvider(this)[OrdersViewModel::class.java]
        viewModel.loadOrders()
    }
    
    private fun setupListeners() {
        binding.swipeRefresh.setOnRefreshListener {
            viewModel.refreshOrders()
        }
        
        binding.fabAddOrder.setOnClickListener {
            // TODO: Implement add order functionality
            showToast("Thêm đơn hàng mới")
        }
    }
    
    private fun observeViewModel() {
        viewModel.orders.observe(this) { orders ->
            ordersAdapter.submitList(orders)
            updateEmptyState(orders.isEmpty())
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
        binding.recyclerViewOrders.visibility = if (isEmpty) View.GONE else View.VISIBLE
    }
    
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}