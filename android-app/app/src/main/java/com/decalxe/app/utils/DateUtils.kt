package com.decalxe.app.utils

import java.text.SimpleDateFormat
import java.util.*

object DateUtils {
    
    private val apiDateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
    private val displayDateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
    private val displayDateTimeFormat = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault())
    
    fun formatDate(dateString: String): String {
        return try {
            val date = apiDateFormat.parse(dateString)
            date?.let { displayDateFormat.format(it) } ?: dateString
        } catch (e: Exception) {
            dateString
        }
    }
    
    fun formatDateTime(dateString: String): String {
        return try {
            val date = apiDateFormat.parse(dateString)
            date?.let { displayDateTimeFormat.format(it) } ?: dateString
        } catch (e: Exception) {
            dateString
        }
    }
    
    fun getCurrentDateString(): String {
        return apiDateFormat.format(Date())
    }
    
    fun isToday(dateString: String): Boolean {
        return try {
            val date = apiDateFormat.parse(dateString)
            val today = Calendar.getInstance()
            val dateCalendar = Calendar.getInstance()
            
            date?.let { dateCalendar.time = it }
            
            today.get(Calendar.YEAR) == dateCalendar.get(Calendar.YEAR) &&
            today.get(Calendar.DAY_OF_YEAR) == dateCalendar.get(Calendar.DAY_OF_YEAR)
        } catch (e: Exception) {
            false
        }
    }
}