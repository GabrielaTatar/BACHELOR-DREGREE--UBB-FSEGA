import { Component, OnInit } from '@angular/core';
import { Consultatie } from '../models/consultatie';
import { ConsultatieService } from '../_services/consultatie.service';

@Component({
  selector: 'app-istoric.medical',
  templateUrl: './istoric.medical.component.html',
  styleUrls: ['./istoric.medical.component.css']
})
export class IstoricMedicalComponent implements OnInit {
  consultatii:  Array<Consultatie>;

  constructor(private consultatieService: ConsultatieService) { this.consultatii=[]; }

  ngOnInit() {
    this.getConsultatiiTrecute();
  }

  getConsultatiiTrecute(){
    this.consultatieService.getData().subscribe(
      data=>{
        const arrayFromResponse: Array<Consultatie> = JSON.parse(JSON.stringify(data)).consultatii;
        let filteredArray : Array<Consultatie> = [];
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        for(var index in arrayFromResponse){
          //console.log(arrayFromResponse[index].data.getTime());
          let dateFromConsultation = new Date(arrayFromResponse[index].data);
          dateFromConsultation.setHours(0,0,0,0);
          if(dateFromConsultation.getTime() < currentDate.getTime()){
            filteredArray.push(arrayFromResponse[index]);
          }
        }
        this.consultatii = filteredArray;
        }

    );
  }

}
