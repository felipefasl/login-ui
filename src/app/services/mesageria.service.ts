import { ApplicationRef, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MensageriaService {

  processamento: boolean;

  constructor(private applicationRef: ApplicationRef) { }

  ativarProcessamento(): void {

    this.processamento = true;
    this.applicationRef.tick();
  }

  desativarProcessamento(): void {

    this.processamento = false;
    this.applicationRef.tick();
  }

}
