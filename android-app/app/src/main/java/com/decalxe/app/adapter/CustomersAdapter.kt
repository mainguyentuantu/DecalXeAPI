package com.decalxe.app.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.decalxe.app.databinding.ItemCustomerBinding
import com.decalxe.app.model.Customer

class CustomersAdapter(
    private val onCustomerClick: (Customer) -> Unit,
    private val onCustomerMenuClick: (Customer) -> Unit
) : ListAdapter<Customer, CustomersAdapter.CustomerViewHolder>(CustomerDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomerViewHolder {
        val binding = ItemCustomerBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return CustomerViewHolder(binding)
    }
    
    override fun onBindViewHolder(holder: CustomerViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
    
    inner class CustomerViewHolder(
        private val binding: ItemCustomerBinding
    ) : RecyclerView.ViewHolder(binding.root) {
        
        fun bind(customer: Customer) {
            binding.apply {
                textCustomerName.text = customer.name
                textCustomerPhone.text = customer.phone ?: "Không có số điện thoại"
                
                // Show/hide email based on availability
                if (customer.email.isNullOrEmpty()) {
                    textCustomerEmail.visibility = View.GONE
                } else {
                    textCustomerEmail.visibility = View.VISIBLE
                    textCustomerEmail.text = customer.email
                }
                
                // Set customer initial
                textCustomerInitial.text = getCustomerInitial(customer.name)
                
                // Set click listeners
                root.setOnClickListener {
                    onCustomerClick(customer)
                }
                
                buttonCustomerMenu.setOnClickListener {
                    onCustomerMenuClick(customer)
                }
            }
        }
        
        private fun getCustomerInitial(name: String): String {
            return if (name.isNotEmpty()) {
                name.first().uppercase()
            } else {
                "?"
            }
        }
    }
    
    class CustomerDiffCallback : DiffUtil.ItemCallback<Customer>() {
        override fun areItemsTheSame(oldItem: Customer, newItem: Customer): Boolean {
            return oldItem.id == newItem.id
        }
        
        override fun areContentsTheSame(oldItem: Customer, newItem: Customer): Boolean {
            return oldItem == newItem
        }
    }
}