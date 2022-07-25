import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  storage: Storage = sessionStorage;

  totalPrice: Subject<number> = new ReplaySubject<number>(0);
  totalQuantity: Subject<number> = new ReplaySubject<number>(0);

  constructor() {
    //read data from storage                    //key
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if(data != null ){
      this.cartItems = data;
      //read from SessionStorage
      this.getTotalInCart();
    }

   }


   persistCartItems():void{
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
   }


  addToCart(cartItem : CartItem):void{
    let itemAlreadyExistInCart: boolean = false;
    let existingCartItem!: CartItem;

    if (this.cartItems.length > 0) {
     existingCartItem = this.cartItems?.find(i => cartItem.id === i.id)!;

      //true when item exist
     itemAlreadyExistInCart = (existingCartItem != undefined);

    }

    if(itemAlreadyExistInCart){
      //when product already exist, the quantity will be increment
      existingCartItem.quantity++;
    }else {
      //then add in the Cart
      this.cartItems.push(cartItem);
    }

    this.getTotalInCart();

  }

  getTotalInCart():void{
    let totalPriceValue:number =0;
    let totalQuantityValue: number = 0

    for (let curruentCartItem of Object.values(this.cartItems) ){
        totalPriceValue += curruentCartItem.quantity * curruentCartItem.unitPrice;
        totalQuantityValue += curruentCartItem.quantity;
    }

    //publish the new Values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);


    this.persistCartItems();

  }

  decrementQuantity(cartItem: CartItem):void{
    cartItem.quantity--;
    if(cartItem.quantity == 0){
      this.remove(cartItem)
    }else {
      this.getTotalInCart();
    }

  }

  remove(cartItem:CartItem):void{
    const index = this.cartItems.findIndex(c => cartItem.id == c.id);
    if(index > -1){
      this.cartItems.splice(index, 1);

    this.getTotalInCart();
    }
  }


}
