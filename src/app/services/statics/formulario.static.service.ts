import { AbstractControl, FormGroup } from '@angular/forms';

export class FormularioStaticService {

  constructor() { }

  /**
   * @description Verifica se o formulário foi preenchido corretamente
   * @param formulario a ser verificado
   */
  static validarFormulario(formGroup: FormGroup): boolean {

    if (!formGroup.valid) {

      FormularioStaticService.verificaValidacoesForm(formGroup);
      return false;
    }
    return true;
  }

  /**
   * @description Verifica se o formulário é válido destacando as inconsistências em caso de formulário inválido
   */
  static verificaValidacoesForm(formGroup: FormGroup): void {

    let controle: AbstractControl;
    Object.keys(formGroup.controls).forEach((campo) => {

      controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup) {

        FormularioStaticService.verificaValidacoesForm(controle);
      }
    });
  }

  /**
   * @param campoValidar Campo do FormGroup a ser validado
   */
  static definirStatusCampo(campoValidar: AbstractControl, tipo: 'ngClass' | 'ngStyle')
    : { 'p-invalid': boolean } | { 'border-color': string } {

    if (tipo === 'ngClass') {

      return campoValidar.invalid && campoValidar.dirty ? { 'p-invalid': true } : { 'p-invalid': false };
    } else {

      return campoValidar.invalid && campoValidar.dirty ? { 'border-color': 'red' } : { 'border-color': '' };
    }
  }
}
