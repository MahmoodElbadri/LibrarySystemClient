import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              // validation errors (array)
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              toastr.error(modelStateErrors.flat()[0], 'Validation Error');
            } else {
              toastr.error(error.error || 'Bad Request', 'Error');
            }
            break;

          case 401:
            toastr.error('Unauthorised - Please Login again', 'Error');
            // اوبشنال: ممكن تمسح التوكن وتوديه اللوجن
            // localStorage.removeItem('user'); 
            // localStorage.removeItem('token'); 
            router.navigateByUrl('/login');
            break;

          case 403:
            toastr.error('You are not allowed to do this action', 'Forbidden');
            break;

          case 404:
            toastr.error('Not Found', 'Error');
            break;

          case 500:
            // الـ NavigationExtras دي عشان توديه صفحة ايرور ومعاها تفاصيل الخطأ لو عايز
            // const navigationExtras: NavigationExtras = {state: {error: error.error}};
            // router.navigateByUrl('/server-error', navigationExtras);
            toastr.error('Server Error - Please try again later', 'Error');
            break;

          default:
            toastr.error('Something unexpected went wrong', 'Error');
            console.log(error);
            break;
        }
      }
      
      // المهم جداً: لازم نرجع الإيرور تاني عشان لو الكومبوننت عايز يعمل حاجة خاصة بيه
      return throwError(() => error);
    })
  );
};