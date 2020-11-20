import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  declarations: [PaginaNaoEncontradaComponent],
  exports: [PaginaNaoEncontradaComponent],
  imports: [
    CommonModule
  ]
})
export class PaginaNaoEncontradaModule { }
