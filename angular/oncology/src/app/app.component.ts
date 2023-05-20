import { Component} from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { UtilizatoriService } from './_services/utilizatori.service';


// verificam starea de IsLoggedIn, folosind StorageService
// daca este true obtinem rolurile utilizatorului
// se controleaza modul în care bara de navigare a șablonului își afișează elementele

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private role: string = "";
  isLoggedIn = false;
  showDoctorButtons = false;

  constructor(private storageService: StorageService, private authService: AuthService, private utilizatoriService: UtilizatoriService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.role = this.storageService.getUserType();
      this.showDoctorButtons = this.role === 'cadru_medical';
    }
  }
  // isUserPacient(): boolean {
  //   // Verifică dacă utilizatorul autentificat are rolul de pacient
  //   return this.isLoggedIn.admin === false;
  // }

  logout(): void {
    this.storageService.clean();
    window.location.reload();

  }

  reloadCurrentPage() {
    window.location.reload();
  }

}
