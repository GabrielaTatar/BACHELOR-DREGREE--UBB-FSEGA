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
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(nume_utilizator: string, parola: string): Observable<any> {
    const str = nume_utilizator + ":" + parola;
    const response = this.http.get(
      AUTH_API + 'login',
      {responseType: 'json', headers:  new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Authorization": "Basic " + btoa(str) }), withCredentials: true}
    );
    return response;
  }

  register(nume_utilizator: string, parola: string, email: string, nume: string, prenume: string, CNP: string, nr_telefon: number, judet: string, localitate: string, adresa: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'pacienti',
      {
        nume_utilizator,
        parola,
        email,
        nume,
        prenume,
        CNP,
        nr_telefon,
        judet,
        localitate,
        adresa,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
