import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensageria',
  templateUrl: './mensageria.component.html',
  styleUrls: ['./mensageria.component.scss']
})
export class MensageriaComponent implements OnInit {

  @Input() processamento: boolean;
  @Input() animacao = true;
  @Input() mensagens: boolean;
  @Input() flutuante: boolean;
  @Input() fixa: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
