import { FormGroup } from '@angular/forms';

export function PasswordValidation(claveControl: string, claverControl: string) {
  return (formGroup: FormGroup) => {
    const clave = formGroup.controls[claveControl];
    const claver = formGroup.controls[claverControl];

    if (claver.errors && !claver.errors.PasswordValidation) {
      return;
    }

    if (clave.value !== claver.value) {
      claver.setErrors({ PasswordValidation: true });
    } else {
      claver.setErrors(null);
    }
  };
}
