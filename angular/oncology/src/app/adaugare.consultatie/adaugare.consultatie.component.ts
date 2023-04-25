import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultatie } from '../models/consultatie';
import { ConsultatieService } from '../_services/consultatie.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adaugare.consultatie',
  templateUrl: './adaugare.consultatie.component.html',
  styleUrls: ['./adaugare.consultatie.component.css']
})

export class AdaugareConsultatieComponent implements OnInit{

  form: any = {
    simptome: null,
    data: null
  };
  isAppointmentDone = false;
  isAppointmentFailed = false;
  errorMessage = '';
  router: any;

  constructor(private formBuilder: FormBuilder, private consultatieService: ConsultatieService) { }

  ngOnInit(): void {

    if (this.consultatieService.isAppointmentDone()) {

      this.isAppointmentDone = true;
    }
  }

    // this.programariForm = this.formBuilder.group({
    //   data: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    //   ora: ['', Validators.required]
    // });

    // this.dataErrorMessage = 'Câmpul Data este obligatoriu și trebuie să respecte formatul yyyy-mm-dd.';
    // this.oraErrorMessage = 'Câmpul Ora este obligatoriu.';

    // this.programariForm.controls['data'].valueChanges.subscribe((value: any) => {
    //   this.dataErrorMessage = this.programariForm.controls['data'].hasError('required') ? 'Data este obligatorie.' :
    //     this.programariForm.controls['data'].hasError('pattern') ? 'Formatul datei trebuie sa fie yyyy-mm-dd.' :
    //       '';
    // });
    // this.programariForm.controls['ora'].valueChanges.subscribe((value: any) => {
    //   this.oraErrorMessage = this.programariForm.controls['ora'].hasError('required') ? 'Ora este obligatorie.' : '';
    // });


    onSubmit(): void {

      const { data, ora, simptome } = this.form;
      console.log(data);
      console.log(ora);
      console.log(simptome);

      this.consultatieService.adaugareConsultatie(data, ora, simptome).subscribe({
        next: (data: any) => {
          console.log(data);
          this.consultatieService.saveAppointment(data);

          this.isAppointmentFailed = false;
          this.isAppointmentDone = true;
          //this.roles = this.storageService.getUser().roles;
          //this.reloadPageAndGoToHome();
          this.router.navigateByUrl('/home');
        },
        error: (err: { error: { message: string; }; }) => {
          this.errorMessage = err.error.message;
          this.isAppointmentFailed = true;
        }
      })
    }


}

