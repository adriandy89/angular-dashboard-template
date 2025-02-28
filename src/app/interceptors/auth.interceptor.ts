import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppStore } from '../store/app.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStore = inject(AppStore);
  return next(req).pipe(
    catchError((error) => {
      console.log('Error', error);
      if (error.status === 401) {
        const currentRoute = router.url;
        if (!currentRoute.includes('/login')) {
          authStore.restartInitialState();
          router.navigate(['/auth/login']);
          console.log('Redirecting to login');
        }
      }
      return throwError(() => error);
    })
  );
};
