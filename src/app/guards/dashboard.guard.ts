import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../store/app.store';

export const dashboardGuard: CanActivateFn = () => {
  const appStore = inject(AppStore);
  const router = inject(Router);
  if (!appStore.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false; // Redirige al login si no está autenticado
  }
  return true; // Permite acceder a la ruta
};
