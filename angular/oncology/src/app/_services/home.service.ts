import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Fisa_medicala } from '../models/fisa_medicala';

const AUTH_API = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'withCredentials': 'true' })
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getPacientByIdFisaMedicala(pacienti_id_pacient: number): Observable<any> {
    const response = this.http.get(
      AUTH_API + 'fisa_medicala/${pacienti_id_pacient}',
      {responseType: 'json', headers:  new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": "Basic " }), withCredentials: true}
    );
    return response;
  }

}
