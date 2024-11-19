import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import DetailsComponent from './logs/items/details/details.component';


const routes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./new/new.component'),
    data: {
      breadcrumb: {
        label: 'New', //label: $localize`:@@new:New`,
      }
    },
  },
  {
    path: 'myimports',
    data: {
      breadcrumb: {
        label: 'My imports', //$localize`:@@myimports:My imports`,
      }
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./logs/import-logs.component'),
        data: {
          breadcrumb: {
            //label: '',
          }
        },
      },
      {
        path: ':id',
        loadComponent: () => import('./logs/items/items.component'),
        data: {
          breadcrumb: {
            label: 'Import items', //$localize`:@@details:Import details`,
          }
        },
        /*
        children: [
          {
            path: 'details',
            loadComponent: () => import('./logs/items/details/details.component'),
            data: {
              breadcrumb: {
                label: 'Import log',
              }
            },
          },
        ],
        */
      },
      {
        path: ':id/details',
        loadComponent: () => import('./logs/items/details/details.component'),
        data: {
          breadcrumb: {
            label: 'Import details', //$localize`:@@details:Import details`,
          }
        }
      },
],
  },
{
    path: '',
    loadComponent: () => import('./imports.component'),
    data: {
      breadcrumb: {
        label: 'Imports', //label: $localize`:@@imports:Imports`,
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportsRoutingModule {}
