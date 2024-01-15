import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ctxs_suggest } from 'src/app/model/pure_queries';
import { SelectedValue } from '../selector-datasource.service';
import { IngeCrudService } from 'src/app/services/inge-crud.service';

export interface Ctx extends SelectedValue {
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class PureCtxsService {

  constructor(
    private service: IngeCrudService,
  ) { }

  getCtxs(val: string) {
    return this.service.search('/contexts', ctxs_suggest(val)).pipe(
      map(response => {
        const hits = response.records;
        const fields = hits.map((hit: any) => hit.data);
        const ctxs: Ctx[] = fields.map((f: any) => {
          const ctx: Ctx = { selected: '', id: '' };
          ctx.id = f.objectId;
          ctx.selected = f.name;
          return ctx;
        });
        return ctxs;
      }))
  }
}
