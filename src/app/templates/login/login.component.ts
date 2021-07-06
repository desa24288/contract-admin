import { Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from '@ngx-progressbar/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/public_api';
import { RutValidator } from 'ng2-rut';

import { UsuarioService } from '../../services/usuario/usuario.service';

import { Login } from '../../models/usuario/login';
import { Utils } from '../../models/utils/utils';
import { Userprofile } from 'src/app/config/userprofile';
import { ParametrosService } from 'src/app/services/parametros/parametros.service';
import { Parametros } from 'src/app/models/entity/parametros/parametros';
// import * as jwt_decode from 'jwt-decode';
// import { Profile } from 'src/app/models/usuario/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgProgressComponent, {static: false}) progressBar: NgProgressComponent;
  @ViewChild('alertSwalAlert', {static: false}) alertSwalAlert: SwalComponent;

  public profile: Userprofile;
  public alerts: any[] = [];
  public lForm: FormGroup;
  public load = false;

  constructor(
    public router: Router,
    public rutValidator: RutValidator,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public paramService: ParametrosService
  ) {
    this.lForm = this.formBuilder.group({
      rutbeneficiario: [null, [Validators.required, rutValidator]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    });
  }

  ngOnInit() {
    // localStorage.removeItem('uiportaladmin');
    // this.usuarioService.testing().subscribe( res => { //<- borrar
    //   console.log(res);
    // }, err => {
    //   console.log(err);
    // });
  }

  onLogin(value: any) {
    this.autenticacion(value);
  }

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  async autenticacion(value: any) {
    // localStorage.removeItem('uiportaladmin');
    this.load = true;
    // se autentica con el servidor
    const rutbeneficiario = Utils.formatRut(this.lForm.controls.rutbeneficiario.value);
    console.log('los datos del usuario son: ', rutbeneficiario, value.password);
    this.usuarioService.auth(new Login(rutbeneficiario, value.password)).subscribe(
      async data => {
        const resp = data.token;
        // profile = this.getDecodedAccessToken(data.token);
        const uiportaladmin = {
          token: resp
        };
        this.usuarioService.intentoslog(rutbeneficiario, 'precontratos').subscribe(() => {},
          err => { console.log(err); });
        localStorage.setItem('uiportaladmin', JSON.stringify(uiportaladmin));
        // let profile: Profile = new Profile();
        // profile = this.getDecodedAccessToken(data.token);
        this.load = false;
        this.redirectMenu();
      }, err => {
        this.load = false;
        if (err.error === null) {
          this.uimensaje('danger', err.statusText, 3000);
        } else {
          this.uimensaje('danger', err.error.mensaje, 3000);
        }
      }
    );
    // this.router.navigate(['home']);
  }

  async redirectMenu() {
    this.router.navigate(['home']);
  }
  // private getDecodedAccessToken(token: string): any {
  //   try {
  //     return jwt_decode(token);
  //   } catch (err) {
  //   }
  // }

  uimensaje(status: string, texto: string, time: number = 0) {
    this.alerts = [];
    if (time !== 0) {
      this.alerts.push({
        type: status,
        msg: texto,
        timeout: time
      });
    } else {
      this.alerts.push({
        type: status,
        msg: texto
      });
    }
  }
}
