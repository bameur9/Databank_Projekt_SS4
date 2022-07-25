import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { orderBy } from 'lodash';
import { Address } from 'src/app/model/address';
import { CartItem } from 'src/app/model/cart-item';
import { Country } from 'src/app/model/country';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/order-item';
import { Product } from 'src/app/model/product';
import { Purchase } from 'src/app/model/purchase';
import { State } from 'src/app/model/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CountryStateService } from 'src/app/services/country-state.service';
import { ShopValidator } from 'src/app/validator/shop-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  countries: Country[]= [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private cartService: CartService,
              private formBuilder: FormBuilder,
              private countryStateService: CountryStateService,
              private checkoutService: CheckoutService,
              private route: Router) { }

  ngOnInit(): void {

    this.myFormGroup();
    this.listDetailsCart();
    this.countryList();

    if(this.totalPrice == 0){
      this.route.navigate(['/products']);
    }
  }

  getStates(formGroupName: string):void {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.countryStateService.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else {
          this.billingAddressStates = data;
        }
        //select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    )

  }

  countryList():void{
    this.countryStateService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  //build the form
  myFormGroup():void{
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidator.notOnlyWhiteSpace]),
        lastName: new FormControl('',  [Validators.required, Validators.minLength(2),ShopValidator.notOnlyWhiteSpace] ),
        email: new FormControl('', [Validators.required, Validators.email]),
      }),

      shippingAddress: this.formBuilder.group({
        street:  new FormControl('',  [Validators.required, Validators.minLength(2), ShopValidator.notOnlyWhiteSpace]),
        city:  new FormControl('',  [Validators.required, Validators.minLength(2), ShopValidator.notOnlyWhiteSpace]),
        state:  new FormControl('',  [Validators.required, Validators.minLength(2)]),
        country:  new FormControl('',  [Validators.required, Validators.minLength(2)]),
        zipCode:  new FormControl('',  [Validators.required, Validators.pattern("[0-9]{5}")]),

      }),

      billingAddress: this.formBuilder.group({
        street:  new FormControl('',  [Validators.required, Validators.minLength(2), ShopValidator.notOnlyWhiteSpace]),
        city:  new FormControl('',  [Validators.required, Validators.minLength(2), ShopValidator.notOnlyWhiteSpace]),
        state:  new FormControl('',  [Validators.required, Validators.minLength(2)]),
        country:  new FormControl('',  [Validators.required, Validators.minLength(2)]),
        zipCode:  new FormControl('',  [Validators.required, Validators.pattern("[0-9]{5}")]),
      }),

      creditCard: this.formBuilder.group({
        cartType:  new FormControl('', Validators.required),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2), ShopValidator.notOnlyWhiteSpace]),
        cardNumber:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode:  new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}")]),
        expirationMonth:  [''],
        expirationYear:  [''],
      })
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;

    this.checkoutService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    // populate credit card years
   this.checkoutService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.checkoutService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }


  listDetailsCart() {
    //give CartItems
    this.cartItems = this.cartService.cartItems;

    //give TotalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //give TotalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  copyShippingAddressToBillingAddress(event: any){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  //submit button is clicked
  OnSubmit(){
    let customer:Customer = this.checkoutFormGroup.get('customer')?.value;
    let shippingAddress:Address = this.checkoutFormGroup.get('shippingAddress')?.value;
    let billingAddress:Address = this.checkoutFormGroup.get('billingAddress')?.value;
    let totalQuantity:number = this.totalQuantity;
    let totalPrice:number = this.totalPrice;

    const shippingState: State = JSON.parse(JSON.stringify(shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(shippingAddress.country));

    shippingAddress.state = shippingState.name;
    shippingAddress.country = shippingCountry.name;

    const billingAddressState: State = JSON.parse(JSON.stringify(billingAddress.state));
    const billingAddressCountry: Country = JSON.parse(JSON.stringify(billingAddress.country));

    billingAddress.state = billingAddressState.name;
    billingAddress.country = billingAddressCountry.name;


    let order:Order={
      totalQuantity: this.totalQuantity,
      totalPrice: this.totalPrice,
    }


    let orderItems: OrderItem[] = this.cartItems.map(tempCartItem => new OrderItem(tempCartItem));


    let purchase: Purchase = {
      customer: customer,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      order: order,
      orderItems: orderItems
    };


    this.checkoutService.savePurchase(purchase).subscribe({

      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCart();

      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.route.navigateByUrl("/products");
  }

}
