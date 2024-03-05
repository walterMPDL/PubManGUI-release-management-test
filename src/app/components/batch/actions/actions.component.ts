import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BatchNavComponent } from '../batch-nav/batch-nav.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ActionsItemStateComponent } from './actions-item-state/actions-item-state.component';
import { ActionsContextComponent } from './actions-context/actions-context.component';
import { ActionsLocalTagsComponent } from './actions-local-tags/actions-local-tags.component';
import { ActionsGenreComponent } from './actions-genre/actions-genre.component';
import { ActionsMetadataComponent } from './actions-metadata/actions-metadata.component';

import { BatchService } from '../services/batch.service';

@Component({
  selector: 'pure-actions',
  standalone: true,
  imports: [
    CommonModule,
    BatchNavComponent,
    ReactiveFormsModule,
    ActionsItemStateComponent,
    ActionsContextComponent,
    ActionsLocalTagsComponent,
    ActionsGenreComponent,
    ActionsMetadataComponent
  ],
  templateUrl: './actions.component.html'
})
export class ActionsComponent {

  private isProcessing: boolean = false;

  constructor(private bs: BatchService) { }

  ngAfterViewInit() {
    // check if there are actions in process:
    this.bs.getBatchProcessUserLock().subscribe({
      next: () => this.isProcessing = true,
      error: () => this.isProcessing = false
    })
    //  if true launch modal with actions lock
    if (!this.isProcessing) {

    };

    if (!this.bs.items) {
      console.log('Please wait, a process is runnig!');
    }

    // check if there are items selected:
    //  if false launch modal with actions lock
    if (!this.bs.items) {
      console.log('Please, select items to be processed!');
    }
  }
}
