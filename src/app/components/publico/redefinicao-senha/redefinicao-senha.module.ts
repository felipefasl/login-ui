import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { CaptchaModule } from 'primeng/captcha';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedefinicaoSenhaComponent } from './redefinicao-senha.component';
import { HttpClientModule } from '@angular/common/http';
import { MensagemCampoModule } from 'src/app/utils/components/mensagem-campo/mensagem-campo.module';
import { MensageriaModule } from 'src/app/utils/components/mensageria/mensageria.module';



@NgModule({
  declarations: [RedefinicaoSenhaComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,

    HttpClientModule,

    InputTextModule,
    CheckboxModule,
    ButtonModule,
    CaptchaModule,
    PasswordModule,
    CardModule,

    MensagemCampoModule,
    MensageriaModule
  ],
  providers: [MessageService]
})
export class RedefinicaoSenhaModule { }
