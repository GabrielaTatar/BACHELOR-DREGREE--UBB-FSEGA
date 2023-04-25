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

  programarileMele(fisa_medicala_id_fisa: number, data: string): Observable<any> {
     const response = this.http.get(
       AUTH_API + 'consultatii/' + fisa_medicala_id_fisa + '?data=' + data,
       {responseType: 'json', headers:  new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": "Basic " }), withCredentials: true}
     );
     return response;
  }

  adaugareConsultatie(data: Date, simptome: string, cadre_medicale_id_cadru: number): Observable<any> {
    const userToken = this.storageService.getUserToken().token;
    const medicalFileId = this.storageService.getUserMedicalFileId()
    httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    //console.log(userToken);
    return this.http.post(
      AUTH_API + 'consultatii',
      {
        data,
        simptome,
        medicalFileId,
        cadre_medicale_id_cadru
      },
      httpOptions
    );
  }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  // }


}
