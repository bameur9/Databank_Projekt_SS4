package com.ecommerce.backendecommerce.controller;

import com.ecommerce.backendecommerce.dto.Purchase;
import com.ecommerce.backendecommerce.dto.PurchaseResponse;
import com.ecommerce.backendecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }


    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }

}
