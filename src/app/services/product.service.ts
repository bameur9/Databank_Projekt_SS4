import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId:number): Observable<Product[]>{
    //http://localhost:8080/api/products/search/findByCategoryId?id=9

    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProduct>(url).pipe(
      map(response => response._embedded.products )
    );
  }

  getProductByName(productKeyWord: string): Observable<Product[]>{
    //http://localhost:8080/api/products/search/findByNameContaining?name=Course

    const url = `${this.baseUrl}/search/findByNameContaining?name=${productKeyWord}`
    return this.httpClient.get<GetResponseProduct>(url).pipe(
      map(response => response._embedded.products )
    );
  }

  getProduct(productId: number): Observable<Product>{
     //http://localhost:8080/api/products/1

     const url = `${this.baseUrl}/${productId}`;
     return this.httpClient.get<Product>(url);
  }

  getProductListWithPagination(page: number,
                              pageSize: number,
                              categoryId: number): Observable<GetResponseProduct>{
     //http://localhost:8080/api/products/search/findByCategoryId?id=1&page=0&size=2
      const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
      return this.httpClient.get<GetResponseProduct>(url);
  }

  searchProductsWithPagination(page: number,
                              pageSize: number,
                              keyword: string):Observable<GetResponseProduct>{
    //http://localhost:8080/api/products/search/findByCategoryId?id=1&page=0&size=2
     const url = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;
     return this.httpClient.get<GetResponseProduct>(url);
  }

  removeProduct(productId: number): Observable<Product>{
    //http://localhost:8080/api/products/49

    const url = `${this.baseUrl}/${productId}`;
    return this.httpClient.delete<Product>(url);
  }

  updateProduct(productId: number, newProduct: Product):  Observable<Product>{
    //http://localhost:8080/api/products/49

    const url = `${this.baseUrl}/${productId}`;

    return this.httpClient.put<Product>(url, newProduct);
  }

}

interface GetResponseProduct{
    _embedded: {
      products: Product[];
    },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
  }
}

