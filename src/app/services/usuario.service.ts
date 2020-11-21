import { URL_BACKEND } from './../utils/constants';
import { UtilsStaticService } from './statics/utils.static.service';
import { IUsuario } from '../entities/usuario.entities';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  private endpointBase = URL_BACKEND + '/usuarios';

  cadastrar(requisicao: IUsuario): Observable<IUsuario> {

    return UtilsStaticService.executarPOST(this.httpClient, this.endpointBase, requisicao);
  }

  validarEmail(requisicao: { hash: string }): Observable<IUsuario> {

    return UtilsStaticService.executarPOST(this.httpClient, this.endpointBase + '/email', requisicao);
  }

  solicitarRedefinicaoSenha(requisicao: { email: string }): Observable<IUsuario> {

    return UtilsStaticService.executarPOST(this.httpClient, this.endpointBase + '/link-senha', requisicao);
  }

  redefinirSenha(requisicao: { hash: string, senha: string }): Observable<void> {

    return UtilsStaticService.executarPUT(this.httpClient, this.endpointBase + '/hash-senha', requisicao);
  }

  consultarPorHashSenha(hash: string): Observable<IUsuario> {

    const requisicao = {
      hash,
      tipo: 'senha'
    };

    return UtilsStaticService.executarGET(this.httpClient, this.endpointBase + '/hash-senha', requisicao);
  }

  consultarPorEmail(requisicao: { email: string }): Observable<IUsuario> {

    return UtilsStaticService.executarGET(this.httpClient, this.endpointBase + '/email', requisicao);
  }
}
