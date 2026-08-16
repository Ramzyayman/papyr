import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Catalog } from './features/catalog/catalog';
import { Book } from './features/book/book';
import { Library } from './features/library/library';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'catalog',
        component: Catalog
    },
    {
        path: 'books/:id',
        component: Book
    },
    {
        path: 'library',
        component: Library
    }
];
