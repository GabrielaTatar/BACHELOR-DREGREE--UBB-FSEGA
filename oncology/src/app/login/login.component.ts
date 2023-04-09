import { Component } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'demoApp';
  nume_utilizator!: string;
  parola!: string;
  rnume_utilizator!: string;
  rparola!: string;
  rconfirmare_parola!: string;
  remail!: string;
  rnume!: string;
  rprenume!: string;
  rCNP!: string;
  rnumar_telefon!: string;
  rjudet!: string;
  rlocalitate!: string;
  radresa!: string;


  register() {

  }

  login() {

  }
}
