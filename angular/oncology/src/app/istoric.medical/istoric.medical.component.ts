import { Component, OnInit } from '@angular/core';
import { Consultatie } from '../models/consultatie';
import { IstoricMedicalService } from '../_services/istoric.medical.service';

@Component({
  selector: 'app-istoric.medical',
  templateUrl: './istoric.medical.component.html',
  styleUrls: ['./istoric.medical.component.css']
})
export class IstoricMedicalComponent implements OnInit {
  consultatii!: Consultatie[];

  constructor(private istoricMedicalService: IstoricMedicalService) { }

  ngOnInit(): void {
    this.getConsultatiiTrecute();
  }

  getConsultatiiTrecute(): void {
    this.istoricMedicalService.getConsultatiiTrecute()
      .subscribe(consultatii => this.consultatii = consultatii);
  }
}
