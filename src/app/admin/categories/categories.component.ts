import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/model/product-category';
import { AuthService } from 'src/app/services/auth.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  urlState!: any;
  isAdmin:boolean = false;
  categories!: ProductCategory[];
  //categories
  constructor(private routeActif: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private productCatService: ProductCategoryService) { }

  ngOnInit(): void {
    this.urlState = this.route.snapshot.url[2].toString();
    this.productCatService.getProductCategories().subscribe(
      (data) =>{
        this.categories = data
      }
    )

    this.authService.isAdmin.subscribe(
      data => this.isAdmin = data
    )
  }

  remove(id: number):void{

    this.productCatService.deleteProductCategory(id).subscribe(
      (data) =>{
        this.ngOnInit();
      }
    );

  }

}
