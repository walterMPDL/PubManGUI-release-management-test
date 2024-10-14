import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pure-imports-new-fetch',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './fetch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FetchComponent { }
