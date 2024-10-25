import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContextDbVO, CreatorRole, ItemVersionState} from "../../../../model/inge";
import {FilterEvent, ItemListComponent} from "../../../item-list/item-list.component";
import {SortSelectorComponent} from "../sort-selector/sort-selector.component";
import {AaService} from "../../../../services/aa.service";
import {baseElasticSearchQueryBuilder} from "../../../../shared/services/search-utils";

@Component({
  selector: 'pure-item-context-filter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ItemListComponent,
    SortSelectorComponent
  ],
  templateUrl: './item-context-filter.component.html',
  styleUrl: './item-context-filter.component.scss'
})
export class ItemContextFilterComponent {
  @Input() itemList!: ItemListComponent;
  contextList: ContextDbVO[] = [];


  constructor(private aa: AaService) {
    aa.principal.subscribe(p => {
      this.contextList = p.moderatorContexts
    })

  }


  ngAfterViewInit(){
    this.itemList.registerFilter(this.getFilterEvent(""))
  }

  handleInputChange($event: any){
    const targetVal = $event.target.value;
    this.itemList.updateFilter(this.getFilterEvent(targetVal));

  }

  getFilterEvent(contextId:string): FilterEvent {
    let query = undefined;

    if(contextId)
      query = baseElasticSearchQueryBuilder('context.objectId', contextId);
    else
      query= undefined;




    const fe: FilterEvent = {
      name: "contextFilter",
      query: query
    }
    return fe; // this will pass the $event object to the parent component.
  }

}
