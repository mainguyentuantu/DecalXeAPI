package com.example.decalxeandroid.data.mapper

import com.example.decalxeandroid.data.dto.OrderDto
import com.example.decalxeandroid.domain.model.Order

object OrderMapper {
    fun mapOrderDtoToOrder(dto: OrderDto): Order {
        return Order(
            orderID = dto.orderID,
            orderDate = dto.orderDate,
            orderStatus = dto.orderStatus,
            currentStage = dto.currentStage,
            totalAmount = dto.totalAmount,
            depositAmount = dto.depositAmount,
            remainingAmount = dto.remainingAmount,
            customerID = dto.customerID,
            customerFullName = dto.customerFullName,
            vehicleID = dto.vehicleID,
            vehicleLicensePlate = dto.vehicleLicensePlate,
            notes = dto.notes,
            estimatedCompletionDate = dto.estimatedCompletionDate,
            actualCompletionDate = dto.actualCompletionDate
        )
    }
    
    fun mapOrderToOrderDto(order: Order): OrderDto {
        return OrderDto(
            orderID = order.orderID,
            orderDate = order.orderDate,
            orderStatus = order.orderStatus,
            currentStage = order.currentStage,
            totalAmount = order.totalAmount,
            depositAmount = order.depositAmount,
            remainingAmount = order.remainingAmount,
            customerID = order.customerID,
            customerFullName = order.customerFullName,
            vehicleID = order.vehicleID,
            vehicleLicensePlate = order.vehicleLicensePlate,
            notes = order.notes,
            estimatedCompletionDate = order.estimatedCompletionDate,
            actualCompletionDate = order.actualCompletionDate
        )
    }
    
    fun mapOrderDtoListToOrderList(dtoList: List<OrderDto>): List<Order> {
        return dtoList.map { mapOrderDtoToOrder(it) }
    }
}
