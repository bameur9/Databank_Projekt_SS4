import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../model/country';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map( response => response._embedded.countries )
    );
  }

  getStates(countryCode: string): Observable<State[]> {
    //http://localhost:8080/api/states/search/findByCountryCode?code=DE

    const url = `${this.statesUrl}/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<GetResponseState>(url).pipe(
      map(response => response._embedded.states)
    );
  }

}
interface GetResponseState{
  _embedded:{
    states: State[];
  }
}

interface GetResponseCountries{
  _embedded: {
    countries: Country[];
  }
}
