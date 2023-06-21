import { Component } from '@angular/core';
import { ConsultatieService } from '../_services/consultatie.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { Pacient } from '../models/pacient';
import { PacientiService } from '../_services/pacienti.service';

@Component({
  selector: 'app-lista-pacienti',
  templateUrl: './lista-pacienti.component.html',
  styleUrls: ['./lista-pacienti.component.css']
})
export class ListaPacientiComponent {
  pacienti: Array<Pacient>;

  constructor(private pacientiService: PacientiService, private router:Router, private storageService: StorageService) {
    this.pacienti = [];
  }


  ngOnInit():void{
    if(this.storageService.getUserType() !== 'cadru_medical')
      this.router.navigateByUrl('/home');

    this.pacientiService.getPacientiForDoc(this.storageService.getUserMedicalCadreId()).subscribe(
      data=>{
        const arrayFromResponse: Array<Pacient> = JSON.parse(JSON.stringify(data)).pacienti;
        console.log(arrayFromResponse);
        this.pacienti=arrayFromResponse;
        }
    );
  }



  visitPage(id_pacient: number):void {
    console.log(id_pacient)
    this.router.navigate(["/detalii-pacient", id_pacient, 0])
  }
}
