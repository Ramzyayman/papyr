import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Categories } from './features/categories/categories';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'categories',
        component: Categories
    }
];
