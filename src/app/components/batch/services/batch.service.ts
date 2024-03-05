import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, Observable, of, throwError } from 'rxjs';
import { inge_rest_uri } from 'src/assets/properties.json';

import * as params from '../interfaces/actions-params';
import * as resps from '../interfaces/actions-responses';

import { ignoredStatuses } from 'src/app/services/interceptors/http-error.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  private readonly baseUrl: string = inge_rest_uri;

  private ouList: resps.ipList[] = [];

  constructor(private http: HttpClient) { }

  get items(): any {
    const itemList = sessionStorage.getItem('item_list');
    if (itemList) { 
      return JSON.parse(itemList); 
    } else throw new Error('Please, select items to be processed!');
  }

  get token(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      return token; 
    } else throw new Error('Please, log in!');
  }

  get user(): any {
    const user_string = sessionStorage.getItem('user');
    if (user_string) {
      return JSON.parse(user_string);
    } else throw new Error('Please, log in!');
  }

  getIpList():Observable<resps.ipList[]> {
    const headers = new HttpHeaders().set('Authorization', this.token!);
    const url  = `${ this.baseUrl }/miscellaneous/getIpList`;
    return this.http.get<resps.ipList[]>(url, { headers });
  }

  // TO-DO
  // public updatePerson(event: any) {}

  // TO-DO
  // public updateContext(event: any) {}

  getBatchProcessUserLock():Observable<resps.getBatchProcessUserLockResponse> {
    const url  = `${ this.baseUrl }/batchProcess/getBatchProcessUserLock`;
    const headers = new HttpHeaders()
      .set('Authorization', this.token!);
      return this.http.get<resps.getBatchProcessUserLockResponse>(url, { headers, context: ignoredStatuses([404]) });
  }

  deletePubItems(actionParams: params.DeletePubItemsParams): Observable<params.DeletePubItemsParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.DeletePubItemsParams> = of(actionParams);
    return actionResponse;
  }

  submitPubItems(actionParams: params.SubmitPubItemsParams): Observable<params.SubmitPubItemsParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.SubmitPubItemsParams> = of(actionParams);
    return actionResponse;
  }
  
  revisePubItems(actionParams: params.RevisePubItemsParams): Observable<params.RevisePubItemsParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.RevisePubItemsParams> = of(actionParams);
    return actionResponse;
  }

  releasePubItems(actionParams: params.ReleasePubItemsParams): Observable<params.ReleasePubItemsParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ReleasePubItemsParams> = of(actionParams);
    return actionResponse;
  }

  withdrawPubItems(actionParams: params.WithdrawPubItemsParams): Observable<resps.actionGenericResponse> {
    actionParams.itemIds = this.items;

    const headers = new HttpHeaders().set('Authorization', this.token!);
    console.log('headers.Authorization: \n' + headers.get('Authorization'));
    const url  = `${ this.baseUrl }/batchProcess/withdrawPubItems`;
    const body = actionParams;
    //console.log('actionParams: \n' + JSON.stringify(actionParams));

    const actionResponse: Observable<resps.actionGenericResponse> = this.http.put<resps.actionGenericResponse>( url, body, { headers })
      .pipe(
        tap( (value: resps.actionGenericResponse) => console.log('Success: \n' + JSON.stringify(value)) ),
        catchError( err => throwError( () => err )),
      );
    console.log('actionResponse: \n' + JSON.stringify(actionResponse));
    return actionResponse;
  }

  changeContext(actionParams: params.ChangeContextParams): Observable<params.ChangeContextParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeContextParams> = of(actionParams);
    return actionResponse;
  }
  
  addLocalTags(actionParams: params.AddLocalTagsParams): Observable<params.AddLocalTagsParams> {
    //console.log(`{\"localTags\": ${JSON.stringify(actionParams.localTags)}}`);
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.AddLocalTagsParams> = of(actionParams);
    return actionResponse;
  } 

  changeLocalTags(actionParams: params.ChangeLocalTagParams): Observable<params.ChangeLocalTagParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeLocalTagParams> = of(actionParams);
    return actionResponse;
  } 

  changeGenre(actionParams: params.ChangeGenreParams): Observable<params.ChangeGenreParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeGenreParams> = of(actionParams);
    return actionResponse;
  }

  changeFileVisibility(actionParams: params.ChangeFileVisibilityParams): Observable<params.ChangeFileVisibilityParams> {  
    //console.log(`{\"userAccountIpRange\": ${JSON.stringify(actionParams.localTags)}}`);
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeFileVisibilityParams> = of(actionParams);
    return actionResponse;
  }

  changeFileContentCategory(actionParams: params.ChangeFileContentCategoryParams): Observable<params.ChangeFileContentCategoryParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeFileContentCategoryParams> = of(actionParams);
    return actionResponse;
  }

  replaceFileAudience(actionParams: params.ReplaceFileAudienceParams): Observable<params.ReplaceFileAudienceParams> {
    //console.log(`{\"audiences\": ${JSON.stringify(this.audiences)}}`);
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ReplaceFileAudienceParams> = of(actionParams);
    return actionResponse;
  }

  changeExternalReferenceContentCategory(actionParams: params.ChangeExternalReferenceContentCategoryParams): Observable<params.ChangeExternalReferenceContentCategoryParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeExternalReferenceContentCategoryParams> = of(actionParams);
    return actionResponse;
  }

  replaceOrcid(actionParams: params.ReplaceOrcidParams): Observable<params.ReplaceOrcidParams> {
    console.log(`Authorization: ${this.token}`);
    //console.log(`{\"itemIds\": ${JSON.stringify(this.items)}}`);
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ReplaceOrcidParams> = of(actionParams);
    return actionResponse;
  } 

  changeReviewMethod(actionParams: params.ChangeReviewMethodParams): Observable<params.ChangeReviewMethodParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeReviewMethodParams> = of(actionParams);
    return actionResponse;
  }

  addKeywords(actionParams: params.AddKeywordsParams): Observable<params.AddKeywordsParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.AddKeywordsParams> = of(actionParams);
    return actionResponse;
  }

  replaceKeywords(actionParams: params.ReplaceKeywordsParams): Observable<params.ReplaceKeywordsParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ReplaceKeywordsParams> = of(actionParams);
    return actionResponse;
  }

  changeKeywords(actionParams: params.ChangeKeywordsParams): Observable<params.ChangeKeywordsParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeKeywordsParams> = of(actionParams);
    return actionResponse;
  }

  changeSourceGenre(actionParams: params.ChangeSourceGenreParams): Observable<params.ChangeSourceGenreParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeSourceGenreParams> = of(actionParams);
    return actionResponse;
  }

  replaceSourceEdition(actionParams: params.ReplaceSourceEditionParams): Observable<params.ReplaceSourceEditionParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ReplaceSourceEditionParams> = of(actionParams);
    return actionResponse;
  }

  addSourceIdentifer(actionParams: params.AddSourceIdentiferParams): Observable<params.AddSourceIdentiferParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.AddSourceIdentiferParams> = of(actionParams);
    return actionResponse;
  }
  
  changeSourceIdentifier(actionParams: params.ChangeSourceIdentifierParams): Observable<params.ChangeSourceIdentifierParams> {
    actionParams.itemIds = this.items;
    const actionResponse: Observable<params.ChangeSourceIdentifierParams> = of(actionParams);
    return actionResponse;
  }

}