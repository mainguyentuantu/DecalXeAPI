package com.decalxe.app.adapter

import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.decalxe.app.R
import com.decalxe.app.databinding.ItemOrderBinding
import com.decalxe.app.model.Order
import com.decalxe.app.utils.DateUtils
import com.decalxe.app.utils.PriceUtils
import java.text.NumberFormat
import java.util.*

class OrdersAdapter(
    private val onOrderClick: (Order) -> Unit
) : ListAdapter<Order, OrdersAdapter.OrderViewHolder>(OrderDiffCallback()) {
    
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val binding = ItemOrderBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return OrderViewHolder(binding)
    }
    
    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
    
    inner class OrderViewHolder(
        private val binding: ItemOrderBinding
    ) : RecyclerView.ViewHolder(binding.root) {
        
        fun bind(order: Order) {
            binding.apply {
                textOrderId.text = "#${order.id}"
                textCustomerName.text = order.customer?.name ?: "Khách hàng không xác định"
                textOrderDate.text = DateUtils.formatDate(order.orderDate)
                textTotalAmount.text = PriceUtils.formatPrice(order.totalAmount)
                
                // Set status with appropriate color
                textOrderStatus.text = getStatusText(order.status)
                textOrderStatus.setBackgroundColor(getStatusColor(order.status))
                
                buttonViewDetails.setOnClickListener {
                    onOrderClick(order)
                }
                
                root.setOnClickListener {
                    onOrderClick(order)
                }
            }
        }
        
        private fun getStatusText(status: String): String {
            return when (status.lowercase()) {
                "pending" -> "Chờ xử lý"
                "in_progress" -> "Đang xử lý"
                "completed" -> "Hoàn thành"
                "cancelled" -> "Đã hủy"
                else -> status
            }
        }
        
        private fun getStatusColor(status: String): Int {
            return when (status.lowercase()) {
                "pending" -> Color.parseColor("#FFC107") // Yellow
                "in_progress" -> Color.parseColor("#2196F3") // Blue
                "completed" -> Color.parseColor("#4CAF50") // Green
                "cancelled" -> Color.parseColor("#F44336") // Red
                else -> Color.parseColor("#757575") // Gray
            }
        }
    }
    
    class OrderDiffCallback : DiffUtil.ItemCallback<Order>() {
        override fun areItemsTheSame(oldItem: Order, newItem: Order): Boolean {
            return oldItem.id == newItem.id
        }
        
        override fun areContentsTheSame(oldItem: Order, newItem: Order): Boolean {
            return oldItem == newItem
        }
    }
}