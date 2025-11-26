import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';
import { MyLoansComponent } from './my-loans/my-loans.component';

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
            title: 'My Loans'
        }
    ];
