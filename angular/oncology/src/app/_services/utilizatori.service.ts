import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://127.0.0.1:5000/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getPublicContent: any;
  constructor(private http: HttpClient) {}


  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'utilizatori', { responseType: 'text' });
  }

}
