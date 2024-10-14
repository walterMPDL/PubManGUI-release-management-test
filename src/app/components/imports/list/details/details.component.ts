import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import LogComponent  from './log/log.component';

@Component({
  selector: 'pure-imports-list-details',
  standalone: true,
  imports: [
    CommonModule,
    LogComponent
  ],
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailsComponent { }
