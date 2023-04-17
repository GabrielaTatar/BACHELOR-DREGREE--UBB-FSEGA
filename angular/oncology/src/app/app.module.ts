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
import { MediciComponent } from './medici/medici.component';
import { PsihologiComponent } from './psihologi/psihologi.component';
import { NutritionistiComponent } from './nutritionisti/nutritionisti.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    UtilizatoriComponent,
    RegisterComponent,
    HomeComponent,
    MediciComponent,
    PsihologiComponent,
    NutritionistiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
