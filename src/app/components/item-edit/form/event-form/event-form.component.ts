import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvitationStatus } from 'src/app/model/inge';

@Component({
  selector: 'pure-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  @Input() event_form!: FormGroup;

  invitationBoolean= new FormControl(true);

  ngOnInit() {
    this.invitationBoolean.setValue (this.event_form.get('invitationStatus')?.value == InvitationStatus.INVITED ? true : false);
  }
  
  change_invitation_status(event: any) {
    console.log('')
    this.event_form.get('invitationStatus')?.setValue(this.invitationBoolean.value ? InvitationStatus.INVITED : null);
  }
}
