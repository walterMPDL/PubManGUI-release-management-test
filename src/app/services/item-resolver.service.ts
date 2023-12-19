import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { of, mergeMap, EMPTY } from "rxjs";
// TODO Add after MessageServices is added
// import { MessageService } from "src/app/shared/services/message.service";
import { IngeCrudService } from "./inge-crud.service";

export const itemResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    const service = inject(IngeCrudService);
    // TODO Add after MessageServices is added
    // const message = inject(MessageService);
    const item_id = route.paramMap.get('id');
    const uri = '/items/' + item_id;

    return service.get(uri, undefined).pipe(
        mergeMap(item => {
            if (item) {
                return of(item);
            } else {
                // TODO Add after MessageServices is added
                // message.warning('Invalid item id');
                router.navigate(['pure/pure']);
                return EMPTY;
            }
        })
    );
}