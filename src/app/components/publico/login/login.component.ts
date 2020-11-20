import { environment } from './../../../../environments/environment.prod';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { MessageService } from 'primeng/api';
import { IResquisicaoAutenticacao } from 'src/app/entities/autenticacao.entities';
import { AuthService } from 'src/app/services/auth.service';
import { FormularioStaticService } from 'src/app/services/statics/formulario.static.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, AfterViewInit {

  sitekey = environment.siteKeyCaptcha;

  processamento: boolean;

  redefinicaoSenhaVisivel = false;
  redefinicaoSenhaPermitida = false;

  formulario: FormGroup;
  formularioRedefinicaoSenha: FormGroup;
  definirStatusCampo = FormularioStaticService.definirStatusCampo;

  @ViewChild('autofocusEmail') autofocusEmail: ElementRef;
  @ViewChild('autofocusSenha') autofocusSenha: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    });

    this.formularioRedefinicaoSenha = this.formBuilder.group({

      email: [null, [Validators.required, Validators.email]],
    });

    this.activatedRoute.queryParams
      .subscribe(params => {

        if (params?.email) {

          this.form.email.setValue(params.email);
        }
      });
  }

  ngAfterViewInit(): void {

    if (this.form.email?.value) {

      this.autofocusSenha.nativeElement.focus();
    } else {

      this.autofocusEmail.nativeElement.focus();
    }
  }

  get form(): { [key: string]: AbstractControl } {

    return this.formulario.controls;
  }

  get formRedefinicaoSenha(): { [key: string]: AbstractControl } {

    return this.formularioRedefinicaoSenha.controls;
  }

  redefinirSenha(): void {

    this.redefinicaoSenhaVisivel = true;
    this.messageService.clear();
    this.formularioRedefinicaoSenha.reset();
  }

  permitirRedifinicao(): void {

    this.redefinicaoSenhaPermitida = true;
  }

  enviarEmailLinkRedefinicao(email = this.formRedefinicaoSenha.email.value): void {

    this.messageService.clear();
    if (FormularioStaticService.validarFormulario(this.formularioRedefinicaoSenha)) {
      this.processamento = true;

      this.redefinicaoSenhaVisivel = false;

      this.usuarioService.solicitarRedefinicaoSenha({ email })
        .subscribe(() => {

          this.processamento = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Você receberá no seu email um link para redefinição de senha.'
          });
        }, () => {

          this.processamento = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Email "${email}" não cadastrado no sistema.`
          });
        });
    }
  }


  realizarLoginGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(respostaSingInGoogle => {

        this.usuarioService.consultarPorEmail({ email: respostaSingInGoogle.email })
          .subscribe(respostaConsultaEmail => {

            if (respostaConsultaEmail) {

              this.messageService.clear();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Autenticação realizada com sucesso'
              });
            } else {

              this.router.navigate(['/cadastro-usuario'], {
                queryParams: { email: respostaSingInGoogle.email, nome: respostaSingInGoogle.name }
              });
            }
          });
      });
  }


  realizarLogin(
    username: string = this.form.email?.value,
    password: string = this.form.senha?.value
  ): void {

    this.messageService.clear();

    if (FormularioStaticService.validarFormulario(this.formulario)) {

      this.processamento = true;
      const requisicao: IResquisicaoAutenticacao = {

        tipo: 'email',
        username,
        password
      };
      this.authService.autenticar(requisicao)
        .subscribe(resposta => {

          this.processamento = false;
          this.cookieService.set('token_acesso', resposta.access_token);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Autenticação realizada com sucesso'
          });
        }, httpError => {

          this.processamento = false;
          this.messageService.add({
            severity: 'warn',
            summary: 'Atenção',
            detail: httpError.error.message
          });
        });
    } else {

      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Informe os campos corretamente' });
    }
  }
}
