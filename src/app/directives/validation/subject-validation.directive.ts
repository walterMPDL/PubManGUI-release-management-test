import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Errors } from "src/app/model/errors";
import { IdType } from "src/app/model/inge";

export const SubjectValidator: ValidatorFn = (control: AbstractControl,): ValidationErrors | null => {
  const error_types = Errors;
  const id_type = IdType;
  let subject = control;
  if (subject !== null) {
    if (subject.get('value')?.value !== null && subject.get('value')?.value !== '') {
      if (subject.get('type')?.value === null) {
        return { [error_types.SUBJECT_TYPE_NOT_PROVIDED]: true };
      }
    } // if
  } // if
  return null;
}