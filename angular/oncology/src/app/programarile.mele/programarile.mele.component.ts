import { Component, OnInit } from '@angular/core';
import { ConsultatieService } from '../_services/consultatie.service';
import { Consultatie } from '../models/consultatie';
import { ConsultatieCuInformatii } from '../models/consultatieCuInformatii';
import { MediciService } from '../_services/medici.service';
import { Doctor } from '../models/doctor';


@Component({
  selector: 'app-programarile.mele',
  templateUrl: './programarile.mele.component.html',
  styleUrls: ['./programarile.mele.component.css']
})
export class ProgramarileMeleComponent implements OnInit {
  consultatii: Array<ConsultatieCuInformatii> = [];
  index: number;

  constructor(private consultatieService: ConsultatieService, private mediciService: MediciService) {this.consultatii = []; this.index=0;}

  ngOnInit() {
    this.programarileMele();
  }

  programarileMele(){
    this.consultatieService.getData().subscribe(
      data=>{
        const arrayFromResponse: Array<Consultatie> = JSON.parse(JSON.stringify(data)).consultatii;
        let filteredArray : Array<Consultatie> = [];
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        for(var index in arrayFromResponse){
          //console.log(arrayFromResponse[index].data);
          let dateFromConsultation = new Date(arrayFromResponse[index].data);
          dateFromConsultation.setHours(0,0,0,0);
          let consultatieFromResponse = arrayFromResponse[index];
          if(dateFromConsultation.getTime() >= currentDate.getTime()){
            console.log(consultatieFromResponse)
            this.mediciService.getDoctorInfoByCadreId(consultatieFromResponse.cadre_medicale_id_cadru).subscribe(data=>{
              if(data === null){
                const consultatieGoalaCuInformatii : ConsultatieCuInformatii={
                  id_consultatie: 0,
                  data: new Date(),
                  simptome: "",
                  diagnostic:"",
                  durata: 0,
                  pret: 0,
                  schema_tratament: "",
                  formular_de_prescriptie_id_formular: 0,
                  fisa_medicala_id_fisa: 0,
                  cadre_medicale_id_cadru: 0,
                  nume: "",
                  prenume:"",
                  tip_doctor:"",
                  cabinet:0,
                  contact: ""
                };
                this.consultatii.push(consultatieGoalaCuInformatii);
              }
              else{
              const doctorFromResponse:Doctor = JSON.parse(JSON.stringify(data)).doctor;
              const consultatieCuInformatii : ConsultatieCuInformatii={
                id_consultatie: consultatieFromResponse.id_consultatie,
                data: consultatieFromResponse.data,
                simptome: consultatieFromResponse.simptome,
                diagnostic: consultatieFromResponse.diagnostic,
                durata: consultatieFromResponse.durata,
                pret: consultatieFromResponse.pret,
                schema_tratament: consultatieFromResponse.schema_tratament,
                formular_de_prescriptie_id_formular: consultatieFromResponse.formular_de_prescriptie_id_formular,
                fisa_medicala_id_fisa: consultatieFromResponse.fisa_medicala_id_fisa,
                cadre_medicale_id_cadru: consultatieFromResponse.cadre_medicale_id_cadru,
                nume: doctorFromResponse.nume,
                prenume:doctorFromResponse.prenume,
                tip_doctor:doctorFromResponse.tip_doctor,
                cabinet:doctorFromResponse.cabinet,
                contact: doctorFromResponse.contact
              };
              this.consultatii.push(consultatieCuInformatii);}
            })
          }
        }
        }
    );
  }

}









