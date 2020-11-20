import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { UsuarioService } from './../../../services/usuario.service';

@Component({
  selector: 'app-redefinicao-senha',
  templateUrl: './validacao-email.component.html',
  styleUrls: ['./validacao-email.component.scss']
})
export class ValidacaoEmailComponent implements OnDestroy {

  processamento: boolean;
  mensagens: Message[];
  interval: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    this.activatedRoute.queryParams
      .subscribe(params => {

        if (params?.hash) {
          this.processamento = true;
          this.usuarioService.validarEmail({ hash: params.hash })
            .subscribe( resposta => {

              this.processamento = false;
              this.mensagens = [{
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Email validado com sucesso. Você será redirecionado para a tela de login em 5s'
              }];
              let contador = 4;
              this.interval = setInterval(() => {

                if (contador >= 0) {
                  this.mensagens = [{
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: `Email validado com sucesso. Você será redirecionado para a tela de login em ${contador}s`
                  }];
                  this.changeDetectorRef.detectChanges();
                } else {

                  clearInterval(this.interval);
                  this.router.navigate(['/login'], { queryParams: { email: resposta.email } });
                }
                contador--;
              }, 1000);
            }, httpErro => {

              this.processamento = false;
              this.emitirMensagenLinkExpirado(httpErro.error.message);
            });
        } else {

          this.emitirMensagenLinkExpirado();
        }
      });
  }

  ngOnDestroy(): void {

    if (this.interval) {

      clearInterval(this.interval);
    }
  }

  emitirMensagenLinkExpirado(erro?: string): void {

    this.mensagens =  [{
      severity: 'error',
      summary: 'Erro',
      detail: (erro || 'Link inválido')
    }];
  }
}
