package com.example.decalxeandroid.data.mapper

import com.example.decalxeandroid.data.dto.CustomerVehicleDto
import com.example.decalxeandroid.domain.model.CustomerVehicle

object CustomerVehicleMapper {
    fun mapCustomerVehicleDtoToCustomerVehicle(dto: CustomerVehicleDto): CustomerVehicle {
        return CustomerVehicle(
            vehicleID = dto.vehicleID,
            chassisNumber = dto.chassisNumber,
            licensePlate = dto.licensePlate,
            color = dto.color,
            year = dto.year,
            initialKM = dto.initialKM,
            customerID = dto.customerID,
            customerFullName = dto.customerFullName,
            modelID = dto.modelID,
            vehicleModelName = dto.vehicleModelName,
            vehicleBrandName = dto.vehicleBrandName
        )
    }
    
    fun mapCustomerVehicleToCustomerVehicleDto(vehicle: CustomerVehicle): CustomerVehicleDto {
        return CustomerVehicleDto(
            vehicleID = vehicle.vehicleID,
            chassisNumber = vehicle.chassisNumber,
            licensePlate = vehicle.licensePlate,
            color = vehicle.color,
            year = vehicle.year,
            initialKM = vehicle.initialKM,
            customerID = vehicle.customerID,
            customerFullName = vehicle.customerFullName,
            modelID = vehicle.modelID,
            vehicleModelName = vehicle.vehicleModelName,
            vehicleBrandName = vehicle.vehicleBrandName
        )
    }
    
    fun mapCustomerVehicleDtoListToCustomerVehicleList(dtoList: List<CustomerVehicleDto>): List<CustomerVehicle> {
        return dtoList.map { mapCustomerVehicleDtoToCustomerVehicle(it) }
    }
}
