import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Errors } from 'src/app/model/errors';
import { CreatorType } from 'src/app/model/inge';
import { isFormValueEmpty } from "../../utils/utils";

const ORCID_HTTPS = 'https://orcid.org/';
const ORCID_REGEX = /^\d{4}-\d{4}-\d{4}-(\d{3}X|\d{4})$/;

export const creatorValidator: ValidatorFn = (control: AbstractControl,): ValidationErrors | null => {
  const error_types = Errors;
  const creator = control;
  let currentErrors = {} as ValidationErrors;

  if (creator !== null) {
    switch (creator.get('type')?.value) {
      case CreatorType.ORGANIZATION:
        const organization = creator.get('organization');
        if (organization !== null) {
          if ((!isFormValueEmpty(organization.get('name')?.value) ||
            !isFormValueEmpty(organization.get('adress')?.value))
            && isFormValueEmpty(creator.get('role')?.value === null)) {

            //currentErrors[error_types.CREATOR_ROLE_NOT_PROVIDED] = true;
            creator.get('role')?.setErrors({[error_types.CREATOR_ROLE_NOT_PROVIDED] : true});

          }
          if (isFormValueEmpty(organization.get('name')?.value)) {
            //currentErrors[error_types.CREATOR_ORGANIZATION_NAME_NOT_PROVIDED] = true;
            organization.get('name')?.setErrors({[error_types.CREATOR_ORGANIZATION_NAME_NOT_PROVIDED] : true});
          }
        }
        break;
      case CreatorType.PERSON:
        const person = creator.get('person');

        if (person !== null) {
          //currentErrors['TÄÄSÄT'] = true;
          if (isFormValueEmpty(person.get('familyName')?.value)) {
            //currentErrors[error_types.CREATOR_FAMILY_NAME_NOT_PROVIDED] = true;
            person.get('familyName')?.setErrors({[error_types.CREATOR_FAMILY_NAME_NOT_PROVIDED] : true});

          }
          if ((!isFormValueEmpty(person.get('familyName')?.value) ||
            !isFormValueEmpty(person.get('givenName')?.value)) && isFormValueEmpty(creator.get('role')?.value)) {
            //currentErrors[error_types.CREATOR_ROLE_NOT_PROVIDED] = true;
            creator.get('role')?.setErrors({[error_types.CREATOR_ROLE_NOT_PROVIDED] : true});
          }
          const orcid = person.get('orcid');
          if (isFormValueEmpty(orcid)) {
            if (!orcid?.value.startsWith(ORCID_HTTPS)) {
              currentErrors[error_types.CREATOR_ORCID_INVALID] = true;
              person.get('orcid')?.setErrors({[error_types.CREATOR_ORCID_INVALID] : true});
            } else if ((!orcid.value.substring(ORCID_HTTPS.length).match(ORCID_REGEX))) {
              currentErrors[error_types.CREATOR_ORCID_INVALID] = true;
              person.get('orcid')?.setErrors({[error_types.CREATOR_ORCID_INVALID] : true});
            }
          } // if
          const personOrganizations = person.get('organizations') as FormArray;
          if (personOrganizations) {
            let j = 1;
            for (const organization of personOrganizations.controls) {
              if (organization !== null) {
                if ((!isFormValueEmpty(organization.get('name')?.value)
                  || !isFormValueEmpty(organization.get('adress')?.value))
                  && isFormValueEmpty(creator.get('role')?.value === null)) {
                  //currentErrors[error_types.CREATOR_ROLE_NOT_PROVIDED] = true;
                  creator.get('role')?.setErrors({[error_types.CREATOR_ROLE_NOT_PROVIDED] : true});
                } // if
                else if (isFormValueEmpty(organization.get('name')?.value) &&
                  !isFormValueEmpty(organization.get('address')?.value)) {
                  //currentErrors[error_types.CREATOR_ORGANIZATION_NAME_NOT_PROVIDED] = true;
                  organization.get('name')?.setErrors({[error_types.CREATOR_ORGANIZATION_NAME_NOT_PROVIDED] : true});
                }
              }
              j++;
            } // for
          } // if
          break;
        } // if
    } // switch
    return currentErrors;
  } // if
  return null;
}
