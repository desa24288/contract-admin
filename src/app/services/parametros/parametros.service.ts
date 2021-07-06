import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { Observable } from 'rxjs';
import { Parametros } from 'src/app/models/entity/parametros/parametros';
import { Empresa } from 'src/app/models/entity/parametros/empresa';
import { Curso } from 'src/app/models/entity/parametros/curso';
import { Otec } from 'src/app/models/entity/parametros/otec';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  // private TARGET_URL = environment.api.url.concat(environment.api.port.toString())
  // private TARGET_URL = environment.apiUrl.concat('index.php/restserver');
  // private TARGET_URL_PARAMS = environment.apiUrl.concat('index.php/parametro/parametros');
  private TARGET_URL = environment.api.url
  .concat(environment.api.app).concat('index.php/restserver');
  private TARGET_URL_PARAMS = environment.api.url
  .concat(environment.api.app).concat('index.php/parametro/parametros');

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public postPrueba2A(param: Array<Parametros>): Observable<Parametros> {
    return this.httpClient.post<Parametros>(
      this.TARGET_URL.concat('/test2a'),
      param,
      this.tokenService.post()
      );
  }

  public getPrueba2B(): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL.concat('/test2b'),
      {
        headers: this.tokenService.getBlob(),
        responseType: 'blob' as 'json',
        observe: 'response'
      }
      );
  }

  public getPrueba(): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL.concat('/test/'),
      {
        headers: this.tokenService.getBlob(),
        responseType: 'blob' as 'json',
        observe: 'response'
      });
  }

  public getEmpresa(rutemp: string): Observable<Empresa> {
    return this.httpClient.get<Empresa>(
      this.TARGET_URL_PARAMS.concat('/empresa/').concat(rutemp),
      this.tokenService.get()
      );
  }

  public getCurso(codcurso: string): Observable<Curso> {
    return this.httpClient.get<Curso>(
      this.TARGET_URL_PARAMS.concat('/curso/').concat(codcurso),
      this.tokenService.get()
      );
  }

  public getOtec(): Observable<Otec[]> {
    return this.httpClient.get<Otec[]>(
      this.TARGET_URL_PARAMS.concat('/listaotec/'),
      this.tokenService.get()
      );
  }

  public getOk(fecha: Date): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL_PARAMS.concat('/inscntst/').concat(fecha.toString()),
      this.tokenService.get()
      );
  }

  public getSum(): Observable<any> {
    return this.httpClient.get<any>(
      this.TARGET_URL_PARAMS.concat('/cntst/'),
      this.tokenService.get()
      );
  }
}
