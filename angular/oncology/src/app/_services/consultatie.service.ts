import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'withCredentials': 'true' })
};

@Injectable({
  providedIn: 'root',
})
export class ConsultatieService {
  isAppointmentDone: any;
  saveAppointment: any;

  constructor(private http: HttpClient, private storageService: StorageService) {}



  getData(): Observable<any> {
    const file_medical_id = this.storageService.getUserMedicalFileId();
    const userToken = this.storageService.getUserToken().token;
    if(!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    //console.log(userToken);
    //console.log(file_medical_id);
    //console.log(httpOptions);
    const response = this.http.get(AUTH_API + 'consultatiiDupaFisa/'+ file_medical_id, {responseType: 'json', headers:  httpOptions.headers, withCredentials: true});
    return response;
  }

  adaugareConsultatie(data: Date, simptome: string, cadre_medicale_id_cadru: number): Observable<any> {
    const userToken = this.storageService.getUserToken().token;
    const fisa_medicala_id_fisa = this.storageService.getUserMedicalFileId()
    if(!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    let diagnostic = "";
    let durata = "";
    let pret = "";
    let schema_tratament = "";
    console.log(userToken);
    console.log(fisa_medicala_id_fisa);
    console.log(data);
    console.log(simptome);
    console.log(cadre_medicale_id_cadru);
    return this.http.post(
      AUTH_API + 'consultatii',
      {
        data,
        simptome,
        diagnostic,
        durata,
        pret,
        schema_tratament,
        fisa_medicala_id_fisa,
        cadre_medicale_id_cadru
      },
      httpOptions
    );
  }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  // }


}
