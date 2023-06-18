import { Component, OnInit } from '@angular/core';
import { Fisa_medicala } from '../models/fisa_medicala';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FisaMedicalaService } from '../_services/fisa_medicala.service';
import { switchMap } from 'rxjs';
import { Pacient } from '../models/pacient';
import { PacientiService } from '../_services/pacienti.service';
import { ConsultatieService } from '../_services/consultatie.service';
import { Consultatie } from '../models/consultatie';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-detalii-pacient',
  templateUrl: './detalii-pacient.component.html',
  styleUrls: ['./detalii-pacient.component.css']
})
export class DetaliiPacientComponent implements OnInit {
  fisaMedicala:Fisa_medicala;
  pacient: Pacient;
  consultatii: Array<Consultatie>;
  id_fisa: number;
  id_consultatie: number;

  constructor(private router: Router,
    private route:ActivatedRoute,
    private fisaMedicalaService: FisaMedicalaService,
    private pacientService: PacientiService,
    private consultatieService: ConsultatieService,
    private storageService: StorageService) {
      this.fisaMedicala = {} as Fisa_medicala;
      this.pacient = {} as Pacient;
      this.consultatii = [];
      this.id_consultatie = 0;
      this.id_fisa = 0;
  }

  ngOnInit(): void {
    this.id_fisa = this.route.snapshot.params['id_fisa_medicala'];
    this.id_consultatie = this.route.snapshot.params['id_consultatie'];

    this.route.params.pipe(
      switchMap(
        (params:Params) => this.fisaMedicalaService.getFisaMedicalaByFM(+params['id_fisa_medicala'])
      )).subscribe(data=>{
        const fisaMedicalaFromResponse = JSON.parse(JSON.stringify(data)).medical_record;
        this.fisaMedicala = fisaMedicalaFromResponse;
        this.route.params.pipe(
          switchMap(
            (params:Params) => this.pacientService.getPacientInfoByConsultId(+params['id_consultatie'])
            )).subscribe(data=>{
              const pacientFromResponse = JSON.parse(JSON.stringify(data)).patient;
              this.pacient = pacientFromResponse;
              this.consultatieService.getConsultDupaPacient(this.id_fisa).subscribe(
                data => {
                  const arrayFromResponse: Array<Consultatie> = JSON.parse(JSON.stringify(data)).consultatii;
                  let filteredArray : Array<Consultatie> = [];
                  for(var index in arrayFromResponse){
                    if(arrayFromResponse[index].cadre_medicale_id_cadru === this.storageService.getUserMedicalCadreId()){
                      filteredArray.push(arrayFromResponse[index]);
                    }
                  }
                  this.consultatii = filteredArray;
                }
              )
            })
    });


  }
}

