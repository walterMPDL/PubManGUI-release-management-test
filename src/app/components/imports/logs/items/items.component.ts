import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, LOCALE_ID, HostListener, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ImportsService } from '../../services/imports.service';
import { ImportLogItemDbVO, ImportErrorLevel, ImportLogDbVO } from 'src/app/model/inge';

import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { StateFilterPipe } from 'src/app/components/imports/pipes/stateFilter.pipe';

import { PaginatorComponent } from "src/app/shared/components/paginator/paginator.component";

@Component({
  selector: 'pure-import-log-items',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NgbTooltip,
    // StateFilterPipe,
    PaginatorComponent
  ],
  templateUrl: './items.component.html'
})
export default class ItemsComponent implements OnInit {
  importsSvc = inject(ImportsService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);

  currentPage = this.importsSvc.lastPageNumFrom().details;
  pageSize = 25;
  inPage: ImportLogItemDbVO[] = [];

  unfilteredSize = 0;
  filteredSize = 0;
  unfilteredLogs: ImportLogItemDbVO[] = [];
  filteredLogs: ImportLogItemDbVO[] = [];

  import!: ImportLogDbVO;

  itemsFailed: number = 0;
  itemsImported: number = 0;
  error: number = 0;
  fatal: number = 0;
  fine: number = 0;
  problem: number = 0;
  warning: number = 0;

  public filterForm: FormGroup = this.fb.group({
    fine: [true, Validators.requiredTrue],
    warning: [true, Validators.requiredTrue],
    problem: [true, Validators.requiredTrue],
    error: [true, Validators.requiredTrue],
    fatal: [true, Validators.requiredTrue],
  });

  activeFilters: ImportErrorLevel[] = [
    ImportErrorLevel.FINE,
    ImportErrorLevel.WARNING,
    ImportErrorLevel.PROBLEM,
    ImportErrorLevel.ERROR,
    ImportErrorLevel.FATAL
  ];

  executeOnceTimeout = false;

  importStatusTranslations = {};
  importErrorLevelTranslations = {};
  importMessageTranslations = {};
  importFormatTranslations = {};

  isScrolled = false;

  constructor(
    @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => {
      this.import = value['import'];
    });

    if (this.import.id) {
      this.importsSvc.getImportLogItems(Number(this.import.id))
        .subscribe(importsResponse => {
          if (importsResponse.length === 0) return this.router.navigate(['/import/myimports']);

          importsResponse.sort((a, b) => a.id - b.id)
            .forEach(element => {
              if (element.itemId) {
                this.itemsImported++;
              } else if (element.message.includes("item")) {
                this.itemsFailed++;
              }
              switch (element.errorLevel) {
                case ImportErrorLevel.FINE:
                  this.fine++;
                  break;
                case ImportErrorLevel.WARNING:
                  this.warning++;
                  break;
                case ImportErrorLevel.PROBLEM:
                  this.problem++;
                  break;
                case ImportErrorLevel.ERROR:
                  this.error++;
                  break;
                case ImportErrorLevel.FATAL:
                  this.fatal++;
                  break;
              }
            });
          this.filteredLogs = this.unfilteredLogs = importsResponse;
          this.filteredSize = this.unfilteredSize = this.unfilteredLogs.length;

          if (this.importsSvc.getLogFilters().length > 0) {
            if (this.activeFilters.length === this.importsSvc.getLogFilters().length
              && (this.activeFilters.every((element_1) =>
                this.importsSvc.getLogFilters().some((element_2) =>
                  Object.keys(element_1).every((key: any) => element_1[key] === element_2[key])
                )))) {
            } else {
              this.activeFilters = this.importsSvc.getLogFilters();
              this.filterForm.patchValue({
                fine: this.activeFilters.includes(ImportErrorLevel.FINE),
                warning: this.activeFilters.includes(ImportErrorLevel.WARNING),
                problem: this.activeFilters.includes(ImportErrorLevel.PROBLEM),
                error: this.activeFilters.includes(ImportErrorLevel.ERROR),
                fatal: this.activeFilters.includes(ImportErrorLevel.FATAL),
              });
              this.updateFilteredLogs();
            }
          }  
          this.refreshLogs();
          return;
        });
    }

