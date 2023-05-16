import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultatie } from '../models/consultatie';
import { ConsultatieService } from '../_services/consultatie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { Nutritionist } from '../models/nutritionist';
import { NutritionistiService } from '../_services/nutritionisti.service';

@Component({
  selector: 'app-adaugare.consultatie.nutritionist',
  templateUrl: './adaugare.consultatie.nutritionist.component.html',
  styleUrls: ['./adaugare.consultatie.nutritionist.component.css']
})
export class AdaugareConsultatieNutritionistComponent implements OnInit {
  form:FormGroup;
  loading = false;
  submitted = false;
  error1 = '';
  error = '';
  nutritionist:Nutritionist;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private consultatieService:ConsultatieService,
    private route:ActivatedRoute,
    private nutritionistService: NutritionistiService) {
      this.nutritionist = {} as Nutritionist;
      this.form=this.formBuilder.group({
        simptome: ['', Validators.required],
        data:['',Validators.required],
        //ora: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(
        (params:Params) => this.nutritionistService.getNutritionistInfoByNutritionistId(+params['id'])
      )).subscribe(data=>{
        const nutritionistFromResponse = JSON.parse(JSON.stringify(data)).nutritionist;
        this.nutritionist = nutritionistFromResponse;
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

      this.consultatieService.adaugareConsultatie(this.f['data'].value,this.f['simptome'].value, this.nutritionist.cadre_medicale_id_cadru)
          .subscribe({next: (data: any) => {
                  this.router.navigateByUrl('/nutritionist');
              },
              error: (error: string)=>{
                  this.error = "";
                  this.loading = false;
              }
              });
      }

}

