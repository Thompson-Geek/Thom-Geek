import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrency() {
    return this.http.get(`${environment.apiURL}latest?base=EUR`)
  }
}
