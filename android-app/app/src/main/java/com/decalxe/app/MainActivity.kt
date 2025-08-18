package com.decalxe.app

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.decalxe.app.databinding.ActivityMainBinding
import com.decalxe.app.network.ApiClient
import com.decalxe.app.viewmodel.MainViewModel

class MainActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityMainBinding
    private lateinit var viewModel: MainViewModel
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupToolbar()
        setupViewModel()
        setupClickListeners()
        observeViewModel()
    }
    
    private fun setupToolbar() {
        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = getString(R.string.app_name)
    }
    
    private fun setupViewModel() {
        viewModel = ViewModelProvider(this)[MainViewModel::class.java]
    }
    
    private fun setupClickListeners() {
        binding.cardOrders.setOnClickListener {
            startActivity(Intent(this, OrdersActivity::class.java))
        }
        
        binding.cardCustomers.setOnClickListener {
            startActivity(Intent(this, CustomerActivity::class.java))
        }
        
        binding.cardDecals.setOnClickListener {
            // TODO: Implement Decals activity
            showToast("Chức năng Decal đang được phát triển")
        }
        
        binding.cardEmployees.setOnClickListener {
            // TODO: Implement Employees activity
            showToast("Chức năng Nhân viên đang được phát triển")
        }
        
        binding.fab.setOnClickListener {
            // TODO: Implement quick add functionality
            showToast("Thêm mới nhanh")
        }
    }
    
    private fun observeViewModel() {
        viewModel.isLoading.observe(this) { isLoading ->
            // TODO: Show/hide loading indicator
        }
        
        viewModel.error.observe(this) { error ->
            error?.let {
                showToast("Lỗi: $it")
            }
        }
    }
    
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}