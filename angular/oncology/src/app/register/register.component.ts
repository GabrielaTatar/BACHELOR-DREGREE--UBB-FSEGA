import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  form: any = {
    nume_utilizator: null,
    parola: null,
    email: null,
    nume: null,
    prenume: null,
    CNP: null,
    nr_telefon: null,
    judet: null,
    localitate: null,
    adresa: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nume_utilizator, parola, email, nume, prenume, CNP, nr_telefon, judet, localitate, adresa } = this.form;

    this.authService.register(nume_utilizator, parola, email, nume, prenume, CNP, nr_telefon, judet, localitate, adresa).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
