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
export class FisaMedicalaService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getFisaMedicalaByPacient(pacienti_id_pacient: number): Observable<any> {
    //console.log(pacienti_id_pacient)
    const userToken = this.storageService.getUserToken().token;
    //console.log(userToken)
    if(!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    //console.log(httpOptions)
    //console.log(AUTH_API + 'fisa_medicala_dupa_pacient/${pacienti_id_pacient}')
    const response = this.http.get(
      AUTH_API + 'fisa_medicala_dupa_pacient/' + pacienti_id_pacient,
      httpOptions
    );
    return response;
  }

  getFisaMedicalaByFM(id_fisa: number): Observable<any> {
    const userToken = this.storageService.getUserToken().token;
    if(!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);

    const response = this.http.get(
      AUTH_API + 'fisa_medicala/' + id_fisa,
      httpOptions
    );
    return response;
  }

}
