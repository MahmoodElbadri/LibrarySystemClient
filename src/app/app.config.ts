import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './_interceptors/token.interceptor';
import { authGuard } from './_guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true } ),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([tokenInterceptor, errorInterceptor])),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        autoDismiss: true,
        closeButton: true,
        timeOut: 10000
      }),
    ),
  ]
};
