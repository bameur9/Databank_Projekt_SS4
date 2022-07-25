import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { thumbsUpIcon } from '@cds/core/icon';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  smallSearchInput!:boolean;
  products: Product[] =[];
  currentCategoryId!:number;
  previousCategoryId!: number;
  productKeyWordParam!:string;
  categorieID:number = 0;

  pageNumber: number = 1;
  size: number = 10;
  totalElements:number =0;
  previouskeyword: any;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private authService: AuthService) {}

  ngOnInit(): void {
     this.authService.loadUserAuthentictatedUserFromLocalStorage();
    this.smallSearchInput = false;
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    })

  }

  productWithPagination():void{
    this.productService.getProductListWithPagination(this.pageNumber - 1,
                                                      this.size,
                                                      this.currentCategoryId)
                        .subscribe(data =>{
                          this.products = data._embedded.products;
                          this.pageNumber = data.page.number +1;
                          this.size = data.page.size;
                          this.totalElements = data.page.totalElements;
                        });

  }

  searchProducts(){
      this.productKeyWordParam= this.route.snapshot.paramMap.get('keyword')!;

      this.productService.searchProductsWithPagination(this.pageNumber -1,
        this.size,
        this.productKeyWordParam).subscribe(data =>{
          this.products = data._embedded.products;
          this.pageNumber = data.page.number +1;
          this.size = data.page.size;
          this.totalElements = data.page.totalElements;
      })

  }

  listProducts():void{

    //check if id parameter is avaible
    const categoryIdExist: boolean = this.route.snapshot.paramMap.has('id');
    //check if keyword parameter is avaible
    const productKeyWord: boolean = this.route.snapshot.paramMap.has('keyword');
    if(productKeyWord){

      this.searchProducts();
      return;
    }


    if(categoryIdExist){
      //get the id param string. convert to a number with "+"
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
      this.categorieID = this.currentCategoryId;
    }else
    {
      //default id = 1
      this.currentCategoryId = 1;
    }

    //check if we have in different category id
    //if yes set Page number to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    //Productlist mit Pagination
    this.productWithPagination();
  }


  addToCart(tempProduct: Product):void {
    const cartItem = new CartItem(tempProduct, 1);

    this.cartService.addToCart(cartItem);
  }

}
