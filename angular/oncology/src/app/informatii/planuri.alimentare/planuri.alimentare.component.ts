import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plan_alimentar } from 'src/app/models/plan_alimentar';
import { InformatiiService } from 'src/app/_services/informatii.service';

@Component({
  selector: 'app-planuri.alimentare',
  templateUrl: './planuri.alimentare.component.html',
  styleUrls: ['./planuri.alimentare.component.css']
})
export class PlanuriAlimentareComponent {
  data: Array<Plan_alimentar>;


  constructor(private informatiiService: InformatiiService, private router:Router)
  {
    this.data = [];
  }

  ngOnInit():void{
    //response.subscribe(data => {const resp = JSON.parse(JSON.stringify(data)); console.log(resp.theraphists)});
    this.informatiiService.getPlanuriAlimentare().subscribe(
      data=>{
        const arrayFromResponse: Array<Plan_alimentar> = JSON.parse(JSON.stringify(data)).diet_plans;
        console.log(arrayFromResponse);
      }
    );
  }
}

