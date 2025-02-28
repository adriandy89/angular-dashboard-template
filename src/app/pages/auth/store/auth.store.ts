import { signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialAuthSlice } from "./auth.slice";
import { inject } from "@angular/core";
import { AppStore } from "../../../store/app.store";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { AuthService } from "../../../services/auth.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { ILoginResponse, ILoginUser, IRegisterUser, IUser } from "../../../models";
import { switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { withRequestStatus } from "../../../store/custom-features/with-request-status/with-request-status.feature";
import { UserService } from "../../../services/user.service";

export const AuthStore = signalStore(
  withState(initialAuthSlice),
  withRequestStatus(),
  withProps(_ => ({
    _appStore: inject(AppStore),
    _authService: inject(AuthService),
    _userService: inject(UserService),
  })),
  withMethods(store => ({
    setCurrentUser: store._appStore.setCurrentUser,
  })),
  withComputed(store => ({
    isLoggedIn: store._appStore.isLoggedIn,
  }),
  ),
  withMethods(store => {
    const login = rxMethod<ILoginUser>(input$ => input$.pipe(
      tap(_ => store.requestSetPending()),
      switchMap((data) => store._authService.login(data).pipe(
        tapResponse({
          next: (data: ILoginResponse) => {
            localStorage.setItem('token', data.token);
            store.setCurrentUser(data.user ?? null);
            store.requestSetFulfilled();
            store._appStore.notificationService.show({
              type: 'success',
              summaryKey: 'welcome',
              messageKey: 'auth.loginSuccess',
            });
          },
          error: (error: any) => {
            console.error(error);
            store.setCurrentUser(null);
            store.requestSetError(error.statusText ?? 'error');
            store._appStore.notificationService.show({
              type: 'error',
              summaryKey: 'auth.errors.loginFailed',
              messageKey: error.statusText ?? 'error',
            });
          }
        })))));
    const register = rxMethod<IRegisterUser>(input$ => input$.pipe(
      tap(_ => store.requestSetPending()),
      switchMap((data) => store._userService.create(data).pipe(
        tapResponse({
          next: (user: IUser | null) => {
            store.requestSetFulfilled();
            store._appStore.notificationService.show({
              type: 'success',
              summaryKey: 'auth.registerSuccess',
              messageKey: 'auth.login',
              duration: 5000,
            });
          },
          error: (error: any) => {
            console.error(error.statusText);
            store.requestSetError(error.statusText ?? 'error');
            store._appStore.notificationService.show({
              type: 'error',
              summaryKey: 'auth.errors.registerFailed',
              messageKey: error.statusText ?? 'error',
            });
          },
        })))));
    return {
      login,
      register,
    }
  }),
  withHooks({
    onInit(store) {
      console.log('auth store on init');
    },
    onDestroy(store) {
      console.log('auth store on destroy');
    },
  }),
  withDevtools('auth-store')
);


