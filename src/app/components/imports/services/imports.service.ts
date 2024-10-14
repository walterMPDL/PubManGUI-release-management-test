import { signal, computed, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, Observable, throwError } from 'rxjs';
import { inge_rest_uri } from 'src/assets/properties.json';

import { ignoredStatuses } from 'src/app/services/interceptors/http-error.interceptor';
import { AaService } from 'src/app/services/aa.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ItemVersionVO } from 'src/app/model/inge';

@Injectable({
  providedIn: 'root'
})
export class ImportsService {

  readonly #baseUrl: string = inge_rest_uri;

  datasetList = "dataset-list";
  savedSelection = "datasets-checked";

  constructor(
    private http: HttpClient,
    public aa: AaService,
    private msgSvc: MessageService) { }

  get token(): string {
    return this.aa.token || '';
  }

  get user(): string {
    return this.aa.principal.getValue().user?.objectId || '';
  }

  addToBatchDatasets(selection: string): number {
    const fromSelection = sessionStorage.getItem(selection);
    let datasets: string[] = this.items;
    const prev = datasets.length;
    if (fromSelection) {
      this.items = datasets.concat(JSON.parse(fromSelection).filter((element: string) => !datasets.includes(element)));
      return Math.abs(this.items.length - prev); // added
    }
    return 0;
  }

  removeFromBatchDatasets(selection: string): number {
    const fromSelection = sessionStorage.getItem(selection);
    let datasets: string[] = this.items;
    const prev = datasets.length;
    if (fromSelection && prev > 0) {
      this.items = datasets.filter((element: string) => !fromSelection.includes(element));
      return Math.abs(prev - this.items.length); // removed
    }
    return 0;
  }

  #itemsCount = signal(0);

  public getItemsCount = computed( () => this.#itemsCount() );

  get items(): string[] {
    const itemList = sessionStorage.getItem(this.datasetList);
    if (itemList) {
      const items = JSON.parse(itemList);
      if (items.length > 0) {
        this.#itemsSelected.set(true);
        //this.#itemsCount.set(items.length);
        this.#itemsCount.set(999);
        return items;
      }
    }
    this.#itemsSelected.set(false);
    this.#itemsCount.set(0);
    return [] as string[];
  }

  set items(items: string[]) {
    if (items.length > 0) {
      this.#itemsSelected.set(true);
      this.#itemsCount.set(items.length);
    } else {
      this.#itemsSelected.set(false);
      this.#itemsCount.set(0);
    }

    sessionStorage.setItem(this.datasetList, JSON.stringify(items));
  }

  #itemsSelected = signal(false);

  public areItemsSelected = computed( () => this.#itemsSelected() );

}