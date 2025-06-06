import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventVO, InvitationStatus } from 'src/app/model/inge';
import { MiscellaneousService } from 'src/app/services/pubman-rest-client/miscellaneous.service';
import { ControlType } from '../../services/form-builder.service';
import { EventValidationDirective } from 'src/app/shared/directives/event-validation.directive';

export enum ValidationErrorsEnum {
  END_DATE_WITHOUT_START_DATE = "EndDateWithoutStartDate",
  EVENT_END_DATE_REQUIRED = "EventEndDateRequired",
  EVENT_PLACE_REQUIRED = "EventPlaceRequired",
  EVENT_START_DATE_REQUIRED = "EventStartDateRequired",
  EVENT_TITLE_NOT_PROVIDED = "EventTitleNotProvided",
  EVENT_TITLE_REQUIRED = "EventTitleRequired",
}

@Component({
  selector: 'pure-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [EventValidationDirective],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  @Input() event_form!: FormGroup<ControlType<EventVO>>;

  miscellaneousService = inject(MiscellaneousService);
  eventValidationDirective = inject(EventValidationDirective); // Inject the directive

  EventValidatorErrorType = ValidationErrorsEnum; // Expose the enum to the template

  invitationBoolean = new FormControl(true);

  ngOnInit() {
    this.invitationBoolean.setValue(this.event_form.get('invitationStatus')?.value == InvitationStatus.INVITED ? true : false);
  }

  get genreSpecificProperties() {
    return this.miscellaneousService.genreSpecficProperties();
  }

  change_invitation_status(event: any) {
    console.log('change_invitation_status', this.invitationBoolean.value); // Debugging line
    this.event_form.get('invitationStatus')?.setValue(this.invitationBoolean.value ? InvitationStatus.INVITED : null);
  }
}


