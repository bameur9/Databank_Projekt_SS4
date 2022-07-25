import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  quantityValue: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getProductDetail();
    this.authService.loadUserAuthentictatedUserFromLocalStorage();
  }

  valueMinus():void{
    if(this.quantityValue > 1){
      this.quantityValue--;
    }
  }

  valuePlus():void{
    this.quantityValue++;
  }

  getProductDetail():void{
    const productId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(productId).subscribe(
      data =>{
        this.product = data;
      }
    )
  }

  addToCart():void{
     let cartItem = new CartItem(this.product, this.quantityValue);
     this.cartService.addToCart(cartItem);
  }



}
