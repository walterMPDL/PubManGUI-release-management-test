import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pure-imports-details-log',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './log.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LogComponent { }
