import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
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
  imageUrl!:string;
  active!:boolean;
  unitsInStock!: number;



  constructor(private productService: ProductService,
                  private routeActif: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.getCurrentProduct();


    //check if id parameter is avaible
    const productIdExist: boolean = this.routeActif.snapshot.paramMap.has('id');
    if(productIdExist){
      this.productActionParam= this.routeActif.snapshot.paramMap.get('action')!;
      this.productIdParam= this.routeActif.snapshot.paramMap.get('id')!;
    }
    if(this.productActionParam === 'edit'){
      this.action = "Edit";
    }else{
      this.action = "Create";
    }
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


  formSubmit():void{
    let product:Product = new Product();
    const productId: number = Number(this.routeActif.snapshot.paramMap.get('id'));

    product.sku = this.sku;
    product.name = this.name;
    product.description = this.description;
    product.unitPrice = this.unitPrice;
    product.unitsInStock = this.unitsInStock;
    product.active = this.active;
    product.imageUrl = this.imageUrl;

    if(this.productActionParam === 'edit'){
      this.productService.updateProduct(productId, product).subscribe(
        (data) =>{
          console.log(data)
        },
        (error) =>{
          console.log(error)
        }
      )
      this.route.navigate(['/admin/dashboard', productId])
    }else {

    }


  }


}
