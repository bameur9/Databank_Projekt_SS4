import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../model/product-category';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
