import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

import { signalState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type AuthState = { user: User | null; isLoading: boolean };

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

@Injectable()
export class AuthStore {
  readonly #authService = inject(AuthService);
  readonly #state = signalState(initialState);

  readonly user = this.#state.user;
  readonly isLoading = this.#state.isLoading;

  readonly restartInitialState = () => patchState(this.#state, initialState);

  readonly loadInitialState = (state: AuthState) =>
    patchState(this.#state, { ...state });

  readonly login = rxMethod<{ email: string; password: string }>(
    pipe(
      tap(() => patchState(this.#state, { isLoading: true })),
      exhaustMap((data) => {
        return this.#authService.login(data.email, data.password).pipe(
          tapResponse({
            next: (user: User | null) => {
              console.log(user);
              patchState(this.#state, { user });
            },
            error: (error: any) => {
              console.error(error);
              patchState(this.#state, { user: null });
            },
            finalize: () => patchState(this.#state, { isLoading: false }),
          })
        );
      })
    )
  );

  checkSession(): Promise<void> {
    patchState(this.#state, { isLoading: true });
    return new Promise((resolve, reject) => {
      this.#authService.loadUser().subscribe({
        next: (user: User | null) => {
          console.log(user);
          patchState(this.#state, { user, isLoading: false });

          resolve();
        },
        error: () => {
          patchState(this.#state, { user: null, isLoading: false });
          resolve(); // Resolver aunque falle para no bloquear la app
        },
      });
    });
  }
}
