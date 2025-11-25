import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LibraryComponent } from './library/library.component';

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
        }
    ];
