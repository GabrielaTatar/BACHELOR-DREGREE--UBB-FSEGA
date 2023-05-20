import { Component, OnInit } from '@angular/core';
import { UtilizatoriService } from '../_services/utilizatori.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { FisaMedicalaService } from '../_services/fisa_medicala.service';
import { Fisa_medicala } from '../models/fisa_medicala';
import { Pacient } from '../models/pacient';
import { PacientiService } from '../_services/pacienti.service';
import { MediciService } from '../_services/medici.service';
import { Utilizator } from '../models/utilizator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  fisaMedicala: Fisa_medicala;
  pacient: Pacient;
  doctor: Utilizator;
  showDoctorButtons: boolean = false;

  constructor(
    private storageService: StorageService,
    private fisaMedicalaService: FisaMedicalaService,
    private pacientiService: PacientiService,
    private doctorService: MediciService,
    private router: Router) { this.fisaMedicala = {} as Fisa_medicala; this.pacient = {} as Pacient; this.doctor= {} as Utilizator; }

  ngOnInit(): void {
    // verificam daca utilizatorul este autentificat
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      // daca este autentificat, incarcam informatiile utilizatorului
      if(this.storageService.getUserType() === 'pacient'){
        this.showDoctorButtons = false;
        const pacient_id = this.storageService.getPatientByID();
        //console.log(pacient_id)
        this.fisaMedicalaService.getFisaMedicalaByPacient(pacient_id).subscribe((data: any) => {
          //console.log(data)
          const fisaFromResponse = JSON.parse(JSON.stringify(data)).medical_record_by_patient;
          this.fisaMedicala = fisaFromResponse;
          this.pacientiService.getPacientInfoByPacientId(pacient_id).subscribe((data: any) => {
            const pacientFromResponse = JSON.parse(JSON.stringify(data)).patient;
            this.pacient = pacientFromResponse;
          });
        });
    }
      else{
        this.showDoctorButtons = true;
        this.doctorService.getUserInfoByUserId(this.storageService.getUserByID()).subscribe((data: any) => {
          console.log(data);
          const doctorFromResponse = JSON.parse(JSON.stringify(data)).user;
          this.doctor = doctorFromResponse;
        })
      }
  }
  }


  }

