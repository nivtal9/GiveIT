import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  isLoggedIn,
  isLoggedInFailure,
  isLoggedInSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  setNewUser,
  setNewUserFailure,
  setNewUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './authenticationActions';
import { authenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class authenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: authenticationService
  ) {}
  setNewUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setNewUser),
      switchMap(({ newUser }) =>
        this.authenticationService.setNewUser(newUser).pipe(
          map((user) => setNewUserSuccess({ user })),
          catchError((error) => of(setNewUserFailure({ error })))
        )
      )
    )
  );
  loginUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginUser),
    switchMap(({ loginUser }) =>
      this.authenticationService.loginUser(loginUser).pipe(
        map((user) => loginUserSuccess({ user })),
        catchError((error) => of(loginUserFailure({ error })))
      )
    )
  )
  );
    
  isLoggedIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(isLoggedIn),
      switchMap(() =>
        this.authenticationService.checkUser().pipe(
          map((isUserIn) => isLoggedInSuccess({ isUserIn })),
          catchError((error) => of(isLoggedInFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ newUser }) =>
        this.authenticationService.updateUser(newUser).pipe(
          map((user) => updateUserSuccess({ user })),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );
}
