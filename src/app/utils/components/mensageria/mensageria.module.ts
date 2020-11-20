import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MensageriaComponent } from './mensageria.component';

@NgModule({
  declarations: [MensageriaComponent],
  exports: [MensageriaComponent],
  imports: [
    CommonModule,
    DialogModule,
    ProgressSpinnerModule,
    ToastModule,
    MessagesModule
  ]
})
export class MensageriaModule { }
