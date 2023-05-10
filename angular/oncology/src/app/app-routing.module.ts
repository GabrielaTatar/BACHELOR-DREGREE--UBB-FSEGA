import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { httpInterceptorProviders } from './_helpers/auth.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { UtilizatoriComponent } from './utilizatori/utilizatori.component';
import { PsihologiComponent } from './psihologi/psihologi.component';
import { NutritionistiComponent } from './nutritionisti/nutritionisti.component';
import { MediconcologComponent } from './medici.component/mediconcolog/mediconcolog.component';
import { ChirurgoncologComponent } from './medici.component/chirurgoncolog/chirurgoncolog.component';
import { HematooncologComponent } from './medici.component/hematooncolog/hematooncolog.component';
import { OncologmedicalComponent } from './medici.component/oncologmedical/oncologmedical.component';
import { OncologradioterapeutComponent } from './medici.component/oncologradioterapeut/oncologradioterapeut.component';
import { AdaugareConsultatieComponent } from './adaugare.consultatie/adaugare.consultatie.component';
import { ProgramarileMeleComponent } from './programarile-mele/programarile-mele.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'utilizator', component: UtilizatoriComponent },
  { path: 'psiholog', component: PsihologiComponent },
  { path: 'nutritionist', component: NutritionistiComponent },
  { path: 'mediconcolog', component: MediconcologComponent },
  { path: 'chirurgoncolog', component: ChirurgoncologComponent },
  { path: 'hematooncolog', component: HematooncologComponent },
  { path: 'oncologmedical', component: OncologmedicalComponent },
  { path: 'oncologradioterapeut', component: OncologradioterapeutComponent },
  { path: 'adaugare.consultatie/:id', component: AdaugareConsultatieComponent },
  { path: 'programarile-mele', component: ProgramarileMeleComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '*', redirectTo: 'home', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
