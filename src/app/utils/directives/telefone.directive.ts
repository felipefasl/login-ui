import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[telefone]'
})
export class TelefoneDirective {

  private elemento: HTMLInputElement;

  @HostListener('input', ['$event.target.value']) onInput(valor: string): any {

    this.elemento.value = this.formatar(valor);
  }

  constructor(private elementRef: ElementRef) {

    this.elemento = this.elementRef.nativeElement;
    this.elemento.value = this.formatar(this.elemento.value);
  }

  private formatar(valor: string): string {

    valor = valor.replace(/\D/g, '');

    if (valor.length > 0 && valor.length <= 7) {

      return valor.replace(/^(\d{2})(\d)/, '($1) $2');
    } else {

      if (valor.length <= 10) {

        return valor.replace(/^(\d{2})(\d{4})(\d)/, '($1) $2-$3');
      } else {

        return valor.replace(/^(\d{2})(\d{5})(\d)/, '($1) $2-$3');
      }
    }
  }

}
