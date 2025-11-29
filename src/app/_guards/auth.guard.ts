import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';
import {LoginService} from '../_services/login.service';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const currentUser = localStorage.getItem('user');
  const loginService = inject(LoginService)
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if(loginService.currentUser()) {
    return true;
  }
  router.navigateByUrl('/login');
  toastr.error('Please login first');
  return false;
};
