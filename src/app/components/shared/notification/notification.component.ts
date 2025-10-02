import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message, MessageService } from "src/app/services/message.service";

@Component({
  selector: 'pure-notification',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  @Input() message?: Message;
  collapsed: boolean = true;

  fg_color = 'text-info-emphasis';
  bg_color = 'bg-info-subtle';
  severity_icon: string = 'info';

  private currentTimeout?: any;

  constructor( private messageSvc: MessageService) { }

  /*
  public onAreaMessage = effect(() => {
    this.message = this.messageSvc.lastMessage();
    this.collapsed = this.message?.collapsed;
    this.dress(this.message);
    return true;
  });

   */

  ngOnChanges() {
    if(this.message) {
      this.dress(this.message);
    }


  }

  dress(content: any): void {
    if(this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
    this.collapsed = content?.collapsed === undefined ? true : content.collapsed;
    switch (content.type) {
      case 'error':
      case 'danger':
        this.fg_color = `text-danger-emphasis`;
        this.bg_color = `bg-danger-subtle`;
        this.severity_icon = 'error';
        break;
      case 'warning':
        this.fg_color = `text-warning-emphasis`;
        this.bg_color = `bg-warning-subtle`;
        this.severity_icon = 'warning';
        break;
      case 'success':
        this.fg_color = `text-success-emphasis`;
        this.bg_color = `bg-success-subtle`;
        this.severity_icon = 'task_alt';
        this.currentTimeout = setTimeout(() => {
          this.close();
        }, 3000);
        break;
      case 'info':
        this.fg_color = 'text-info-emphasis';
        this.bg_color = 'bg-info-subtle';
        this.severity_icon = 'info';
        this.currentTimeout = setTimeout(() => {
          this.close();
        }, 3000);
    }
  }

  close(): void {
    this.message = undefined;
  }

  slide(): void {
    this.collapsed = this.collapsed ? false : true;
  }
}
