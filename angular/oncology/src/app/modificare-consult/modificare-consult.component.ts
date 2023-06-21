import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consultatie } from '../models/consultatie';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConsultatieService } from '../_services/consultatie.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-modificare-consult',
  templateUrl: './modificare-consult.component.html',
  styleUrls: ['./modificare-consult.component.css'],
})
export class ModificareConsultComponent {
  form: FormGroup;
  loading = false;
  submitted = false;
  error1 = '';
  error = '';
  id_consultatie: number;

  modalVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private consultatieService: ConsultatieService,
    private route: ActivatedRoute
  ) {
    this.id_consultatie = 0;
    this.form = this.formBuilder.group({
      diagnostic: ['', Validators.required],
      schema_tratament: ['', Validators.required],
      durata: [30, Validators.required],
      pret: [200, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id_consultatie = this.route.snapshot.params['id'];
    this.form.setValue({
      diagnostic: '',
      schema_tratament: '',
      durata: 30,
      pret: 200,
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    console.log("e subitted")

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.consultatieService
      .modificareConsultatie(
        this.id_consultatie,
        this.f['diagnostic'].value,
        this.f['schema_tratament'].value,
        this.f['durata'].value,
        this.f['pret'].value
      )
      .subscribe( data => {
          this.router.navigateByUrl('/consultatii');
        });

    console.log("e valid")


      }



}
