import { Profile } from 'src/app/models/usuario/profile';
import * as jwt_decode from 'jwt-decode';
// import { Rol } from '../models/entity/usuario/rol';

export class Userprofile {
  private profile: Profile;
  public nomusuario = '';
  public rutusuario = '';
  public estadousuario = '';
  public correo = '';
  public temptoken = '';
//   public rol: Array<Rol> = [];
//   public rolobj: Rol;

  constructor() {
    this.loadprofile();
    // this.rol.push(this.rolobj);
  }

private loadprofile() {
    const uiportaladmin = JSON.parse(localStorage.getItem('uiportaladmin'));
    if (uiportaladmin !== null) {
      const decodedoken = this.getDecodedAccessToken(uiportaladmin.token);
      console.log(decodedoken);
      this.profile = new Profile();
      this.profile = decodedoken;
      this.rutusuario = this.profile.usuario;
      this.nomusuario = this.profile.nombre;
      this.estadousuario = this.profile.estado;
      this.correo = this.profile.correo;
      this.temptoken = this.profile.temptoken;

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
}