    this.loadTranslations(this.locale);
  }

  async loadTranslations(lang: string) {
    if (lang === 'de') {
      await import('src/assets/i18n/messages.de.json').then((msgs) => {
        this.importStatusTranslations = msgs.ImportStatus;
        this.importErrorLevelTranslations = msgs.ImportErrorLevel;
        this.importMessageTranslations = msgs.ImportMessage;
        this.importFormatTranslations = msgs.ImportFormat;
      })
    } else {
      await import('src/assets/i18n/messages.json').then((msgs) => {
        this.importStatusTranslations = msgs.ImportStatus;
        this.importErrorLevelTranslations = msgs.ImportErrorLevel;
        this.importMessageTranslations = msgs.ImportMessage;
        this.importFormatTranslations = msgs.ImportFormat;
      })
    }
  }

  getAssorted(txt: string): string {
    switch (txt) {
      case 'FINE':
      case 'WARNING':
        return txt;
      default:
        return 'ERROR';
    }
  }

  refreshLogs() {
    this.currentPage = Math.ceil((this.currentPage * this.pageSize) / this.getPreferredPageSize());
    this.pageSize = this.getPreferredPageSize();
    this.inPage = this.filteredLogs.map((log, i) => ({ _id: i + 1, ...log })).slice(
      (this.currentPage - 1) * this.pageSize,
      (this.currentPage - 1) * this.pageSize + this.pageSize,
    );
    this.importsSvc.lastPageNumFrom().details = this.currentPage;
  }

  getPreferredPageSize(): number {
    if (sessionStorage.getItem('preferredPageSize') && Number.isFinite(+sessionStorage.getItem('preferredPageSize')!)) {
      return +sessionStorage.getItem('preferredPageSize')!;
    } else return this.pageSize || 25;
  }

  refreshFilters(): void {
    this.activeFilters = [];
    if (this.filterForm.get('fine')?.value) {
      this.activeFilters.push(ImportErrorLevel.FINE);
    } else
      if (this.filterForm.get('warning')?.value) {
        this.activeFilters.push(ImportErrorLevel.WARNING);
      }
    if (this.filterForm.get('problem')?.value) {
      this.activeFilters.push(ImportErrorLevel.PROBLEM);
    }
    if (this.filterForm.get('error')?.value) {
      this.activeFilters.push(ImportErrorLevel.ERROR);
    }
    if (this.filterForm.get('fatal')?.value) {
      this.activeFilters.push(ImportErrorLevel.FATAL);
    }
  }

  saveFilters(): void {
    this.importsSvc.setLogFilters(this.activeFilters);
  }

  onFilterChange(): void {
    this.refreshFilters();
    this.saveFilters();

    if (!this.executeOnceTimeout) {
      this.executeOnceTimeout = true;
      setTimeout(() => {

        this.updateFilteredLogs();
        this.currentPage = 1;
        this.refreshLogs();

        this.executeOnceTimeout = false;
      }, 100);
    };
  }

  updateFilteredLogs():void {
    this.filteredLogs = this.unfilteredLogs.filter(item => this.activeFilters.includes(item.errorLevel));
    this.filteredSize = this.filteredLogs.length;
  } 

  getImportStatusTranslation(txt: string): string {
    let key = txt as keyof typeof this.importStatusTranslations;
    return this.importStatusTranslations[key];
  }

  getImportErrorLevelTranslation(txt: string): string {
    let key = txt as keyof typeof this.importErrorLevelTranslations;
    return this.importErrorLevelTranslations[key];
  }

  getImportMessageTranslation(txt: string): string {
    let key = txt as keyof typeof this.importMessageTranslations;
    return this.importMessageTranslations[key];
  }

  getImportFormatTranslation(txt: string): string {
    let key = txt as keyof typeof this.importFormatTranslations;
    return this.importFormatTranslations[key];
  }

  doDelete(): void {
    console.log('Delete done');
    // TO DO
  }

  doSet(): void {
    console.log('Set done');
    // TO DO
  }

  doRelease(): void {
    console.log('Release done');
    // TO DO
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50 ? true : false;
  }

}