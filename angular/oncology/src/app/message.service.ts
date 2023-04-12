import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  // add a message to the cache memory
  add(message: string) {
    this.messages.push(message);

  }

  // delete or clear la cache memory
  clear() {
    this.messages = [];
  }

  constructor() { }
}
