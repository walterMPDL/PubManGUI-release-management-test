import { CommonModule } from '@angular/common';
import { Input, OnInit, DoCheck, AfterViewChecked, Component, QueryList, ViewChildren, HostListener } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {filter, map, Observable, of, startWith, tap} from 'rxjs';

import { ItemVersionVO } from 'src/app/model/inge';
import { AaService } from 'src/app/services/aa.service';
import { ItemsService} from "src/app/services/pubman-rest-client/items.service";
import { MessageService } from 'src/app/shared/services/message.service';

import { ItemListElementComponent } from 'src/app/components/item-list/item-list-element/item-list-element.component';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

import { PaginatorComponent} from "src/app/shared/components/paginator/paginator.component";
import {ItemListComponent} from "../../item-list/item-list.component";
import {baseElasticSearchQueryBuilder} from "../../../shared/services/search-utils";

@Component({
  selector: 'pure-batch-datasets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ItemListElementComponent,
    PaginatorComponent,
    ItemListComponent
  ],
  templateUrl: './datasets.component.html'
})
export default class DatasetsComponent implements OnInit {



  searchQuery: Observable<any>;

  constructor(
    private itemSvc: ItemsService,
    private msgSvc: MessageService,
    public aaSvc: AaService,
    private router: Router,
  ) {
    const ids = router.getCurrentNavigation()?.extras?.state?.['itemList'] || [];
    this.searchQuery = of(baseElasticSearchQueryBuilder("objectId", ids));

  }


  ngOnInit(): void {
    /*
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      // required to work immediately.
      startWith(this.router),
      map((event) => {
        this.itemList = event.history.state['itemList'];
        //this.items(this.itemList);
      }
  )

    ).subscribe(() => {

    });

     */
  }

}
