import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Purchase } from '../model/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl ='http://localhost:8080/api/checkout/purchase';


  constructor(private http: HttpClient) { }

  savePurchase(purchase : Purchase): Observable<any>{
    return this.http.post<Purchase>(this. purchaseUrl, purchase);
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

}
