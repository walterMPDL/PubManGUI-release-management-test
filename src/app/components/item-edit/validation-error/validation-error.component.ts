import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Errors } from "../../../model/errors";

@Component({
  selector: 'pure-validation-error',
  imports: [],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.scss'
})
export class ValidationErrorComponent {

  @Input({required: true}) control: AbstractControl<any> | null = null;

  errorMessages: string[] = [];

  constructor(private translateService: TranslateService) {
  }
  ngOnInit() {
    if(this.control) {
      console.log("Control" + this.control);


        for(const key  in this.control!.errors) {
          const err = this.control!.errors[key];
          this.errorMessages.push(key + " - " + err);
          console.log("VALIDATION ERROR: " +key + " " + err);
        }
      }



  }

  private getTranslatedErrorMessage(key: string, val: any) {
    switch (key) {
      case 'required': {
        return this.translateService.instant('validation.required');
      }
      /*
      case 'metadata': {
        switch (val) {
          case Errors.CREATOR_ROLE_NOT_PROVIDED :
          case Errors.CREATOR_ORGANIZATION_NAME_NOT_PROVIDED : {
            return this.translateService.instant('validation.required');

          }
        }

      }
*/
      default : {
        return "Unknown error - " + key + ": " + val;
      }
    }
  }

}
/*
CREATOR_ORCID_INVALID
Orcid invalid. Please change in CoNE
CREATOR_ROLE_NOT_PROVIDED
CREATOR_ORGANIZATION_NAME_NOT_PROVIDED
*/
