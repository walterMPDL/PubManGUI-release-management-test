import { Component } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: 'pure-toolsnav',
  templateUrl: './toolsnav.component.html',
    standalone: true,
    imports: [TranslatePipe]
})
export class ToolsnavComponent {}
