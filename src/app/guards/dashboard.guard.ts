import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const dashboardGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  console.log(!authStore.user());
  if (!authStore.user()) {
    router.navigate(['/auth/login']);
    return false; // Redirige al login si no está autenticado
  }
  return true; // Permite acceder a la ruta
};
