import {Component, Input} from '@angular/core';

@Component({
  selector: 'pure-item-view-metadata-element',
  standalone: true,
  imports: [],
  templateUrl: './item-view-metadata-element.component.html',
  styleUrl: './item-view-metadata-element.component.scss'
})
export class ItemViewMetadataElementComponent {
  @Input() sub: boolean = false;

}
