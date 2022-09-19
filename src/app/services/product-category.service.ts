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

  getProductCategoryById(id: number):Observable<ProductCategory>{
    //http://localhost:8080/api/product-category/1
    const url = `${this.categoryUrl}/${id}`;
    return this.httpClient.get<ProductCategory>(url);
  }

  deleteProductCategory(id:number): Observable<ProductCategory>{
    //http://localhost:8080/api/product-category/1

    const url = `${this.categoryUrl}/${id}`;
    return this.httpClient.delete<ProductCategory>(url);
  }

  updateCategory(id:number,  newCategory: ProductCategory): Observable<ProductCategory>{
    //http://localhost:8080/api/product-category/1

    const url = `${this.categoryUrl}/${id}`;
    return this.httpClient.put<ProductCategory>(url, newCategory);
  }

  createCategory(newCategory: ProductCategory): Observable<ProductCategory>{
    //http://localhost:8080/api/product-category/1
    return this.httpClient.post<ProductCategory>(this.categoryUrl, newCategory);
  }
}


interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
