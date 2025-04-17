import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventVO, InvitationStatus } from 'src/app/model/inge';
import { MiscellaneousService } from 'src/app/services/pubman-rest-client/miscellaneous.service';
import { ControlType } from '../../services/form-builder.service';
import { EventValidationDirective } from 'src/app/shared/directives/event-validation.directive';

@Component({
  selector: 'pure-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  @Input() event_form!: FormGroup<ControlType<EventVO>>;

  miscellaneousService = inject(MiscellaneousService);
  eventValidationDirective = inject(EventValidationDirective); // Inject the directive


  invitationBoolean = new FormControl(true);

  ngOnInit() {
    this.invitationBoolean.setValue(this.event_form.get('invitationStatus')?.value == InvitationStatus.INVITED ? true : false);
    // this.event_form.addAsyncValidators(this.eventValidationDirective.validate.bind(this.eventValidationDirective));
    /*
    this.event_form.get('startDate')?.valueChanges.subscribe(change => {
      this.updateFormValidity(this.event_form);
    });
    */
  }

  get genreSpecificProperties() {
    return this.miscellaneousService.genreSpecficProperties();
  }

  change_invitation_status(event: any) {
    console.log('change_invitation_status', this.invitationBoolean.value); // Debugging line
    this.event_form.get('invitationStatus')?.setValue(this.invitationBoolean.value ? InvitationStatus.INVITED : null);

    this.eventValidationDirective.validate(this.event_form).subscribe(validationErrors => {
      this.event_form.updateValueAndValidity()
      //this.updateFormValidity(this.event_form); // Manually update form validity after validation
      // this.event_form.updateValueAndValidity(); // Update the form's validity after validation
    }); // Manually trigger validation

    // should work, but doesn't trigger vailidation
    /*
    this.event_form.updateValueAndValidity();
    this.event_form.get('title')?.updateValueAndValidity();
    */
  }

  updateFormValidity(form: FormGroup | FormArray) {
    console.log('updateFormValidity')
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      console.log('control name', field);
      console.log('control.value', JSON.stringify(control?.value));
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.updateFormValidity(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
        control?.markAsDirty({ onlySelf: true });
        control?.updateValueAndValidity();
        console.log('control.valid', JSON.stringify(control?.valid));
      }
    });
  }
}
