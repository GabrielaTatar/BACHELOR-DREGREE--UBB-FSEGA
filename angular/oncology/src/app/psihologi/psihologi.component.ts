import { Component } from '@angular/core';
import { PsihologiService } from '../_services/psihologi.service';
import { Psiholog } from '../models/psiholog';

@Component({
  selector: 'app-psihologi',
  templateUrl: './psihologi.component.html',
  styleUrls: ['./psihologi.component.css']
})
export class PsihologiComponent {
  title = 'blog';
  data: Array<Psiholog>;
  constructor(private psihologService: PsihologiService) {
    // this.psiholog.getData().subscribe(data=>{
    //   console.warn(data)
    //   this.data=data
    // })
    this.data = [];
  }

  ngOnInit():void{
    //response.subscribe(data => {const resp = JSON.parse(JSON.stringify(data)); console.log(resp.theraphists)});
    this.psihologService.getData().subscribe(
      data=>{
        const arrayFromResponse = JSON.parse(JSON.stringify(data)).theraphists;
        console.log(arrayFromResponse);
        this.data=arrayFromResponse;
      }
    );
  }

}
