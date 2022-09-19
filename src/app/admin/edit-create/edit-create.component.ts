import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductCategory } from 'src/app/model/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { ShopValidator } from 'src/app/validator/shop-validator';

@Component({
  selector: 'app-edit-create',
  templateUrl: './edit-create.component.html',
  styleUrls: ['./edit-create.component.css']
})
export class EditCreateComponent implements OnInit {
  action!:string;
  productActionParam!:string;
  productIdParam!:string;
  product!:Product;
  id!: number;
  sku!: string;
  name!: string;
  description!: string;
  unitPrice!:number;
  imageUrl:string ="assets/images/products/1.jpg";
  active!:boolean;
  unitsInStock!: number;
  categories!: ProductCategory[];
  category!: ProductCategory;



  constructor(private productService: ProductService,
                  private routeActif: ActivatedRoute, private route: Router,
                  private catService:ProductCategoryService) {

                  }

  ngOnInit(): void {
    //check if id parameter is avaible
    const productIdExist: boolean = this.routeActif.snapshot.paramMap.has('id');
    if(productIdExist){
      this.productActionParam= this.routeActif.snapshot.paramMap.get('action')!;
      this.productIdParam= this.routeActif.snapshot.paramMap.get('id')!;
    }

    if(this.productActionParam === 'edit'){
      this.action = "Edit";
      this.currentProductCategory();
      this.getCurrentProduct();
    }else if(this.productActionParam == 'create'){
      this.action = "Create";
      this.catService.getProductCategories().subscribe(
        (data) =>{
        this.categories = data;
        this.category = data[0];}
      )
    }

  }

  currentProductCategory():void {

    this.productService.getCategoryByProduct(Number(this.productIdParam)).subscribe(
      (dataCat) =>{
        this.category=dataCat;
      }
    )
  }

  getCurrentProduct():void{

    const productId: number = Number(this.routeActif.snapshot.paramMap.get('id'));

    this.productService.getProduct(productId).subscribe(
      data =>{
        this.product = data;
        this.sku = data.sku;
        this.name = data.name;
        this.id =data.id;
        this.description = data.description;
        this.unitPrice = data.unitPrice;
        this.unitsInStock = data.unitsInStock;
        this.active = data.active;
        this.imageUrl = data.imageUrl;
      }
    )
  }

  selectFile(event:any){
    if(event.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) =>{
        this.imageUrl = event.target.result;
        console.log(this.imageUrl);
      }
    }
  }


  formSubmit():void{
    const productId: number = Number(this.routeActif.snapshot.paramMap.get('id'));
    this.product = new Product();
    this.product.sku = this.sku;
    this.product.name = this.name;
    this.product.description = this.description;
    this.product.unitPrice = this.unitPrice;
    this.product.unitsInStock = this.unitsInStock;
    this.product.active = this.active;
    this.product.imageUrl = "assets/images/products/tv/"+"tv-01.jpg";
    this.product.category = this.category;
    this.product.active = true;

    if(this.productActionParam === 'edit'){
      this.productService.updateProduct(productId, this.product).subscribe(
        (data) =>{
          console.log(data);
          this.productService.getCategoryByProduct(data.id).subscribe(
            (dataCat) =>{
               this.route.navigate(['/admin/dashboard/productCategories/', dataCat.id]);
            }
          )
        },
        (error) =>{
          console.log(error)
        }
      )
    }else if(this.productActionParam === 'create'){

     this.product.category = this.category;

     console.log(this.product);
     this.productService.createProduct(this.product).subscribe();
     this.route.navigate(['/admin/dashboard/productCategories/']);
    }


  }


}
