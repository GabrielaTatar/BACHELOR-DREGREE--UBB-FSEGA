import { Component } from '@angular/core';
import { MediciService } from '../../_services/medici.service';
import { Doctor } from '../../models/doctor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hematooncolog',
  templateUrl: './hematooncolog.component.html',
  styleUrls: ['./hematooncolog.component.css']
})
export class HematooncologComponent {
  title = 'blog';
  data: Array<Doctor>;


  constructor(private medicService: MediciService, private router:Router) {
    // this.psiholog.getData().subscribe(data=>{
    //   console.warn(data)
    //   this.data=data
    // })
    this.data = [];
  }

  ngOnInit():void{
    //response.subscribe(data => {const resp = JSON.parse(JSON.stringify(data)); console.log(resp.theraphists)});
    this.medicService.getData().subscribe(
      data=>{
        const arrayFromResponse: Array<Doctor> = JSON.parse(JSON.stringify(data)).doctors;
        console.log(arrayFromResponse);
        //this.data=arrayFromResponse;

        // const filtered = arrayFromResponse.filter(doctor => doctor.tip_doctor === "Medic oncolog");
        // this.data = filtered;

        //const filteredData = data.filter((doctor: { tip_doctor: string; }) => doctor.tip_doctor === "Medic oncolog");
        let filteredArray : Array<Doctor> = [];
        for(var index in arrayFromResponse){
          if(arrayFromResponse[index].tip_doctor === "Hemato Oncolog"){
            console.log(arrayFromResponse[index].tip_doctor);
            filteredArray.push(arrayFromResponse[index]);
          }
        }
        this.data = filteredArray;
        }

    );
  }
  visitPage(id_doctor: number):void {
    //visit page for details of medication
    this.router.navigate(["/adaugare.consultatie",id_doctor])
  }

}
