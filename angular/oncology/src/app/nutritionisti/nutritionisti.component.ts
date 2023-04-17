import { Component } from '@angular/core';
import { NutritionistiService } from '../_services/nutritionisti.service';
import { Nutritionist } from '../models/nutritionist';

@Component({
  selector: 'app-nutritionisti',
  templateUrl: './nutritionisti.component.html',
  styleUrls: ['./nutritionisti.component.css']
})
export class NutritionistiComponent {
  title = 'blog';
  data: Array<Nutritionist>;
  constructor(private nutritionistService: NutritionistiService) {
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

}

