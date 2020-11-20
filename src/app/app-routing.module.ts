import { ValidacaoEmailComponent } from './components/publico/validacao-email/validacao-email.component';
import { AcessoNegadoComponent } from './utils/components/acesso-negado/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './utils/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/publico/cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './components/publico/login/login.component';
import { PaginaInicialComponent } from './components/publico/pagina-inicial/pagina-inicial.component';
import { RedefinicaoSenhaComponent } from './components/publico/redefinicao-senha/redefinicao-senha.component';


const routes: Routes = [

  { path: '', component: PaginaInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'redefinicao-senha', component: RedefinicaoSenhaComponent },
  { path: 'validacao-email', component: ValidacaoEmailComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
