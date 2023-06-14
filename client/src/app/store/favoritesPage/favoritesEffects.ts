import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';
import { getUserFavoriteItems, getUserFavoriteItemsFailure, getUserFavoriteItemsSuccess, setFavorites, setFavoritesFailure, setFavoritesSuccess } from './favoritesActions';

@Injectable()
export class favoritesEffects {
  constructor(private actions$: Actions,private favoritesService: FavoritesService) {}

  setFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setFavorites),
      switchMap(({ favorites }) =>
        this.favoritesService.addFavorite(favorites).pipe(
          map((favorites) => setFavoritesSuccess({ favorites })),
          catchError((error) => of(setFavoritesFailure({ error })))
        )
      )
    )
  );

  getUserFavoriteItems$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getUserFavoriteItems),
    switchMap(({ userId }) =>
      this.favoritesService.getUserFavoriteItems(userId).pipe(
        map((user) => getUserFavoriteItemsSuccess({ user })),
        catchError((error) => of(getUserFavoriteItemsFailure({ error })))
      )
    )
  )
);
}
