import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Plan_alimentar } from '../models/plan_alimentar';
import { Terapie } from '../models/terapie';

const API_URL = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'withCredentials': 'true' })
};

@Injectable({
  providedIn: 'root'
})

export class InformatiiService  {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getPlanuriAlimentare(): Observable<any> {

    const response = this.http.get(API_URL + 'planuri_alimentare', {responseType: 'json', headers:  httpOptions.headers, withCredentials: true});
    return response;
  }

  getTerapii(): Observable<any> {

    const response = this.http.get(API_URL + 'terapii', {responseType: 'json', headers:  httpOptions.headers, withCredentials: true});
    return response;
  }
}
