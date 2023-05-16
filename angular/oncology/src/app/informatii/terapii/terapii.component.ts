import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InformatiiService } from 'src/app/_services/informatii.service';
import { Terapie } from 'src/app/models/terapie';

@Component({
  selector: 'app-terapii',
  templateUrl: './terapii.component.html',
  styleUrls: ['./terapii.component.css']
})
export class TerapiiComponent {
  data: Array<Terapie>;

  constructor(private informatiiService: InformatiiService, private router:Router)
  {
    this.data = [];
  }

  ngOnInit():void{
    //response.subscribe(data => {const resp = JSON.parse(JSON.stringify(data)); console.log(resp.theraphists)});
    this.informatiiService.getTerapii().subscribe(
      data=>{
        const arrayFromResponse: Array<Terapie> = JSON.parse(JSON.stringify(data)).therapies;
        console.log(arrayFromResponse);
      }
    );
  }
}
