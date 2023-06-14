import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  setNewItem,
  setNewItemFailure,
  setNewItemSuccess,
} from './createItemActions';
import { createItemService } from 'src/app/services/createItem.service';

@Injectable()
export class createItemEffects {
  constructor(
    private actions$: Actions,
    private createItemService: createItemService
  ) {}

  setNewItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setNewItem),
      switchMap(({ item }) =>
        this.createItemService.setNewItem(item).pipe(
          map((item) => setNewItemSuccess({ item })),
          catchError((error) => of(setNewItemFailure({ error })))
        )
      )
    )
  );

  // loadImages$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadImages),
  //     switchMap(({ formData }) =>
  //       this.createItemService.uploadImages(formData).pipe(
  //         map(() => setNewItemSuccess()),
  //         catchError((error) => of(setNewItemFailure({ error })))
  //       )
  //     )
  //   )
  // );
}
