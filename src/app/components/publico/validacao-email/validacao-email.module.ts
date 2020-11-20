import { MensageriaModule } from './../../../utils/components/mensageria/mensageria.module';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidacaoEmailComponent } from './../../../components/publico/validacao-email/validacao-email.component';

@NgModule({
  declarations: [ValidacaoEmailComponent],
  imports: [
    CommonModule,
    CardModule,
    MensageriaModule,
  ]
})
export class ValidacaoEmailModule { }
