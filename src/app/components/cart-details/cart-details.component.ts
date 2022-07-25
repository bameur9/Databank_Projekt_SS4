import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  constructor(public cartService: CartService, public route: Router) { }

  ngOnInit(): void {
    this. listDetailsCart();
  }
  listDetailsCart() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data =>this.totalQuantity = data
    );
    /*
    this.cartService.cartItems.forEach(
      i =>{
        this.totalQuantity += i.quantity;
        this.totalPrice += i.unitPrice;
      }
    )
    */
  }

  incrementQunatity(item: CartItem){
    this.cartService.addToCart(item);
  }

  decrementQunatity(item: CartItem){
    this.cartService.decrementQuantity(item);
  }

  remove(item: CartItem){
    this.cartService.remove(item);
  }

  checkout():void{

    if(localStorage.length === 0 ){
      this.route.navigate(['login']);
    }else {
      this.route.navigate(['checkout']);
    }

  }



}
