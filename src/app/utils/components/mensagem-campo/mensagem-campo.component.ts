import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mensagem-campo',
  templateUrl: './mensagem-campo.component.html',
  styleUrls: ['./mensagem-campo.component.scss']
})
export class MensagemCampoComponent {

  @Input() campo: FormControl;
  @Input() debug: boolean;

  json = JSON.stringify;

  constructor() { }

}
