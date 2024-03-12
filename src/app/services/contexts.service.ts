import { Injectable, inject } from '@angular/core';
import { IngeCrudService } from './inge-crud.service';
import { Observable, map } from 'rxjs';
import { AccountUserDbVO, ContextDbVO } from '../model/inge';
import {HttpClient} from "@angular/common/http";
import { AaService } from 'src/app/services/aa.service';

@Injectable({
  providedIn: 'root'
})
export class ContextsService extends IngeCrudService{

  static instance: ContextsService;
  contextsPath: string = '/contexts';
  aaService = inject(AaService);

  constructor(httpClient: HttpClient) {
    super(httpClient);
    ContextsService.instance = this;
  }

  getContext(contextId: string, token?: string): Observable<ContextDbVO>{
    const path = this.contextsPath + '/' + contextId;
    if(token) {
      return this.get(path, token);
    } else {
      return this.get(path);
    }
  }

  createContext(context: ContextDbVO, token: string): Observable<ContextDbVO> {
    return this.post(this.contextsPath, context, token);
  }

  updateContext(context: ContextDbVO, token: string): Observable<ContextDbVO> {
    const path = this.contextsPath + '/' + context.objectId

    return this.put(path, context, token);
  }

  deleteContext(context: ContextDbVO, token: string ): Observable<Number>{
    const path = this.contextsPath + '/' + context.objectId;
    return this.delete(path, null, token);
  }

  getAllContexts(token?: string): Observable<Array<ContextDbVO>> {
    const path = this.contextsPath;
    return this.get(path, token);
  }

  getSearchContexts(body: string, token?: string): Observable<Array<ContextDbVO>> {
    const path = this.contextsPath;
    return this.search(path, body, token).pipe(
      map(result => result.records?.map(record => record.data))
      );
  }

  openContext(context: ContextDbVO, token: string): Observable<ContextDbVO> {
    const path = this.contextsPath + '/' + context.objectId + '/open';
    const body = context.lastModificationDate;

    return this.put(path, context, token);

  }

  closeContext(context: ContextDbVO, token: string): Observable<ContextDbVO> {
    const path = this.contextsPath + '/' + context.objectId + '/close';
    const body = context.lastModificationDate;

    return this.put(path, context, token);
  }

  getDepositorContextsForCurrentUser(): Observable<Array<ContextDbVO>> {
    let token = this.aaService.token ? this.aaService.token : undefined;
    let user: AccountUserDbVO = this.aaService.user;
    let should: any [] = []
    let body = {
      query: {
        bool: {
          should
        }
      }
    };
    var termCounter = 0;
    for (var i = 0; i < user.grantList.length; i++) {
      var grant = user.grantList[i];
      console.log("userGrantType: " + grant.grantType
        + " | userGrantObjectRef: " + grant.objectRef
        + " | userGrantObjectRole: " + grant.role);
      if (grant.role == "DEPOSITOR") {
        body.query.bool.should.push({"term" : {"objectId" : grant.objectRef}})
      }
    }

    console.log('Body: ' + JSON.stringify(body));
    console.log('Token: ' + token);
    return (this.getSearchContexts(JSON.stringify(body), token));
  }

}
