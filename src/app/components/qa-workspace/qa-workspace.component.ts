import { Component } from '@angular/core';
import {map, Observable} from "rxjs";
import {AaService} from "../../services/aa.service";
import {baseElasticSearchQueryBuilder} from "../../shared/services/search-utils";
import {ItemListComponent} from "../item-list/item-list.component";
import {ItemStateFilterComponent} from "../item-list/filters/item-state-filter/item-state-filter.component";
import {SortSelectorComponent} from "../item-list/filters/sort-selector/sort-selector.component";
import {ItemContextFilterComponent} from "../item-list/filters/item-context-filter/item-context-filter.component";

@Component({
  selector: 'pure-qa-workspace',
  standalone: true,
    imports: [
        ItemListComponent,
        ItemStateFilterComponent,
        SortSelectorComponent,
      ItemContextFilterComponent
    ],
  templateUrl: './qa-workspace.component.html',
  styleUrl: './qa-workspace.component.scss'
})
export class QaWorkspaceComponent {

  searchQuery: Observable<any>;

  constructor(private aaService: AaService) {

    this.searchQuery = aaService.principal.pipe(map(p => {

        return {
          bool: {
            must: [baseElasticSearchQueryBuilder("context.objectId", p.moderatorContexts.map(con => con.objectId))]
          }
        }


      })
    )

  }
}
