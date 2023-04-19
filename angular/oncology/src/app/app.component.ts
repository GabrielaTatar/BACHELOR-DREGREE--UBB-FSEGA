import { Component} from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';


// verificam starea de IsLoggedIn, folosind StorageService
// daca este true obtinem rolurile utilizatorului
// se controleaza modul în care bara de navigare a șablonului își afișează elementele

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUserToken();
      //this.roles = user.roles;


      this.username = user.username;
    }
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();

    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.storageService.clean();

    //     window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }

  reloadCurrentPage() {
    window.location.reload();
  }

}
