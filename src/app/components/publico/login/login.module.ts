import { environment } from './../../../../environments/environment.prod';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ButtonModule } from 'primeng/button';
import { CaptchaModule } from 'primeng/captcha';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './login.component';
import { MensagemCampoModule } from 'src/app/utils/components/mensagem-campo/mensagem-campo.module';
import { MensageriaModule } from 'src/app/utils/components/mensageria/mensageria.module';

@NgModule({
  declarations: [LoginComponent],
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
    DialogModule,
    CaptchaModule,

    CardModule,

    ToastModule,

    MessagesModule,
    MensagemCampoModule,
    MensageriaModule,
  ],
  providers: [
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId || ''
            )
          }]
      }
    }
  ]
})
export class LoginModule { }
