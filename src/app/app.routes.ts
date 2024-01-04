import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { ItemListViewComponent } from './components/item-list-view/item-list-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    /*
    {
        path: 'list',
        component: ItemListViewComponent
    },
    */
    /* TODO Add after adding search
    {
        
        path: 'ou_tree',
        component: DynTreeComponent
        
    },
    */
    /* TODO Add after adding search
     {
         path: 'advancedSearch', component: ItemSearchComponent, data: {
             saveComponent: true
         }
     },
     */
    /* TODO Add after adding edit
     {
         path: 'edit/:id', component: ItemFormComponent, resolve: { item: itemResolver }
     },
     */
    /* TODO Add after adding PageNotFoundComponent
     {
         path: '**',
         component: PageNotFoundComponent
     }
     */
];
