import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'withCredentials': 'true' })
};

@Injectable({
  providedIn: 'root'
})
export class PlanuriAlimentareService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getPlanuriAlimentare(): Observable<any> {

    const response = this.http.get(
      AUTH_API + 'planuri_alimentare',
      httpOptions
    );
    return response;
  }
}
