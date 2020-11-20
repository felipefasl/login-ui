import { AbstractControl, Validators } from '@angular/forms';
export class TelefoneValidator {

  static telefoneValido(): (control: AbstractControl) => Validators {

    return (control: AbstractControl): Validators => {
      const telefone: string = control.value;

      if (telefone?.length < 14 || telefone?.length > 15) {

        return { telefone: true };
      } else {

        return null;
      }
    };
  }
}

