import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    nume_utilizator: null,
    parola: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      //this.roles = this.storageService.getUserToken().roles;
    }
  }

  onSubmit(): void {
    const { nume_utilizator, parola } = this.form;
    console.log(nume_utilizator);
    console.log(parola);

    this.authService.login(nume_utilizator, parola).subscribe({
      next: data => {
        console.log(data);
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.storageService.getUser().roles;
        //this.reloadPageAndGoToHome();
        this.router.navigateByUrl('/home');
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
}

//   reloadPageAndGoToHome(): void {
//     window.location.reload()
//     .then(() => {
//       this.router.navigate(['Home']);});
//     this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
//       this.router.navigate(['Home']);});
// }

}
