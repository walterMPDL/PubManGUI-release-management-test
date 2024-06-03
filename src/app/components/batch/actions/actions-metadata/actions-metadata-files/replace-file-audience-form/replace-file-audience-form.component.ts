import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, ReactiveFormsModule } from '@angular/forms';


import { ValidatorsService } from 'src/app/components/batch/services/validators.service';
import { BatchService } from 'src/app/components/batch/services/batch.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ReplaceFileAudienceParams } from 'src/app/components/batch/interfaces/actions-params';
import { ipList }  from 'src/app/components/batch/interfaces/actions-responses';

@Component({
  selector: 'pure-replace-file-audience-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './replace-file-audience-form.component.html',
})
export class ReplaceFileAudienceFormComponent implements OnInit {

  ous: ipList[] = [];

  constructor(
    private fb: FormBuilder, 
    public validSvc: ValidatorsService,
    private batchSvc: BatchService,
    private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.batchSvc.getIpList()
      .subscribe( ous => this.ous = ous );
  }

  public replaceFileAudienceForm: FormGroup = this.fb.group({
    allowedAudienceIds: this.fb.array([])
  });

  public audienceId: FormControl = new FormControl('', [Validators.required, this.validSvc.notBeOnValidator( this.replaceFileAudienceForm.controls['allowedAudienceIds'] )] );

  get replaceFileAudienceParams(): ReplaceFileAudienceParams {
    const actionParams: ReplaceFileAudienceParams = {
      allowedAudienceIds: this.getIDsOfAudience(),
      itemIds: []
    }
    return actionParams;
  }


  get AudiencesToAdd() {
    return this.replaceFileAudienceForm.get('allowedAudienceIds') as FormArray;
  }

  onAddToNewAudiences(): void {
    if (this.audienceId.invalid) return;

    this.AudiencesToAdd.push(
      this.fb.control(this.audienceId.value, Validators.required)
    );

    this.audienceId.reset();
  }

  onDeleteAudience(index: number): void {
    this.AudiencesToAdd.removeAt(index);
  }

  getIDsOfAudience(): string[] {
    let Audiences = [];

    for (let range of this.AudiencesToAdd.controls) {
      Audiences.push(this.ous.find(x => x.name === range.value)!.id);
    }

    return Audiences;
  }

  onSubmit(): void {    
    if (this.replaceFileAudienceForm.invalid) {
      this.replaceFileAudienceForm.markAllAsTouched();
      return;
    }

    if (this.audienceId.valid) {
      this.onAddToNewAudiences();
    }

    this.batchSvc.replaceFileAudience(this.replaceFileAudienceParams).subscribe( actionResponse => {
      //console.log(actionResponse); 
      this.msgSvc.info(`Action started!\n`);
      setTimeout(() => {
        ( this.replaceFileAudienceForm.controls['allowedAudienceIds'] as FormArray ) = this.fb.array([]);
        this.replaceFileAudienceForm.reset();
      },1000);
    } );

  }

}