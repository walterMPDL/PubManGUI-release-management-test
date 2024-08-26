import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { MessageComponent } from '../components/message/message.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { MessageReloadedComponent } from '../components/message-reloaded/message-reloaded.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // messageDialogRef!: DialogRef<string>;
  // confirmationDialogRef!: DialogRef<boolean>;
  confirmation = false;

  constructor(public dialog: Dialog) { }

  displayMessage(message?: { type: string; text: string; }) {
    // this.messageDialogRef = this.dialog.open(MessageComponent, {
      this.dialog.open(MessageComponent, {
      // hasBackdrop: false,
      autoFocus: false,
      data: message,
      panelClass: 'pure-dialog',
    });
  }

  displayConfirmation(message?: string) {
    const ref = this.dialog.open(ConfirmationComponent, {
      hasBackdrop: false,
      // autoFocus: false,
      data: message,
      panelClass: 'pure-dialog',
    });
    return ref;
  }

  displayMessageReloaded(message?: { type: string; text: string; }) {
    // this.messageDialogRef = this.dialog.open(MessageComponent, {
      this.dialog.open(MessageReloadedComponent, {
      // hasBackdrop: false,
      autoFocus: false,
      data: message,
      panelClass: 'pure-dialog',
    });
  }

  info(message: string) {
    const msg = { type: 'info', text: message };
    this.displayMessage(msg);
    //this.displayMessageReloaded(msg);
  }

  success(message: string) {
    const msg = { type: 'success', text: message };
    this.displayMessage(msg);
  }

  warning(message: string) {
    const msg = { type: 'warning', text: message };
    this.displayMessage(msg);
  }

  error(message: string) {
    const msg = { type: 'danger', text: message };
    this.displayMessage(msg);
  }
}
