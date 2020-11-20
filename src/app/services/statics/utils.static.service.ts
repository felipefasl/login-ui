import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UtilsStaticService {

  static executarGET(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Observable<any> {

    return httpClient.get<any>(endpoint, { params: UtilsStaticService.preencherHttpParams(requisicao) });
  }

  static executarGETPromise(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Promise<any> {

    return httpClient.get<any>(endpoint, { params: UtilsStaticService.preencherHttpParams(requisicao) }).toPromise();
  }

  static executarPOST(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Observable<any> {

    return httpClient.post<any>(endpoint, requisicao);
  }

  static executarPOSTPromise(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Promise<any> {

    return httpClient.post<any>(endpoint, requisicao).toPromise();
  }

  static executarPATCH(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Observable<any> {

      return httpClient.patch<any>(endpoint, { params: UtilsStaticService.preencherHttpParams(requisicao) });
  }

  static executarPATCHPromise(
    httpClient: HttpClient,
    endpoint: string,
    requisicao: any = {}): Promise<any> {

      return httpClient.patch<any>(endpoint, { params: UtilsStaticService.preencherHttpParams(requisicao) }).toPromise();
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
