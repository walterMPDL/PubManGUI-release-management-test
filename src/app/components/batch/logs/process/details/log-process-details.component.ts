import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pure-process-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>process-details works!</p>`,
  styleUrl: './log-process-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessDetailsComponent { 

  // TO-DO Details als @input
}
