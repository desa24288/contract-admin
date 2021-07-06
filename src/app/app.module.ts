import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgxLoadingModule } from 'ngx-loading';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Ng2Rut } from 'ng2-rut';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HomeComponent } from './templates/home/home.component';
import { LoginComponent } from './templates/login/login.component';
import { ErrorComponent } from './templates/error/error.component';
import { TokenService } from './services/utils/token.service';
import { MenuComponent } from './templates/menu/menu.component';
import { PrecontratoComponent } from './views/formularios/precontrato/precontrato.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    MenuComponent,
    PrecontratoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    NgProgressModule.withConfig({
      spinner: true,
      color: '#000000'
    }),
    NgxLoadingModule.forRoot({}),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-info',
      cancelButtonClass: 'btn',
      confirmButtonText: 'Aceptar'
    }),
    Ng2Rut,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    TokenService,
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
