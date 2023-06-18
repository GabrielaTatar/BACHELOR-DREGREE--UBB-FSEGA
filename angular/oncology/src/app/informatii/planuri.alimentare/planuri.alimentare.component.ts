import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plan_alimentar } from 'src/app/models/plan_alimentar';
import { PlanuriAlimentareService } from 'src/app/_services/planuri-alimentare.service';

@Component({
  selector: 'app-planuri.alimentare',
  templateUrl: './planuri.alimentare.component.html',
  styleUrls: ['./planuri.alimentare.component.css']
})
export class PlanuriAlimentareComponent {
  title = 'blog';
  data: Array<Plan_alimentar>;

  constructor(private planAlimentarService: PlanuriAlimentareService, private router:Router)
  {
    this.data = [];
  }

  ngOnInit():void{
    this.planAlimentarService.getPlanuriAlimentare().subscribe(
      data=>{
        const arrayFromResponse = JSON.parse(JSON.stringify(data)).diet_plans;
        console.log(arrayFromResponse);
        this.data=arrayFromResponse;
      }
    );
  }
}

