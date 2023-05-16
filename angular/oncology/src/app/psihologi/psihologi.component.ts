import { Component } from '@angular/core';
import { PsihologiService } from '../_services/psihologi.service';
import { Psiholog } from '../models/psiholog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-psihologi',
  templateUrl: './psihologi.component.html',
  styleUrls: ['./psihologi.component.css']
})
export class PsihologiComponent {
  title = 'blog';
  data: Array<Psiholog>;
  constructor(private psihologService: PsihologiService, private router:Router) {
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
  visitPage(id_psiholog: number):void {
    //visit page for details of medication
    this.router.navigate(["/adaugare.consultatie.psiholog",id_psiholog])
  }

}
