package com.ecommerce.backendecommerce.service;

import com.ecommerce.backendecommerce.dto.Purchase;
import com.ecommerce.backendecommerce.dto.PurchaseResponse;


public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
