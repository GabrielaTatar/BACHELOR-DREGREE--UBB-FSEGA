import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MessageService } from './message.service';
import { Utilizator } from './models/utilizator';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private messageService: MessageService, private httpClient: HttpClient) { }

  getUser(id_utilizator: number): Observable<Utilizator>{
    const user = this.httpClient.get<Utilizator[]>('http://127.0.0.1:5000/utilizatori/<public_id>' + id_utilizator.toString);
    this.messageService.add('The UserService fetched the Users');
    return user;
  }

  getUsers(): Observable<Utilizator>{
    const users = this.httpClient.get<Utilizator[]>('http://127.0.0.1:5000/utilizatori');
    this.messageService.add('The UserService fetched the Users');
    return users;
  }
}
