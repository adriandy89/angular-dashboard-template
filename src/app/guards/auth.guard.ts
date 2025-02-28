import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../store/app.store';

export const authGuard: CanActivateFn = () => {
  const appStore = inject(AppStore);
  const router = inject(Router);
  if (appStore.isLoggedIn()) {
    router.navigate(['/']);
    return false; // Redirige al dashboard si está logueado
  }
  return true; // Permite acceder a la ruta
};
