import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'withCredentials': 'true' })
};

@Injectable({
  providedIn: 'root'
})
export class PacientiService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getPacientInfoByPacientId(id_pacient: number): Observable<any> {
    const userToken = this.storageService.getUserToken().token;
    if(!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    const response = this.http.get(
      AUTH_API + 'pacienti/' + id_pacient,
      httpOptions
    );
    return response;
  }

  getPacientInfoByConsultId(id_consultatie: number): Observable<any> {
    const userToken = this.storageService.getUserToken().token;
    if(!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    const response = this.http.get(
      AUTH_API + 'pacientDinConsultatie/' + id_consultatie,
      httpOptions
    );
    return response;
  }

  getPacientiForDoc(cadre_medicale_id_cadru: string): Observable<any> {
    const userToken = this.storageService.getUserToken().token;
    if(!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);

    const response = this.http.get(AUTH_API + 'pacientiDupaCM/'+ cadre_medicale_id_cadru, {responseType: 'json', headers:  httpOptions.headers, withCredentials: true});
    return response;
  }
}
