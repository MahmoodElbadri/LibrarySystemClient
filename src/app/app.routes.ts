import { Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { LibraryComponent } from './_components/library/library.component';
import { MyLoansComponent } from './_components/my-loans/my-loans.component';
import { RegisterComponent } from './_components/register/register.component';
import {authGuard} from './_guards/auth.guard';
import { AddBookComponent } from './_components/add-book/add-book.component';
import { EditBookComponent } from './_components/edit-book/edit-book.component';

export const routes: Routes =
    [
        {
            path: '',
            component: LibraryComponent,
            title: 'Index'
        },
        {
            path: 'login',
            component: LoginComponent,
            title: 'Login'
        },
        {
            path: 'My-Loans',
            component: MyLoansComponent,
            title: 'My Loans',
            canActivate: [authGuard]
        },
        {
            path: 'register',
            component: RegisterComponent,
            title: 'Register'
        },
        {
            path: 'add-book',
            component: AddBookComponent,
            title: 'Add Book',
            canActivate: [authGuard]
        },
        {
            path: 'edit-book/:id',
            component: EditBookComponent,
            title: 'Edit Book',
            canActivate: [authGuard]
        }
    ];
