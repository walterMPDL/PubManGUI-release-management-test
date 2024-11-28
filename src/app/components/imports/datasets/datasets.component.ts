import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AaService } from 'src/app/services/aa.service';

import { Router } from '@angular/router';

import { ItemListComponent} from "../../item-list/item-list.component";
import { baseElasticSearchQueryBuilder} from "../../../shared/services/search-utils";
import { SortSelectorComponent } from "../../item-list/filters/sort-selector/sort-selector.component";

@Component({
  selector: 'pure-batch-datasets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemListComponent,
    SortSelectorComponent
],
  templateUrl: './datasets.component.html'
})
export default class DatasetsComponent {

  searchQuery: Observable<any>;

  constructor(
    public aaSvc: AaService,
    private router: Router,
  ) {
    const ids = router.getCurrentNavigation()?.extras?.state?.['itemList'] || [];
    this.searchQuery = of(baseElasticSearchQueryBuilder("objectId", ids));
  }

}
