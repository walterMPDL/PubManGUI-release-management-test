import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { catchError, defaultIfEmpty, map, Observable, of, } from 'rxjs';
import { ValidationService } from 'src/app/services/pubman-rest-client/validation.service';

@Injectable({
  providedIn: 'root'
})
export class EventValidationDirective implements AsyncValidator {
  constructor(private validationService: ValidationService) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.log('validating Event control');
    const formGroup = control as FormGroup;
    return this.validationService.validateEvent(formGroup.value).pipe(
      map(response => {
        let  validationErrors: ValidationErrors = {};
        if (response.valid == false) {
          if (response.items != null && response.items.length > 0) {
            response.items.forEach((item: any) => {
              validationErrors[item.content as string] = true;
            });
          }
          return validationErrors;
        } else {
          return null;
        }
      }),
      catchError(error => {
        console.log('error', error);
        return of({ invalidEvent: true });
      }),
      defaultIfEmpty(null),
    );
  }
}
