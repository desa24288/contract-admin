import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as jwt_decode from 'jwt-decode';

import { Profile } from 'src/app/models/usuario/profile';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Userprofile } from 'src/app/config/userprofile';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public profile: Userprofile = new Userprofile();
  public bsModalRefCambiar: BsModalRef;
  public elem;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private bsModalService: BsModalService
  ) { }

  ngOnInit() {
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  onPrecontrato() {
    this.router.navigate(['/precontrato']);
  }
  onCerrar() {
    this.cerrarsesion();
  }

  async cerrarsesion() {
    // cierra la sesion del usuario
    // const tkn = JSON.parse(localStorage.getItem('uiportaladmin'));
    this.usuarioService.logout(this.profile.temptoken).subscribe(
      data => {
        // localStorage.removeItem('uiportaladmin');
        this.router.navigate(['login']);
      }, err => {
        console.log(err.statusText);
      }
    );
  }


  /*
  onCambiar() {
    this.bsModalRefCambiar = this.bsModalService.show(CambiopassComponent, this.setModalCambiar(this.profile.nombre));
    this.bsModalRefCambiar.content.onClose.subscribe(estado => {
      if (estado === true) {
      }
    });
  }

  setModalCambiar(login: string) {
    let dtModal: any = {};
    dtModal = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-dialog-centered modal-md',
      initialState: {
        'login': login
      }
    };
    return dtModal;
  }
  */

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return console.log(err);
    }
  }


}
