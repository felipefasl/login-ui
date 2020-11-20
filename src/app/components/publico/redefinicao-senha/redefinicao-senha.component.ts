import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { IUsuario } from 'src/app/entities/usuario.entities';
import { FormularioStaticService } from 'src/app/services/statics/formulario.static.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-redefinicao-senha',
  templateUrl: './redefinicao-senha.component.html',
  styleUrls: ['./redefinicao-senha.component.scss']
})
export class RedefinicaoSenhaComponent implements OnInit, AfterViewInit {

  usuario: IUsuario;
  hash: string;

  processamento: boolean;
  animacao = true;
  mensagens: Message[];
  interval: any;

  formulario: FormGroup;
  definirStatusCampo = FormularioStaticService.definirStatusCampo;
  @ViewChild('autofocus') autofocus: ElementRef;

  styleConfirmacaoSenha: { 'p-invalid': boolean } | { 'border-color': string };
  erroConfirmacaoSenha: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private router: Router
  ) {

    this.activatedRoute.queryParams
      .subscribe(params => {

        if (params?.hash) {
          this.processamento = true;
          this.usuarioService.consultarPorHashSenha(params.hash)
            .subscribe(resposta => {

              this.usuario = resposta;
              this.hash = params.hash;
              this.processamento = false;

            }, httpErro => {

              this.processamento = false;
              this.emitirMensagenLinkExpirado(httpErro.error.message);
            });
        } else {

          this.emitirMensagenLinkExpirado(undefined);
        }
      });

  }

  emitirMensagenLinkExpirado(erro: string): void {

    this.messageService.clear();
    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: erro || 'Link inválido'
      });
    }, 0);
  }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      senha: [null, Validators.required],
      confirmacaoSenha: [null, Validators.required],
    });
  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.autofocus.nativeElement.focus();
    }, 50);
  }

  get form(): { [key: string]: AbstractControl } {

    return this.formulario.controls;
  }

  redefinirSenha(hash = this.hash, senha = this.form.senha?.value): void {

    const formularioValido = FormularioStaticService.validarFormulario(this.formulario);
    this.tratarConfirmacaoSenha();

    if (formularioValido) {

      this.processamento = true;
      this.usuarioService.redefinirSenha({ hash, senha })
        .subscribe(() => {


          this.processamento = false;
          this.adicionarMensagemSucesso();
          this.animacao = false;
          let contador = 4;
          this.interval = setInterval(() => {

            if (contador >= 0) {

              this.adicionarMensagemSucesso(contador);
            } else {

              clearInterval(this.interval);
              this.router.navigate(['/login'], { queryParams: { email: this.usuario.email } });
            }
            contador--;
          }, 1000);

        }, httpError => {

          this.processamento = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: httpError.error.message
          });
        });
    }
  }

  adicionarMensagemSucesso(segundos = 5): void {

    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `Senha alterada. Você será redirecionado para a tela de login em ${segundos}s`
    });
  }

  tratarConfirmacaoSenha(): void {

    this.erroConfirmacaoSenha = false;
    if (this.form.confirmacaoSenha.errors) {

      this.styleConfirmacaoSenha = this.definirStatusCampo(this.form.confirmacaoSenha, 'ngStyle');
    } else {

      if (this.form.senha.value !== this.form.confirmacaoSenha.value) {

        this.styleConfirmacaoSenha = { 'border-color': 'red' };
        this.erroConfirmacaoSenha = true;
      } else {

        this.styleConfirmacaoSenha = { 'border-color': '' };
      }
    }
  }
}
