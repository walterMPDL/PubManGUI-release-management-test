import {Component, Input} from '@angular/core';
import {ItemsService} from "../../services/pubman-rest-client/items.service";
import {AaService} from "../../services/aa.service";
import {ItemVersionVO} from "../../model/inge";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {TopnavComponent} from "../../shared/components/topnav/topnav.component";
import {NgClass} from "@angular/common";
import {DateToYearPipe} from "../../shared/services/pipes/date-to-year.pipe";
import {ItemBadgesComponent} from "../../shared/components/item-badges/item-badges.component";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ItemViewMetadataComponent} from "./item-view-metadata/item-view-metadata.component";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'pure-item-view',
  standalone: true,
  imports: [
    TopnavComponent,
    NgClass,
    DateToYearPipe,
    ItemBadgesComponent,
    RouterOutlet,
    NgbTooltip,
    RouterLink,
    ItemViewMetadataComponent
  ],
  templateUrl: './item-view.component.html',
  styleUrl: './item-view.component.scss'
})
export class ItemViewComponent {

  //@Input() id:string | undefined = undefined;


  itemSubject: BehaviorSubject<ItemVersionVO | undefined> = new BehaviorSubject<ItemVersionVO | undefined>(undefined);

  constructor(private itemsService: ItemsService, private aaService: AaService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id)
      this.itemsService.retrieve(id, this.aaService.token ? this.aaService.token : undefined).subscribe(this.itemSubject);
      //this.itemObservable.subscribe(item => {
      //this.item = item;
   //})


  }

  get item(){
    return this.itemSubject.value;
  }

  ngOnInit() {


  }

  }
