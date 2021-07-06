import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { ErrorComponent } from './templates/error/error.component';
import { HomeComponent } from './templates/home/home.component';
import { LoginComponent } from './templates/login/login.component';
import { PrecontratoComponent } from './views/formularios/precontrato/precontrato.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'precontrato', component: PrecontratoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
