import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Errors } from "src/app/model/errors";
import { isFormValueEmpty } from "../../utils/utils";

export const requiredNoWhitespace: ValidatorFn = (control: AbstractControl,): ValidationErrors | null => {
    if(isFormValueEmpty(control.value)) {
      return {'required': true};
    }
  return null;
}
