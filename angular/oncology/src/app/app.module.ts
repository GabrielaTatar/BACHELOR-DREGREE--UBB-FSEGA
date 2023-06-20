import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { httpInterceptorProviders } from './_helpers/auth.interceptor';

import { MessagesComponent } from './messages/messages.component';
import { UtilizatoriComponent } from './utilizatori/utilizatori.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { ActivatedRoute } from '@angular/router';
import { PsihologiComponent } from './psihologi/psihologi.component';
import { NutritionistiComponent } from './nutritionisti/nutritionisti.component';
import { ConsultatiiComponent } from './consultatii/consultatii.component';
import { AdaugareConsultatieComponent } from './adaugare.consultatie/adaugare.consultatie.component';
import { MediconcologComponent } from './medici.component/mediconcolog/mediconcolog.component';
import { OncologmedicalComponent } from './medici.component/oncologmedical/oncologmedical.component';
import { OncologradioterapeutComponent } from './medici.component/oncologradioterapeut/oncologradioterapeut.component';
import { ChirurgoncologComponent } from './medici.component/chirurgoncolog/chirurgoncolog.component';
import { HematooncologComponent } from './medici.component/hematooncolog/hematooncolog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterDataPipe } from './filter-data.pipe';
import { IonicModule } from '@ionic/angular';
import { AdaugareConsultatiePsihologComponent } from './adaugare.consultatie.psiholog/adaugare.consultatie.psiholog.component';
import { AdaugareConsultatieNutritionistComponent } from './adaugare.consultatie.nutritionist/adaugare.consultatie.nutritionist.component';
import { ProgramarileMeleComponent } from './programarile.mele/programarile.mele.component';
import { IstoricMedicalComponent } from './istoric.medical/istoric.medical.component';
import { PlanuriAlimentareComponent } from './informatii/planuri.alimentare/planuri.alimentare.component';
import { TerapiiComponent } from './informatii/terapii/terapii.component';
import { ListaPacientiComponent } from './lista-pacienti/lista-pacienti.component';
import { DetaliiPacientComponent } from './detalii-pacient/detalii-pacient.component';
import { ModificareConsultComponent } from './modificare-consult/modificare-consult.component';
import { TratamenteComponent } from './tratamente/tratamente.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    UtilizatoriComponent,
    RegisterComponent,
    HomeComponent,
    PsihologiComponent,
    NutritionistiComponent,
    ConsultatiiComponent,
    AdaugareConsultatieComponent,
    MediconcologComponent,
    OncologmedicalComponent,
    OncologradioterapeutComponent,
    ChirurgoncologComponent,
    HematooncologComponent,
    FilterDataPipe,
    AdaugareConsultatiePsihologComponent,
    AdaugareConsultatieNutritionistComponent,
    ProgramarileMeleComponent,
    IstoricMedicalComponent,
    PlanuriAlimentareComponent,
    TerapiiComponent,
    ListaPacientiComponent,
    DetaliiPacientComponent,
    ModificareConsultComponent,
    TratamenteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    IonicModule
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
