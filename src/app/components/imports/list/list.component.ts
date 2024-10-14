import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import DetailsComponent  from './details/details.component';

@Component({
  selector: 'pure-imports-list',
  standalone: true,
  imports: [
    CommonModule,
    DetailsComponent
  ],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent { }
