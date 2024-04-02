import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pure-batch-log-item-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>log-item-details works!</p>`,
  styleUrl: './log-item-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogItemDetailsComponent { }
