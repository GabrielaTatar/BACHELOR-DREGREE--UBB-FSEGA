import { Component, OnInit } from '@angular/core';
import { ConsultatieService } from '../_services/consultatie.service';

@Component({
  selector: 'app-programarile-mele',
  templateUrl: './programarile-mele.component.html',
  styleUrls: ['./programarile-mele.component.css']
})
export class ProgramarileMeleComponent implements OnInit {
  consultatii: any;
  fisa_medicala_id_fisa: any;
  dataCurenta!: string;

  constructor(private consultatieService: ConsultatieService) {}

  ngOnInit() {
    this.dataCurenta = this.formatDate(new Date());
    this.programarileMele();
  }

  programarileMele() {
    this.consultatieService.programarileMele(this.fisa_medicala_id_fisa, this.dataCurenta).subscribe((data: any) => {
      this.consultatii = data;
    });
  }

  formatDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }
}









