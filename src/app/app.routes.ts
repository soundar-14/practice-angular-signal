import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'signals',
        loadComponent: () => import('./signals/signals.component').then(m => m.SignalsComponent)
    },
    {
        path: 'rxjs-map',
        loadComponent: () => import('./rxjs-map/rxjs-map.component').then(m => m.RxjsMapComponent)
    }
];
