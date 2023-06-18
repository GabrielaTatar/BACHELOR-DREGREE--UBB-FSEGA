import { Component } from '@angular/core';
import { ConsultatieService } from '../_services/consultatie.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-lista-pacienti',
  templateUrl: './lista-pacienti.component.html',
  styleUrls: ['./lista-pacienti.component.css']
})
export class ListaPacientiComponent {

  constructor(private consultatieService: ConsultatieService, private router:Router, private storageService: StorageService) {
    // this.psiholog.getData().subscribe(data=>{
    //   console.warn(data)
    //   this.data=data
    // })
  }

  visitPage(fisa_medicala_id_fisa: number, id_consultatie: number):void {
    console.log(fisa_medicala_id_fisa)
    console.log(id_consultatie)
    this.router.navigate(["/detalii-pacient", fisa_medicala_id_fisa, id_consultatie])
  }
}
