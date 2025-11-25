import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../_services/login.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);

  const user = loginService.currentUser();
  console.log('Interceptor running for URL:', req.url); 
  console.log('Current User Signal:', user);
  // console.log(user?.accessToken);
  if(user){
    if(req.url.includes('login') || req.url.includes('register')) {return next(req);}
    req = req.clone({
      setHeaders: {
       
        Authorization: `Bearer ${user.accessToken}`
      }
    })
  }
  return next(req);
};
