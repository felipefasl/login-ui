import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';



@NgModule({
  declarations: [
    PaginaInicialComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,

    ButtonModule,
    RouterModule,
    ToolbarModule
  ]
})
export class PaginaInicialModule { }
