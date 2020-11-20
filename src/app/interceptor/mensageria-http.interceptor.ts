import { CookieService } from 'ngx-cookie-service';
import { MensageriaService } from './../services/mesageria.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MensageriaHttpInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private mensageriaService: MensageriaService,
    private cookieService: CookieService,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.messageService.clear();
    this.mensageriaService.ativarProcessamento();

    let requisicaoComToken: HttpRequest<any>;
    requisicaoComToken = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.cookieService.get('token_acesso')),
    });

    return next.handle(requisicaoComToken);
  }
}

export const mesageriaHttpInterceptorProvider = [{
  provide: HTTP_INTERCEPTORS,
  useClass: MensageriaHttpInterceptor,
  multi: true,
}, MessageService];

