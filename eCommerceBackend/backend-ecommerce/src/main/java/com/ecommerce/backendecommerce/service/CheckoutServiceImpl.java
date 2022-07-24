package com.ecommerce.backendecommerce.service;

import com.ecommerce.backendecommerce.dao.CustomerRepository;
import com.ecommerce.backendecommerce.dto.Purchase;
import com.ecommerce.backendecommerce.dto.PurchaseResponse;
import com.ecommerce.backendecommerce.entity.Customer;
import com.ecommerce.backendecommerce.entity.Order;
import com.ecommerce.backendecommerce.entity.OrderItem;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{
    //checkoutController -> checkoutService -> JPA Repository (DB)
    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //Die Infos aus dto
        Order order = purchase.getOrder();

        //Tracking nummer generieren
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //Ordner with OrderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        try{
            orderItems.forEach(item -> order.add(item));
        }catch(Exception e){
            System.err.println(e.getMessage());
        }


        //BillingAdress und ShippingAdress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //customer mit order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        //save in der DataBase
        customerRepository.save(customer);

        //return a response
        return new PurchaseResponse(orderTrackingNumber);
    }


    private String generateOrderTrackingNumber() {
        //Randum UUID Number
        return UUID.randomUUID().toString();
    }
}
