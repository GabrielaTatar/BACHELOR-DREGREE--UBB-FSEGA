import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { httpInterceptorProviders } from './_helpers/auth.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { UtilizatoriComponent } from './utilizatori/utilizatori.component';
import { MediciComponent } from './medici/medici.component';
import { PsihologiComponent } from './psihologi/psihologi.component';
import { NutritionistiComponent } from './nutritionisti/nutritionisti.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'utilizator', component: UtilizatoriComponent },
  { path: 'medic', component: MediciComponent },
  { path: 'psiholog', component: PsihologiComponent },
  { path: 'nutritionist', component: NutritionistiComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '*', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
