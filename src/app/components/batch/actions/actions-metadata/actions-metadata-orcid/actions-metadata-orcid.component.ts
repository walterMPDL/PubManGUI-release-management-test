import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReplaceOrcidFormComponent } from './replace-orcid-form/replace-orcid-form.component'

@Component({
  selector: 'pure-actions-metadata-orcid',
  standalone: true,
  imports: [
    CommonModule,
    ReplaceOrcidFormComponent
  ],
  templateUrl: './actions-metadata-orcid.component.html',
})
export class ActionsMetadataOrcidComponent { }
