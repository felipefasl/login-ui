import { ValidacaoEmailModule } from './components/publico/validacao-email/validacao-email.module';
import { AcessoNegadoModule } from './utils/components/acesso-negado/acesso-negado.module';
import { PaginaNaoEncontradaModule } from './utils/components/pagina-nao-encontrada/pagina-nao-encontrada.module';
import { mesageriaHttpInterceptorProvider } from './interceptor/mensageria-http.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroUsuarioModule } from './components/publico/cadastro-usuario/cadastro-usuario.module';
import { LoginModule } from './components/publico/login/login.module';
import { PaginaInicialModule } from './components/publico/pagina-inicial/pagina-inicial.module';
import { RedefinicaoSenhaModule } from './components/publico/redefinicao-senha/redefinicao-senha.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),

    PaginaInicialModule,
    LoginModule,
    CadastroUsuarioModule,
    RedefinicaoSenhaModule,
    PaginaNaoEncontradaModule,
    AcessoNegadoModule,
    ValidacaoEmailModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    mesageriaHttpInterceptorProvider,
    CookieService
  ]
})
export class AppModule { }
