import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from '../services/usuario/usuario.service';
import { Userprofile } from '../config/userprofile';
import { Profile } from 'src/app/models/usuario/profile';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public profile: Userprofile;
  // public profile: Userprofile = new Userprofile();
  private profileusr: Profile;
  public temptoken = '';
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    // this.profile = new Userprofile();
    console.log(this.profile);
    // this.temptoken = this.profile.temptoken;
    // this.loadprofile();

   }

   private loadprofile() {
    const uiportaladmin = JSON.parse(localStorage.getItem('uiportaladmin'));
    if (uiportaladmin !== null) {
      const decodedoken = this.getDecodedAccessToken(uiportaladmin.token);
      console.log(decodedoken);
      const profile = new Profile();
      this.temptoken = profile.temptoken;
    //   for (const lrol of this.profile.perfiles) {
    //     this.rolobj = lrol;
    //     break;
    //   }
    } else { return; }
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
    }
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   console.log('AQUI 1');
  //   return this.usuarioService.islogin()
  //     .then(() => {
  //       console.log('AQUI 2');
  //       return true;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.router.navigate(['login']);
  //       return false;
  //     });
  // }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.profile = new Userprofile();
      console.log(this.profile);
    // const uiportaladmin = JSON.parse(localStorage.getItem('uiportaladmin'));
    // if (uiportaladmin !== null) {
    //   const decodedoken = this.getDecodedAccessToken(uiportaladmin.token);
    //   console.log(decodedoken);
    //   const profile = new Profile();
    //   this.temptoken = profile.temptoken;
      return this.usuarioService.islogin(this.profile.temptoken)
      .then(() => {
        return true;
      })
      .catch(err => {
        this.router.navigate(['login']);
        return false;
      });
    // } else { return; }
    // let temptkn = '';
  //   if (this.profile.temptoken === undefined || this.profile.temptoken === null
  //     || this.profile.temptoken === '' ) {
  //     this.loadprofile();
  //     temptkn = this.temptoken;
  //   } else {
  //     temptkn = this.profile.temptoken;
  //   }

  //   return this.usuarioService.islogin(temptkn)
  //   .then(() => {
  //     return true;
  //   })
  //   .catch(err => {
  //     this.router.navigate(['login']);
  //     return false;
  //   });
  }
}
