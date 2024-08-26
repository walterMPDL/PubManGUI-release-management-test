import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Inject, HostListener } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';


@Component({
  selector: 'pure-message-reloaded',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './message-reloaded.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageReloadedComponent implements OnInit {

  message: any;

  constructor(
    private dialog: DialogRef<any>,
    @Inject(DIALOG_DATA) private data: any
    ) { }

  ngOnInit(): void {
    this.message = this.data;
    /*
    if (this.message.type === 'info' || this.message.type === 'success') {
      setTimeout(() => {
        this.close();
      }, 5000);
    }
    */  
  }

  close(): void {
    this.dialog.close();
  }

  border_color(message_type: string) {
    return `border-${message_type}-subtle`;
  }

  text_color(message_type: string) {
    return `text-${message_type}-emphasis`;
  }

  btn_color(message_type: string) {
    return `btn-outline-${message_type}`;
  }

  bg_color(message_type: string) {
    return `bg-${message_type}-subtle`;
  }
}
