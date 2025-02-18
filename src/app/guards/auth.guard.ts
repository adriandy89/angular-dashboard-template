import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  console.log(!!authStore.user());

  if (!!authStore.user()) {
    router.navigate(['/dashboard']);
    return false; // Redirige al dashboard si está logueado
  }
  return true; // Permite acceder a la ruta
};
