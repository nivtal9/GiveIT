import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { homePageService } from 'src/app/services/homepage.service';
import { setCategories, setCategoriesFailure, setCategoriesSuccess, setItemsByFilter, setItemsByFilterFailure, setItemsByFilterSuccess, setLocations, setLocationsFailure, setLocationsSuccess, setStatuses, setStatusesFailure, setStatusesSuccess, setSubCategories, setSubCategoriesFailure, setSubCategoriesSuccess } from './homepageActions';

@Injectable()
export class homePageEffects {
  constructor(
    private actions$: Actions,
    private homePageService: homePageService
  ) {}

  setItemsByFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setItemsByFilter),
      switchMap(({ filterObject }) =>
        this.homePageService.setItemsByFilter(filterObject).pipe(
          map((items) => setItemsByFilterSuccess({ items })),
          catchError((error) => of(setItemsByFilterFailure({ error })))
        )
      )
    )
  );

  setLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setLocations),
      switchMap(() =>
        this.homePageService.getLocations().pipe(
          map((locations) => setLocationsSuccess({ locations })),
          catchError((error) => of(setLocationsFailure({ error })))
        )
      )
    )
  );

  setStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setStatuses),
      switchMap(() =>
        this.homePageService.getStatuses().pipe(
          map((statuses) => setStatusesSuccess({ statuses })),
          catchError((error) => of(setStatusesFailure({ error })))
        )
      )
    )
  );
  setCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCategories),
      switchMap(() =>
        this.homePageService.getCategories().pipe(
          map((categories) => setCategoriesSuccess({ categories })),
          catchError((error) => of(setCategoriesFailure({ error })))
        )
      )
    )
  );
  setSubCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSubCategories),
      switchMap(() =>
        this.homePageService.getSubCategories().pipe(
          map((subCategories) => setSubCategoriesSuccess({ subCategories })),
          catchError((error) => of(setSubCategoriesFailure({ error })))
        )
      )
    )
  );
}
