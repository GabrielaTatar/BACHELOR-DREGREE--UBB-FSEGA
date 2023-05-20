import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultatii',
  templateUrl: './consultatii.component.html',
  styleUrls: ['./consultatii.component.css']
})
export class ConsultatiiComponent {

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    if(this.storageService.getUserType() !== 'cadru_medical')
      this.router.navigateByUrl('/home');
  }

}
