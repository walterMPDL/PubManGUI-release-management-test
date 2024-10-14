import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pure-imports-new-import',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './import.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImportComponent { }
