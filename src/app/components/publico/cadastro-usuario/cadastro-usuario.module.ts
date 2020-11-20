import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CaptchaModule } from 'primeng/captcha';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { MensagemCampoModule } from 'src/app/utils/components/mensagem-campo/mensagem-campo.module';
import { MensageriaModule } from 'src/app/utils/components/mensageria/mensageria.module';
import { DirectvesModule } from 'src/app/utils/directives/directves.module';
import { CadastroUsuarioComponent } from './cadastro-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,

    InputTextModule,
    CheckboxModule,
    ButtonModule,
    CaptchaModule,
    PasswordModule,
    CardModule,
    MessagesModule,
    CaptchaModule,

    MensagemCampoModule,
    MensageriaModule,
    DirectvesModule,
  ],
  declarations: [CadastroUsuarioComponent]
})
export class CadastroUsuarioModule { }
