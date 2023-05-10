import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultatie } from '../models/consultatie';
import { ConsultatieService } from '../_services/consultatie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { Doctor } from '../models/doctor';
import { MediciService } from '../_services/medici.service';


@Component({
  selector: 'app-adaugare.consultatie',
  templateUrl: './adaugare.consultatie.component.html',
  styleUrls: ['./adaugare.consultatie.component.css']
})

export class AdaugareConsultatieComponent implements OnInit{
  form:FormGroup;
  loading = false;
  submitted = false;
  error1 = '';
  error = '';
  doctor:Doctor;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private consultatieService:ConsultatieService,
    private route:ActivatedRoute,
    private doctorService: MediciService) {
      this.doctor = {} as Doctor;
      this.form=this.formBuilder.group({
        simptome: ['', Validators.required],
        data:['',Validators.required],
        //ora: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(
        (params:Params) => this.doctorService.getDoctorInfoByDoctorId(+params['id'])
      )).subscribe(data=>{
        const doctorFromResponse = JSON.parse(JSON.stringify(data)).doctor;
        this.doctor = doctorFromResponse;
        var today = new Date();
        this.form.setValue({
          simptome: '',
          data: today
      });
    });

  }



    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }



    onSubmit(): void {
      this.submitted = true;

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;

      this.consultatieService.adaugareConsultatie(this.f['data'].value,this.f['simptome'].value, this.doctor.cadre_medicale_id_cadru)
          .subscribe({next: (data: any) => {
                  this.router.navigateByUrl('/home');
              },
              error: (error: string)=>{
                  this.error = "";
                  this.loading = false;
              }
              });
      }




}
