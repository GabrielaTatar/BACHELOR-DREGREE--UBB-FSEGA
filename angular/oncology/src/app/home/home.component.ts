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
import { Doctor } from '../models/doctor';
import { Nutritionist } from '../models/nutritionist';
import { Psiholog } from '../models/psiholog';
import { PsihologiService } from '../_services/psihologi.service';
import { NutritionistiService } from '../_services/nutritionisti.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  fisaMedicala: Fisa_medicala;
  pacient: Pacient;
  showDoctorButtons: boolean = false;
  doctor: Doctor;
  nutritionist: Nutritionist;
  psiholog: Psiholog;
  tipCadruMedical: string;


  constructor(
    private storageService: StorageService,
    private fisaMedicalaService: FisaMedicalaService,
    private pacientiService: PacientiService,
    private doctorService: MediciService,
    private psihologService: PsihologiService,
    private nutritionistService: NutritionistiService,
    private router: Router) { this.fisaMedicala = {} as Fisa_medicala; this.pacient = {} as Pacient; this.doctor= {} as Doctor; this.nutritionist= {} as Nutritionist; this.psiholog= {} as Psiholog; this.tipCadruMedical= '';}

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
        this.tipCadruMedical = this.storageService.getUserTypeDetails();
        if(this.tipCadruMedical === 'doctor') {
          this.doctorService.getDoctorInfoByDoctorId(this.storageService.getUserDoctorId()).subscribe((data: any) => {
            console.log(data);
            const doctorFromResponse = JSON.parse(JSON.stringify(data)).doctor;
            this.doctor = doctorFromResponse;})
        }
        else if(this.tipCadruMedical === 'psiholog') {
          this.psihologService.getPsihologInfoByPsihologId(this.storageService.getUserDoctorId()).subscribe((data: any) => {
            console.log(data);
            const psihologFromResponse = JSON.parse(JSON.stringify(data)).theraphist;
            this.psiholog = psihologFromResponse;})
        }
        else if(this.tipCadruMedical === 'nutritionist') {
          this.nutritionistService.getNutritionistInfoByNutritionistId(this.storageService.getUserDoctorId()).subscribe((data: any) => {
            console.log(data);
            const nutritionistFromResponse = JSON.parse(JSON.stringify(data)).nutritionist;
            this.nutritionist = nutritionistFromResponse;})
        }

      }
  }
  }


  }

