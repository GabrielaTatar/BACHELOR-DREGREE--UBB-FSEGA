import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { Consultatie } from '../models/consultatie';
import { ConsultatieService } from '../_services/consultatie.service';
import { PacientiService } from '../_services/pacienti.service';
import { FisaMedicalaService } from '../_services/fisa_medicala.service';
import { ConsultatieCuInformatii } from '../models/consultatieCuInformatii';
import { Fisa_medicala } from '../models/fisa_medicala';
import { Pacient } from '../models/pacient';

@Component({
  selector: 'app-consultatii',
  templateUrl: './consultatii.component.html',
  styleUrls: ['./consultatii.component.css']
})
export class ConsultatiiComponent {

  title = 'blog';
  consultAzi: Array<ConsultatieCuInformatii>;
  consultViitoare: Array<ConsultatieCuInformatii>;

  constructor(private consultatieService: ConsultatieService, private router:Router, private storageService: StorageService, private pacientService: PacientiService, private fisaMedicalaService: FisaMedicalaService) {
    // this.psiholog.getData().subscribe(data=>{
    //   console.warn(data)
    //   this.data=data
    // })
    this.consultAzi = [];
    this.consultViitoare= [];
  }

  ngOnInit():void{
    if(this.storageService.getUserType() !== 'cadru_medical')
      this.router.navigateByUrl('/home');

    this.consultatieService.getDataForDoc(this.storageService.getUserMedicalCadreId()).subscribe(
      data=>{
        const arrayFromResponse: Array<Consultatie> = JSON.parse(JSON.stringify(data)).consultatii;
        console.log(arrayFromResponse);
        //this.data=arrayFromResponse;

        // const filtered = arrayFromResponse.filter(doctor => doctor.tip_doctor === "Medic oncolog");
        // this.data = filtered;

        //const filteredData = data.filter((doctor: { tip_doctor: string; }) => doctor.tip_doctor === "Medic oncolog");
        let filteredArrayToday : Array<ConsultatieCuInformatii> = [];
        let filteredArrayFuture : Array<ConsultatieCuInformatii> = [];
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        for(var index in arrayFromResponse){
          //console.log(arrayFromResponse[index].data)
          let dateFromConsultation = new Date(arrayFromResponse[index].data);
          dateFromConsultation.setHours(0,0,0,0);
          let consultationFromResponse = arrayFromResponse[index];
          if(dateFromConsultation.getTime() > currentDate.getTime()){
            this.fisaMedicalaService.getFisaMedicalaByFM(consultationFromResponse.fisa_medicala_id_fisa).subscribe(data=>{
              const fisaFromResponse:Fisa_medicala = JSON.parse(JSON.stringify(data)).medical_record;
              console.log(fisaFromResponse)
              console.log(consultationFromResponse)

              this.pacientService.getPacientInfoByPacientId(fisaFromResponse.pacienti_id_pacient).subscribe(data=>{
                const pacientFromResponse:Pacient = JSON.parse(JSON.stringify(data)).patient;
                console.log(consultationFromResponse.id_consultatie)
                const consultatieCuInformatii : ConsultatieCuInformatii={
                  id_consultatie: consultationFromResponse.id_consultatie,
                  data: dateFromConsultation,
                  simptome: consultationFromResponse.simptome,
                  diagnostic: consultationFromResponse.diagnostic,
                  durata: consultationFromResponse.durata,
                  pret: consultationFromResponse.pret,
                  schema_tratament: consultationFromResponse.schema_tratament,
                  formular_de_prescriptie_id_formular: consultationFromResponse.formular_de_prescriptie_id_formular,
                  fisa_medicala_id_fisa: consultationFromResponse.fisa_medicala_id_fisa,
                  cadre_medicale_id_cadru: consultationFromResponse.cadre_medicale_id_cadru,
                  nume: pacientFromResponse.nume,
                  prenume:pacientFromResponse.prenume,
                  tip_doctor:"",
                  cabinet:0,
                  contact: pacientFromResponse.nr_telefon.toString()
                };
                filteredArrayFuture.push(consultatieCuInformatii);
              }

              )
            }
              )
          }
          else if (dateFromConsultation.getTime() === currentDate.getTime()) {
            this.fisaMedicalaService.getFisaMedicalaByFM(consultationFromResponse.fisa_medicala_id_fisa).subscribe(data=>{
              const fisaFromResponse:Fisa_medicala = JSON.parse(JSON.stringify(data)).medical_record;
              console.log(fisaFromResponse)
              this.pacientService.getPacientInfoByPacientId(fisaFromResponse.pacienti_id_pacient).subscribe(data=>{
                const pacientFromResponse:Pacient = JSON.parse(JSON.stringify(data)).patient;
                console.log(consultationFromResponse.id_consultatie)
                console.log(consultationFromResponse)
                const consultatieCuInformatii : ConsultatieCuInformatii={
                  id_consultatie: consultationFromResponse.id_consultatie,
                  data: dateFromConsultation,
                  simptome: consultationFromResponse.simptome,
                  diagnostic: consultationFromResponse.diagnostic,
                  durata: consultationFromResponse.durata,
                  pret: consultationFromResponse.pret,
                  schema_tratament: consultationFromResponse.schema_tratament,
                  formular_de_prescriptie_id_formular: consultationFromResponse.formular_de_prescriptie_id_formular,
                  fisa_medicala_id_fisa: consultationFromResponse.fisa_medicala_id_fisa,
                  cadre_medicale_id_cadru: consultationFromResponse.cadre_medicale_id_cadru,
                  nume: pacientFromResponse.nume,
                  prenume:pacientFromResponse.prenume,
                  tip_doctor:"",
                  cabinet:0,
                  contact: pacientFromResponse.nr_telefon.toString()
                };
                filteredArrayToday.push(consultatieCuInformatii);
              }

              )
            }
              )
          }
        }
        this.consultAzi = filteredArrayToday;
        this.consultViitoare = filteredArrayFuture;
        }
    );
  }

  visitPage(fisa_medicala_id_fisa: number, id_consultatie: number):void {
    console.log(fisa_medicala_id_fisa)
    console.log(id_consultatie)
    this.router.navigate(["/detalii-pacient", fisa_medicala_id_fisa, id_consultatie])
  }

  visitModifyPage(id_consultatie: number):void {
    console.log(id_consultatie)
    this.router.navigate(["/modificare-consult",  id_consultatie])
  }

}

