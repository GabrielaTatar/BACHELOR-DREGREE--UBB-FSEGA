import { Component } from '@angular/core';
import { MediciService } from '../_services/medici.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-medici',
  templateUrl: './medici.component.html',
  styleUrls: ['./medici.component.css']
})
export class MediciComponent {
  title = 'blog';
  data: Array<Doctor>;
  constructor(private medicService: MediciService) {
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
        const arrayFromResponse = JSON.parse(JSON.stringify(data)).doctors;
        console.log(arrayFromResponse);
        this.data=arrayFromResponse;
      }
    );
  }

}

