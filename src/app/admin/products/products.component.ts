import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { thumbsDownIcon } from '@cds/core/icon';
import { Product } from 'src/app/model/product';
import { ProductCategory } from 'src/app/model/product-category';
import { AuthService } from 'src/app/services/auth.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] =[];
  currentCategoryId!:number;
  previousCategoryId!: number;
  productKeyWordParam!:string;
  categorieID:number = 0;
  productCategories!: ProductCategory[];
  show:boolean = false;
  isAdmin:boolean = false;

  pageNumber: number = 1;
  size: number = 10;
  totalElements:number =0;
  previouskeyword: any;
  urlState!: any;


  constructor(private productService: ProductService,
    private productCategoryService :ProductCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    })
    this.authService.isAdmin.subscribe(
      data => this.isAdmin = data
    )
    this.listProducts();
    this.lisProductCategories();
    this.urlState = this.route.snapshot.url[2].toString();
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

  listProducts():void{
    //check if id parameter is avaible
    const categoryIdExist: boolean = this.route.snapshot.paramMap.has('id');


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

  editOrCreate(action:string,id: number):void{
      if(id > 0){
        //edit
        this.router.navigate(['/admin/dashboard/productCategories/{action}/{id}']);

      }else {
        // create
        this.router.navigate(['/admin/dashboard/productCategories/create']);
      }
  }

  remove(id: number):void{
    //admin/dashboard/:action/:id
    this.productService.removeProduct(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
      (error) =>{
        console.log(error);
      }
    );
    this.ngOnInit();
  }



}
