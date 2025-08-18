package com.decalxe.app.utils

import java.text.NumberFormat
import java.util.*

object PriceUtils {
    
    private val vietnameseLocale = Locale("vi", "VN")
    private val priceFormatter = NumberFormat.getCurrencyInstance(vietnameseLocale)
    
    fun formatPrice(amount: Double): String {
        return try {
            // Vietnamese currency formatting
            val formatted = NumberFormat.getNumberInstance(vietnameseLocale).format(amount)
            "$formatted đ"
        } catch (e: Exception) {
            "${amount.toLong()} đ"
        }
    }
    
    fun formatPriceShort(amount: Double): String {
        return when {
            amount >= 1_000_000 -> {
                val millions = amount / 1_000_000
                String.format(vietnameseLocale, "%.1fM đ", millions)
            }
            amount >= 1_000 -> {
                val thousands = amount / 1_000
                String.format(vietnameseLocale, "%.1fK đ", thousands)
            }
            else -> {
                "${amount.toLong()} đ"
            }
        }
    }
    
    fun parsePrice(priceString: String): Double {
        return try {
            priceString.replace("[^\\d.]".toRegex(), "").toDouble()
        } catch (e: Exception) {
            0.0
        }
    }
}