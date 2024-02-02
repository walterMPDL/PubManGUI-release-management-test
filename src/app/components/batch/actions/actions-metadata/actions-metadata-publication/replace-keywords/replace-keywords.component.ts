import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ChangeKeywordsFormComponent } from './change-keywords-form/change-keywords-form.component';
import { ReplaceKeywordsFormComponent } from './replace-keywords-form/replace-keywords-form.component';

@Component({
  selector: 'pure-replace-keywords',
  standalone: true,
  imports: [
    CommonModule,
    ChangeKeywordsFormComponent,
    ReplaceKeywordsFormComponent
  ],
  templateUrl: './replace-keywords.component.html',
})
export class ReplaceKeywordsComponent { }
