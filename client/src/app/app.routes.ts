import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Catalog } from './features/catalog/catalog';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'catalog',
        component: Catalog
    }
];
