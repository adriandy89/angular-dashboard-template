import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialAppSlice } from './app.slice';
import { IUser } from '../models';
import { computed, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { withLoading } from './custom-features/with-loading/with-loading.feature';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withLoading(),
  withProps(_ => ({
    _authService: inject(AuthService),
    notificationService: inject(NotificationService)
  })),
  withComputed(store => ({
    isLoggedIn: computed(() => !!store.user()),
  })),
  withMethods((store) => {
    const checkSession = (): Promise<void> => {
      store.setLoading(true);
      return new Promise((resolve, reject) => {
        store._authService.loadUser().subscribe({
          next: (user: IUser | null) => {
            patchState(store, { user });
            resolve();
          },
          error: () => {
            patchState(store, { user: null });
            localStorage.removeItem('token');
            resolve();
          },
          complete: () => {
            store.setLoading(false);
          }
        });
      });
    }
    const logout = async () => {
      store.setLoading(true);
      patchState(store, { user: null });
      await firstValueFrom(store._authService.logout()).then(
        () => {
          console.log('Logged out');
        }
      ).catch(() => {
        console.error('Error logging out');
      });
      localStorage.removeItem('token');
      store.setLoading(false);
    }

    return {
      setCurrentUser: (user: IUser | null) => {
        patchState(store, { user });
      },
      restartInitialState: () => {
        patchState(store, { user: null });
      },
      checkSession,
      logout,
    };
  }),
  withDevtools('app-store')
);
