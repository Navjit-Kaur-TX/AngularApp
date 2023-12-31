import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('http://localhost:3000/users')
  }
}
