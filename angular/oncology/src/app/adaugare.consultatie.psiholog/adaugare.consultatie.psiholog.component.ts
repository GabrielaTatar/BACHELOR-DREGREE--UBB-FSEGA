import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultatie } from '../models/consultatie';
import { ConsultatieService } from '../_services/consultatie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { Psiholog } from '../models/psiholog';
import { PsihologiService } from '../_services/psihologi.service';

@Component({
  selector: 'app-adaugare.consultatie.psiholog',
  templateUrl: './adaugare.consultatie.psiholog.component.html',
  styleUrls: ['./adaugare.consultatie.psiholog.component.css']
})
export class AdaugareConsultatiePsihologComponent implements OnInit {
  form:FormGroup;
  loading = false;
  submitted = false;
  error1 = '';
  error = '';
  psiholog:Psiholog;
  psiholog_id : number;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private consultatieService:ConsultatieService,
    private route:ActivatedRoute,
    private psihologService: PsihologiService) {
      this.psiholog = {} as Psiholog;
      this.psiholog_id = 0;
      this.form=this.formBuilder.group({
        simptome: ['', Validators.required],
        data:['',Validators.required],
        //ora: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.psiholog_id = this.route.snapshot.params['id'];
    //console.log(this.psiholog_id)
    this.route.params.pipe(
      switchMap(
        (params:Params) => this.psihologService.getPsihologInfoByPsihologId(+params['id'])
      )).subscribe(data=>{
        const psihologFromResponse = JSON.parse(JSON.stringify(data)).theraphist;
        console.log(psihologFromResponse)
        this.psiholog = psihologFromResponse;
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

      this.consultatieService.adaugareConsultatie(this.f['data'].value,this.f['simptome'].value, this.psiholog.cadre_medicale_id_cadru)
          .subscribe({next: (data: any) => {
                  this.router.navigateByUrl('/programarile.mele');
              },
              error: (error: string)=>{
                  this.error = "";
                  this.loading = false;
              }
              });
      }
    }
