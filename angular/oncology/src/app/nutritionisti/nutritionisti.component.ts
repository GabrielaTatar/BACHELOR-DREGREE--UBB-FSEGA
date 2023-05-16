import { Component } from '@angular/core';
import { NutritionistiService } from '../_services/nutritionisti.service';
import { Nutritionist } from '../models/nutritionist';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nutritionisti',
  templateUrl: './nutritionisti.component.html',
  styleUrls: ['./nutritionisti.component.css']
})
export class NutritionistiComponent {
  title = 'blog';
  data: Array<Nutritionist>;
  constructor(private nutritionistService: NutritionistiService, private router:Router) {
    // this.psiholog.getData().subscribe(data=>{
    //   console.warn(data)
    //   this.data=data
    // })
    this.data = [];
  }

  ngOnInit():void{
    //response.subscribe(data => {const resp = JSON.parse(JSON.stringify(data)); console.log(resp.theraphists)});
    this.nutritionistService.getData().subscribe(
      data=>{
        const arrayFromResponse = JSON.parse(JSON.stringify(data)).nutritionisti;
        console.log(arrayFromResponse);
        this.data=arrayFromResponse;
      }
    );
  }

  visitPage(id_nutritionist: number):void {
    //visit page for details of medication
    this.router.navigate(["/adaugare.consultatie.nutritionist",id_nutritionist])
  }

}

