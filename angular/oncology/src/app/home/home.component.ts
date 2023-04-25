import { Component, OnInit } from '@angular/core';
import { UtilizatoriService } from '../_services/utilizatori.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { HomeService } from '../_services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  fisaMedicala: any;

  constructor(
    private utilizatoriService: UtilizatoriService,
    private storageService: StorageService,
    private authService: AuthService,
    private homeService: HomeService,
    private router: Router) { }

  ngOnInit(): void {
    // verificam daca utilizatorul este autentificat
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      // daca este autentificat, incarcam informatiile utilizatorului
      const user_id = this.storageService.getUserByID();
      this.homeService.getPacientByIdFisaMedicala(user_id).subscribe((data: any) => {
        this.fisaMedicala = data;
      });
    }
  }


  }

