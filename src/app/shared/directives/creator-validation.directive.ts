import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Errors } from 'src/app/model/errors';
import { CreatorType } from 'src/app/model/inge';

const ORCID_HTTPS = 'https://orcid.org/';
const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-(\d{3}X|\d{4})$/;

export const creatorValidator: ValidatorFn = (control: AbstractControl,): ValidationErrors | null => {
  const error_types = Errors;
  const creator = control;
  if (creator !== null && creator.get('role')?.value === null) {
    switch (creator.get('type')?.value) {
      case CreatorType.ORGANIZATION:
        const o = creator.get('organization');
        if (o !== null) {
          if (o.get('name')?.value ||
            o.get('adress')?.value) {
            return { [error_types.CREATOR_ROLE_NOT_PROVIDED]: true };
          }
        }
        break;
      case CreatorType.PERSON:
        const person = creator.get('person');
        if (person !== null) {
          if (person.get('familyName')?.value ||
            person.get('givenName')?.value) {
            return { [error_types.CREATOR_ROLE_NOT_PROVIDED]: true };
          }
          const orcid = person.get('orcid');
          if (orcid !== null && orcid.value !== null) {
            if (!orcid.value.startsWith(ORCID_HTTPS)) {
              return { [error_types.CREATOR_ORCID_INVALID]: true };
            } else if ((!orcid.value.substring(ORCID_HTTPS.length).matches(ORCID_REGEX))) {
              return { [error_types.CREATOR_ORCID_INVALID]: true };
            }
          } // if
          const personOrganizations = person.get('organizations') as FormArray;
          if (personOrganizations) {
            let j = 1;
            for (const organization of personOrganizations.controls) {
              if (organization !== null) {
                if (organization.get('name')?.value ||
                  organization.get('adress')?.value) {
                  return { [error_types.CREATOR_ROLE_NOT_PROVIDED]: true };
                } // if
                else if (organization.get('name')?.value === null &&
                  organization.get('adress')?.value) {
                  return { [error_types.CREATOR_ORGANIZATION_NAME_NOT_PROVIDED]: true };
                }
              } // if
              j++;
            } // for
          } // if
          break;
        } // if
    } // switch
  } // if
  return null;
}