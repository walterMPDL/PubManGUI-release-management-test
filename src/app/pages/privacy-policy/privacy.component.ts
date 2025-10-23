import { ChangeDetectionStrategy, Component, inject, ViewContainerRef } from '@angular/core';
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { MatomoTracker } from "ngx-matomo-client";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'en-content',
  imports: [
    FormsModule
  ],
  templateUrl: './en/privacy.component.html'
})
export class en {

  matomoOptInSelected = true;
  private matomoTracker = inject(MatomoTracker);

  constructor() {
    //if(!this.matomoTracker.isDisabled())
    this.matomoTracker.isUserOptedOut().then(val => this.matomoOptInSelected = !val);
  }

  matomoOptInChange(val: boolean) {
    if(val) {
      this.matomoOptInSelected = true;
      this.matomoTracker.forgetUserOptOut();
    }
    else {
      this.matomoOptInSelected = false;
      this.matomoTracker.optUserOut();
    }
  }
}

@Component({
  selector: 'de-content',
  templateUrl: './de/privacy.component.html'
})
export class de {


}

@Component({
  selector: 'pure-privacy',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {
  translateSvc = inject(TranslateService);

  private viewContainer = inject(ViewContainerRef);


  ngOnInit() {
    this.loadContent(this.translateSvc.currentLang);
    this.translateSvc.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);
      this.loadContent(this.translateSvc.currentLang);
    });
  }

  loadContent(lang: string) {
    this.viewContainer.clear();
    switch (lang) {
      case 'de':
        this.viewContainer.createComponent(de);
        break;
      default:
        this.viewContainer.createComponent(en);
    }
  }
}
