import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';


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
  isLoggedIn = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      //this.roles = this.storageService.getUserToken().roles;
    }
  }



  onSubmit(): void {
    const { nume_utilizator, parola, email, nume, prenume, CNP, nr_telefon, judet, localitate, adresa } = this.form;

    this.authService.register(nume_utilizator, parola, email, nume, prenume, CNP, nr_telefon, judet, localitate, adresa).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.storageService.saveUser(data);

        this.isLoggedIn = true;
        this.navigateAndReload('/home');
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


  navigateAndReload(url: string) {
    this.router.navigateByUrl(url)
      .then(() => {
        window.location.reload();
      });
}
}
