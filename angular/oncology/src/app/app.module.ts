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
import { ProgramarileMeleComponent } from './programarile-mele/programarile-mele.component';
import { FilterDataPipe } from './filter-data.pipe';


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
    ProgramarileMeleComponent,
    FilterDataPipe
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
    NgbModule
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
