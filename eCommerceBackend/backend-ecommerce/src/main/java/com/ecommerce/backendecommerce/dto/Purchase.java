package com.ecommerce.backendecommerce.dto;

import com.ecommerce.backendecommerce.entity.Address;
import com.ecommerce.backendecommerce.entity.Customer;
import com.ecommerce.backendecommerce.entity.Order;
import com.ecommerce.backendecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
