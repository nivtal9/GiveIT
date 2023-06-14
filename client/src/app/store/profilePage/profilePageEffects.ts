import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  deleteUserItem,
  deleteUserItemFailure,
  deleteUserItemSuccess,
  getUserItems,
  getUserItemsFailure,
  getUserItemsSuccess,
  updateUserItem,
  updateUserItemFailure,
  updateUserItemSuccess,
} from './profilePageActions';
import { ProfilepageService } from 'src/app/services/profilepage.service';

@Injectable()
export class profilePageEffects {
  constructor(
    private actions$: Actions,
    private profilePageService: ProfilepageService
  ) {}

  getUserItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserItems),
      switchMap(({ userId }) =>
        this.profilePageService.getUserItems(userId).pipe(
          map((items) => getUserItemsSuccess({ items })),
          catchError((error) => of(getUserItemsFailure({ error })))
        )
      )
    )
  );

  updateUserItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserItem),
      switchMap(({ itemId, formData }) =>
        this.profilePageService.updateUserItem(itemId, formData).pipe(
          map(() => updateUserItemSuccess()),
          catchError((error) => of(updateUserItemFailure({ error })))
        )
      )
    )
  );
  deleteUserItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserItem),
      switchMap(({ itemId }) =>
        this.profilePageService.deleteUserItem(itemId).pipe(
          map(() => deleteUserItemSuccess()),
          catchError((error) => of(deleteUserItemFailure({ error })))
        )
      )
    )
  );
}
