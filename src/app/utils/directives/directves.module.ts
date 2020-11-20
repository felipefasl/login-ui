import { TelefoneDirective } from './telefone.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TelefoneDirective],
  exports: [TelefoneDirective]
})
export class DirectvesModule { }
