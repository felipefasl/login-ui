import { URL_BACKEND } from './../utils/constants';
import { UtilsStaticService } from './statics/utils.static.service';
import { Observable } from 'rxjs';
import { IResquisicaoAutenticacao, IRespostaAutenticacao } from './../entities/autenticacao.entities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private  httpClient: HttpClient) { }

  autenticar(requisicao: IResquisicaoAutenticacao): Observable<IRespostaAutenticacao> {

    return UtilsStaticService.executarPOST(this.httpClient, URL_BACKEND + '/auth', requisicao);
  }

}
