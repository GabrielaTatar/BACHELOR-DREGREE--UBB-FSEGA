import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nutritionist } from '../models/nutritionist';
import { StorageService } from './storage.service';

const API_URL = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'withCredentials': 'true' })
};

@Injectable({
  providedIn: 'root',
})
export class NutritionistiService {
  constructor(private http: HttpClient, private storageService: StorageService) {}


  getData(): Observable<any> {
    // const userToken = this.storageService.getUserToken().token;
    // httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    // console.log(userToken);
    console.log(httpOptions);
    const response = this.http.get(API_URL + 'nutritionisti', {responseType: 'json', headers:  httpOptions.headers, withCredentials: true});
    return response;
  }

}
