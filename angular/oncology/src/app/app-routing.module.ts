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
import { AdaugareConsultatiePsihologComponent } from './adaugare.consultatie.psiholog/adaugare.consultatie.psiholog.component';
import { AdaugareConsultatieNutritionistComponent } from './adaugare.consultatie.nutritionist/adaugare.consultatie.nutritionist.component';
import { ProgramarileMeleComponent } from './programarile.mele/programarile.mele.component';
import { IstoricMedicalComponent } from './istoric.medical/istoric.medical.component';
import { PlanuriAlimentareComponent } from './informatii/planuri.alimentare/planuri.alimentare.component';
import { TerapiiComponent } from './informatii/terapii/terapii.component';
import { ConsultatiiComponent } from './consultatii/consultatii.component';
import { ListaPacientiComponent } from './lista-pacienti/lista-pacienti.component';
import { DetaliiPacientComponent } from './detalii-pacient/detalii-pacient.component';
import { ModificareConsultComponent } from './modificare-consult/modificare-consult.component';
import { TratamenteComponent } from './tratamente/tratamente.component';

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
  { path: 'consultatii', component: ConsultatiiComponent },
  { path: 'programarile.mele', component: ProgramarileMeleComponent },
  { path: 'adaugare.consultatie.psiholog/:id', component: AdaugareConsultatiePsihologComponent },
  { path: 'adaugare.consultatie.nutritionist/:id', component: AdaugareConsultatieNutritionistComponent },
  { path: 'istoric.medical', component: IstoricMedicalComponent },
  { path: 'planuri.alimentare', component: PlanuriAlimentareComponent },
  { path: 'terapii', component: TerapiiComponent },
  { path: 'lista-pacienti', component: ListaPacientiComponent },
  { path: 'detalii-pacient/:id_fisa_medicala/:id_consultatie', component: DetaliiPacientComponent },
  { path: 'modificare-consult/:id', component: ModificareConsultComponent },
  { path: 'planuri.alimentare', component: PlanuriAlimentareComponent },
  { path: 'tratamente.component', component: TratamenteComponent },




  // Wildcard route for unknown routes
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
