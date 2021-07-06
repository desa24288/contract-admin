import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
import { Login } from '../../models/usuario/login';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
  //   .concat(environment.api.app).concat('/autenticacion/autenticacion');
  // private TARGET_URL = environment.apiUrl.concat('index.php/usuarios/autenticacion');
  private TARGET_URL = environment.api.url
  .concat(environment.api.app).concat('index.php/usuarios/autenticacion');

  private TESTING_URL = 'http://198.41.35.169:8080/rest_adminusuario_qa/parametro/parametro';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public auth(login: Login): Observable<any> {
    return this.httpClient.post<Login>(this.TARGET_URL.concat('/login/'), login);
  }

  public testing(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      this.TESTING_URL.concat('/servicio_salud')
      , this.tokenService.get());
  }
  public islogin(tkn: string): Promise<any> {
    return this.httpClient.get<any>(this.TARGET_URL.concat('/islogin/').concat(tkn), this.tokenService.get()).toPromise();
  }

  // public islogin(): Promise<any> {
  //   return this.httpClient.get<any>(this.TARGET_URL.concat('/islogin'), this.tokenService.get()).toPromise();
  // }

  public logout(tkn: string): Observable<any> {
    return this.httpClient.get<any>(this.TARGET_URL.concat('/logout/').concat(tkn), this.tokenService.get());
  }

   public intentoslog(RutUsuario: string, NomApp: string): Observable<any> {
    return this.httpClient.get<any>(this.TARGET_URL.concat('/intentoslog/').
      concat(RutUsuario).concat('/').
      concat(NomApp), this.tokenService.get());
  }


}
