import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Consultatie } from '../models/consultatie';


const API_URL = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'withCredentials': 'true' })
};

@Injectable({
  providedIn: 'root'
})
export class IstoricMedicalService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getConsultatii(): Observable<any> {
    const response = this.http.get(API_URL + 'consultatii', {responseType: 'json', headers:  httpOptions.headers, withCredentials: true});
    return response;  }

  getConsultatieById(id_consultatie: number): Observable<any> {
    console.log(id_consultatie)
    const userToken = this.storageService.getUserToken().token;
    httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    const response = this.http.get(
      API_URL + 'consultatii/' + id_consultatie,
      httpOptions
    );
    return response;  }

    getConsultatiiTrecute(): Observable<Consultatie[]> {
      const azi = new Date();
      const dataTrecuta = new Date(azi);
      dataTrecuta.setDate(azi.getDate() - 1);
      const dataTrecutaFormatata = dataTrecuta.toISOString().slice(0, 10);
      const url = `${API_URL}?data=<${dataTrecutaFormatata}`;
      return this.http.get<Consultatie[]>(url, httpOptions);
    }
}

