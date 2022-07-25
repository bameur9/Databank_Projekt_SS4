import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  isAdmin!:boolean;
  user!:any;
  username:any='';


  constructor(private cartService: CartService,
            private authService: AuthService ) { }

  ngOnInit(): void {

    this.authService.isAdmin.subscribe(
      data => {
        this.isAdmin = data;
      }
    )
    this.updateStatus();
  }

  updateStatus() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data =>this.totalQuantity = data
    )

  }

}
