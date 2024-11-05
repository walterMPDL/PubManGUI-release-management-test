import {Component, Input} from '@angular/core';
import {AffiliationDbVO, CreatorVO, ItemVersionVO, OrganizationVO} from "../../../model/inge";
import {ItemViewMetadataElementComponent} from "./item-view-metadata-element/item-view-metadata-element.component";
import {BehaviorSubject} from "rxjs";
import {ItemViewCreatorsComponent} from "./item-view-creators/item-view-creators.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'pure-item-view-metadata',
  standalone: true,
  imports: [
    ItemViewMetadataElementComponent,
    ItemViewCreatorsComponent,
    AsyncPipe
  ],
  templateUrl: './item-view-metadata.component.html',
  styleUrl: './item-view-metadata.component.scss'
})
export class ItemViewMetadataComponent {

  @Input() item!:ItemVersionVO;

  affiliations: OrganizationVO[] = [];
  affiliationMap: Map<string, OrganizationVO> = new Map();
  creatorMap: Map<CreatorVO, number[]> = new Map();


  constructor() {


  }

  ngOnInit() {
    console.log("item" + this.item.metadata.title)
    /*
    this.itemSubject.subscribe(item => {
      if(item) {
        this.sortCreatorsAndAffiliations()
      }
    })

     */

  }



  get publicationState() {
    if (this.item?.metadata.datePublishedInPrint) {
      return "published-in-print"
    } else if (this.item?.metadata.datePublishedOnline) {
      return "published-online"
    } else if (this.item?.metadata.dateAccepted) {
      return "accepted"
    } else if (this.item?.metadata.dateSubmitted) {
      return "submitted"
    } else {
      return undefined;
    }

  }

}
