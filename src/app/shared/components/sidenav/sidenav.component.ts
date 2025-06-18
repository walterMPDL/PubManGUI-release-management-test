import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, inject, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AaService } from "../../../services/aa.service";

import { MatBadgeModule } from '@angular/material/badge';
import { BatchService } from 'src/app/components/batch/services/batch.service';
import { ImportsService } from 'src/app/components/imports/services/imports.service';
import { BatchNavComponent } from 'src/app/components/batch/batch-nav/batch-nav.component';
import { ImportsNavComponent } from 'src/app/components/imports/imports-nav/imports-nav.component';
import { CartService } from "../../services/cart.service";

import { TranslatePipe } from "@ngx-translate/core";

import { AaComponent } from 'src/app/components/aa/aa.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { LangSwitchComponent } from 'src/app/shared/components/lang-switch/lang-switch.component';


@Component({
  selector: 'pure-sidenav',
  standalone: true,
  imports: [RouterLink, MatBadgeModule, CommonModule, BatchNavComponent, ImportsNavComponent, TranslatePipe, AaComponent, SearchComponent, LangSwitchComponent],
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements AfterViewInit {

  @Input() mobile !: boolean;
  private lastSight: boolean = false;

  @ViewChild('sidenav', { read: ElementRef }) nav!: ElementRef;
  renderer = inject(Renderer2);
  content: HTMLElement | null = null;
  messaging: HTMLElement | null = null;
  nav_mobile: boolean = false;

  aaService = inject(AaService);
  batchSvc = inject(BatchService);
  importsSvc = inject(ImportsService);
  cartService = inject(CartService);
  private document = inject(DOCUMENT);

  ngAfterViewInit(): void {
    this.collapse();
    this.batchSvc.items;
    this.content = this.document.getElementById('content');
    this.messaging = this.document.getElementById('messaging');
  }

  /*
  ex_col() {
    const expanded = this.nav.nativeElement.classList.contains('collapsed');
    this.renderer[expanded ? 'removeClass' : 'addClass'](this.nav.nativeElement, 'collapsed');
  }
  */

  expand() {
    if (this.aaService.principal.getValue().isDepositor || this.aaService.principal.getValue().isModerator) {
      if (!this.importsSvc.hasImports()) this.importsSvc.checkImports();
    }

    if (this.mobile) {
      this.nav_mobile = !this.nav_mobile;
      if (this.content) {
        if (this.nav_mobile) {
          this.content.style.marginTop = '30.5em';
          this.messaging!.style.marginTop = '31.5em';
        }
        else {
          this.content.style.marginTop = '0';
          this.messaging!.style.marginTop = '0';
        }
      }
    } else {
      this.renderer.removeClass(this.nav.nativeElement, 'collapsed');
    }
  }

  collapse() {
    if (!this.mobile) {
      this.renderer.addClass(this.nav.nativeElement, 'collapsed');
      if (this.content) {
        this.content.style.marginTop = '0';
        this.messaging!.style.marginTop = '0';
      }
    }
  }

}