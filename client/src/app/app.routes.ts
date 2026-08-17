import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Catalog } from './features/catalog/catalog';
import { Book } from './features/book/book';
import { Library } from './features/library/library';
import { Login } from './features/login/login';
import { Register } from './features/register/register'
import { Account } from './features/account/account';

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
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'account',
        component: Account
    }
];
