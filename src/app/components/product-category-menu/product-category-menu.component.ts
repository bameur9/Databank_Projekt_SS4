import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductCategory } from 'src/app/model/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import * as _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

 productCategories!: ProductCategory[];
 show:boolean =false;
 isAdmin:boolean = false;

  constructor(private productCategoryService: ProductCategoryService,
              private product : ProductService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loadUserAuthentictatedUserFromLocalStorage();
    this.authService.isAdmin.subscribe(
      data => this.isAdmin = data
    )

    this.lisProductCategories();

  }

  showCategories(){
    this.show = !this.show;
  }

  lisProductCategories(): void {
  this.productCategoryService.getProductCategories().subscribe(
    data =>{
      this.productCategories = data;
    }
  )
  }

}
