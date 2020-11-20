import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { FormularioStaticService } from 'src/app/services/statics/formulario.static.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TelefoneValidator } from 'src/app/utils/validators/telefone.validator';
import { environment } from './../../../../environments/environment.prod';
@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
  providers: [MessageService]
})
export class CadastroUsuarioComponent implements OnInit {

  sitekey = environment.siteKeyCaptcha;

  formulario: FormGroup;
  definirStatusCampo = FormularioStaticService.definirStatusCampo;
  @ViewChild('autoFocusNome') autoFocusNome: ElementRef;
  @ViewChild('autoFocusTelefone') autoFocusTelefone: ElementRef;

  styleConfirmacaoSenha: { 'p-invalid': boolean } | { 'border-color': string };
  erroConfirmacaoSenha: boolean;

  captchaValidado = false;

  processamento = false;
  mensagens: Message[];
  interval: any;
  animacao = true;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      nome: [null, Validators.required],
      telefone: [null, [Validators.required, TelefoneValidator.telefoneValido()]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
      confirmacaoSenha: [null, Validators.required],
    });

    this.activatedRoute.queryParams
      .subscribe(params => {

        if (params?.nome) {

          this.form.nome.setValue(params.nome);
          this.form.email.setValue(params.email);

          setTimeout(() => {
            this.mensagens = [{
              severity: 'info',
              summary: 'Informação',
              detail: 'Novo na Plataforma? Cadastre-se'
            }];
            this.autoFocusTelefone.nativeElement.focus();
          }, 0);

        } else {

          setTimeout(() => {
            this.autoFocusNome.nativeElement.focus();
          }, 0);
        }
      });
  }

  get form(): { [key: string]: AbstractControl } {

    return this.formulario.controls;
  }

  validarCaptcha(): void {

    this.captchaValidado = true;
  }

  cadastrarUsuario(): void {

    const formularioValido = FormularioStaticService.validarFormulario(this.formulario);
    this.tratarConfirmacaoSenha();
    if (formularioValido) {

      const requisicao = this.formulario.value;
      delete requisicao.confirmacaoSenha;
      this.processamento = true;
      this.usuarioService.cadastrar(requisicao)
        .subscribe(resposta => {

          this.processamento = false;
          this.adicionarMensagemSucesso();
          this.animacao = false;
          let contador = 4;
          this.interval = setInterval(() => {

            if (contador >= 0) {

              this.adicionarMensagemSucesso(contador);
            } else {

              clearInterval(this.interval);
              this.router.navigate(['/login'], { queryParams: { email: resposta.email } });
            }
            contador--;
          }, 1000);
        }, httpError => {

          this.processamento = false;
          this.mensagens = [({
            severity: 'error',
            summary: 'Erro',
            detail: httpError.error.message
          })];
        });
    }
  }

  adicionarMensagemSucesso(segundos = 5): void {

    this.mensagens = [{
      severity: 'success',
      summary: 'Sucesso',
      detail: `Usuário cadastrado com sucesso. Você será redirecionado para a tela de login em ${segundos}s`
    }];
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
