import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/model/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-edit-create-category',
  templateUrl: './edit-create-category.component.html',
  styleUrls: ['./edit-create-category.component.css']
})
export class EditCreateCategoryComponent implements OnInit {
  action!: string;
  categoryActionParam!: string;
  categoryIdParam!:number;
  category!: ProductCategory;
  name!: string;

  constructor(private routeActif: ActivatedRoute,
              private catService: ProductCategoryService,
              private route:Router) {

              }

  ngOnInit(): void {
    const productIdExist: boolean = this.routeActif.snapshot.paramMap.has('id');
    if(productIdExist){
      this.categoryActionParam= this.routeActif.snapshot.paramMap.get('action')!;
      this.categoryIdParam= Number(this.routeActif.snapshot.paramMap.get('id')!);
    }

    if(this.categoryActionParam === 'edit'){
      this.action = 'edit';
      this.getCurrentCategory();

    }else if(this.categoryActionParam === 'create'){
      this.action = 'create';
    }
  }

  getCurrentCategory():void{
    this.catService.getProductCategoryById(this.categoryIdParam).subscribe(
      (data) => {
        this.category = data;
        this.name = data.categoryName;
      }
    )
  }

  formSubmit():void{
    let newCat = new ProductCategory();
    newCat.categoryName = this.name;

    if(this.categoryActionParam === 'edit'){
      this.catService.updateCategory(this.categoryIdParam, newCat).subscribe();

    }else if(this.categoryActionParam === 'create'){
      this.catService.createCategory(newCat).subscribe();
    }
    this.ngOnInit();
    this.route.navigate(['/admin/dashboard/categories/']);

  }

}
