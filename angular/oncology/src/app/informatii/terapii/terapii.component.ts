import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Terapie } from 'src/app/models/terapie';
import { TerapiiService } from 'src/app/_services/terapii.service';

@Component({
  selector: 'app-terapii',
  templateUrl: './terapii.component.html',
  styleUrls: ['./terapii.component.css']
})
export class TerapiiComponent {
  title = 'blog';
  data: Array<Terapie>;

  constructor(private terapiiService: TerapiiService, private router:Router)
  {
    this.data = [];
  }

  ngOnInit():void{
    this.terapiiService.getTerapii().subscribe(
      data=>{
        const arrayFromResponse = JSON.parse(JSON.stringify(data)).therapies;
        console.log(arrayFromResponse);
        this.data=arrayFromResponse;
      }
    );
  }
}
