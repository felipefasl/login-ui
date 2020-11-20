import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemCampoComponent } from './mensagem-campo.component';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [
    MensagemCampoComponent
  ],
  exports: [
    MensagemCampoComponent
  ],
  imports: [
    CommonModule,
    MessageModule,
  ],
})
export class MensagemCampoModule { }
