import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UtilsStaticService {

  static executarGET(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Observable<any> {

    return httpClient.get<any>(endpoint, { params: UtilsStaticService.preencherHttpParams(requisicao) });
  }

  static executarPOST(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Observable<any> {

    return httpClient.post<any>(endpoint, requisicao);
  }

  static executarPUT(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Observable<any> {

    return httpClient.put<any>(endpoint, requisicao);
  }

  static executarPATCH(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Observable<any> {

      return httpClient.patch<any>(endpoint, { params: UtilsStaticService.preencherHttpParams(requisicao) });
  }

  /**
   * @description Preenche os parâmetros do método HttpClient.get de acordo com a requisicao passada por parámetro
   * @param requisicao Requisição da solicitação rest get
   */
  static preencherHttpParams(requisicao: any): HttpParams {

    let params = new HttpParams();
    Object.keys(requisicao).forEach(parametro => {

      if (requisicao[parametro]) {

        params = params.append(parametro, requisicao[parametro]);
      }
    });
    return params;
  }
}
