package com.example.decalxeandroid.data.mapper

import com.example.decalxeandroid.data.dto.CustomerDto
import com.example.decalxeandroid.domain.model.Customer

object CustomerMapper {
    fun mapCustomerDtoToCustomer(dto: CustomerDto): Customer {
        return Customer(
            customerID = dto.customerID,
            firstName = dto.firstName,
            lastName = dto.lastName,
            phoneNumber = dto.phoneNumber,
            email = dto.email,
            address = dto.address,
            dateOfBirth = dto.dateOfBirth,
            gender = dto.gender,
            isActive = dto.isActive
        )
    }
    
    fun mapCustomerToCustomerDto(customer: Customer): CustomerDto {
        return CustomerDto(
            customerID = customer.customerID,
            firstName = customer.firstName,
            lastName = customer.lastName,
            phoneNumber = customer.phoneNumber,
            email = customer.email,
            address = customer.address,
            dateOfBirth = customer.dateOfBirth,
            gender = customer.gender,
            isActive = customer.isActive
        )
    }
    
    fun mapCustomerDtoListToCustomerList(dtoList: List<CustomerDto>): List<Customer> {
        return dtoList.map { mapCustomerDtoToCustomer(it) }
    }
}
