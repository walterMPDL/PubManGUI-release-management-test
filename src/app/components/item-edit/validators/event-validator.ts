import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { ValidationService } from "src/app/services/pubman-rest-client/validation.service";
import { ControlType } from "../services/form-builder.service";
import { EventVO } from "src/app/model/inge";

export class EventValidator {

    //inject validationService
    private validationService= inject(ValidationService);
 
    
    /*
    public validateEvent() : ValidatorFn {
      console.log('validating Event');
        return (control: AbstractControl) => {
            // Assuming the control is a FormGroup, you can cast it
            console.log('validating Event control');
            const formGroup = control as FormGroup;
            this.validationService.validateEvent(formGroup.value).pipe(
              map(response => {
                if (response.status >= 400) {
                  return { invalidEvent: true };
                }
                return null;
              }),
              catchError(error => {
                return of({ invalidEvent: true });
              })
            );
          };
    }
          */
}
