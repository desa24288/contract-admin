import { Rol } from './rol';

export class Profile {
  usuario: string;
  nombre: string;
  estado: string;
  correo: string;
  temptoken: string;
  perfiles: Array<Rol>;

  constructor(
    usuario?: string,
    nombre?: string,
    estado?: string,
    correo?: string,
    temptoken?: string,
    perfiles?: Array<Rol>
  ) {
    this.usuario = usuario;
    this.nombre = nombre;
    this.estado = estado;
    this.correo = correo;
    this.temptoken = temptoken;
    this.perfiles = perfiles;
  }
}
