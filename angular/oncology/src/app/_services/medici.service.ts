import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { StorageService } from './storage.service';

const API_URL = 'http://127.0.0.1:5000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    withCredentials: 'true',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MediciService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getData(): Observable<any> {
    // const userToken = this.storageService.getUserToken().token;
    // httpOptions.headers = httpOptions.headers.append("x-access-token", userToken);
    // console.log(userToken);
    //console.log(httpOptions);
    const response = this.http.get(API_URL + 'doctori', {
      responseType: 'json',
      headers: httpOptions.headers,
      withCredentials: true,
    });
    return response;
  }

  getDoctorInfoByDoctorId(id_doctor: number): Observable<any> {
    console.log(id_doctor);
    const userToken = this.storageService.getUserToken().token;
    if (!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append(
        'x-access-token',
        userToken
      );
    const response = this.http.get(
      API_URL + 'doctori/' + id_doctor,
      httpOptions
    );
    return response;
  }

  getUserInfoByUserId(id_user: number): Observable<any> {
    console.log(id_user);
    const userToken = this.storageService.getUserToken().token;
    if (!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append(
        'x-access-token',
        userToken
      );
    const response = this.http.get(
      API_URL + 'utilizatori/' + id_user,
      httpOptions
    );
    return response;
  }

  getDoctorInfoByCadreId(id_cadru: number): Observable<any> {
    console.log(id_cadru);
    if (id_cadru === null) {
      return new Observable<null>();
    }
    const userToken = this.storageService.getUserToken().token;
    if (!httpOptions.headers.has('x-access-token'))
      httpOptions.headers = httpOptions.headers.append(
        'x-access-token',
        userToken
      );
    const response = this.http.get(
      API_URL + 'doctorDupaIdCadru/' + id_cadru,
      httpOptions
    );
    return response;
  }
}
