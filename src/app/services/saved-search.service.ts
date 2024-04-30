import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IngeCrudService} from "./inge-crud.service";
import {Observable} from "rxjs";
import {AffiliationDbVO, SavedSearchVO} from "../model/inge";

@Injectable({
  providedIn: 'root'
})
export class SavedSearchService extends IngeCrudService {

  savedSearchPath:string = '/savedSearches';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getSearch(id: string, token?: string): Observable<SavedSearchVO>{
    const path = this.savedSearchPath + '/' + id;
    if(token) {
      return this.get(path, token);
    } else {
      return this.get(path);
    }
  }

  getAllSearch(token: string): Observable<SavedSearchVO[]>{
    const path = this.savedSearchPath;
      return this.get(path, token);

  }

  createSearch(savedSearch: SavedSearchVO, token: string): Observable<SavedSearchVO> {
    return this.post(this.savedSearchPath, savedSearch, token);
  }

  updateSearch(search: SavedSearchVO, token: string): Observable<SavedSearchVO> {
    const path = this.savedSearchPath + '/' + search.objectId

    return this.put(path, search, token);
  }

  deleteSearch(searchId: string, token: string ): Observable<Number>{
    const path = this.savedSearchPath + '/' + searchId;
    return this.delete(path, null, token);
  }
}
