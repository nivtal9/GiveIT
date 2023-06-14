import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  deleteNotification,
  deleteNotificationFailure,
  deleteNotificationSuccess,
  setNewNotification,
  setNewNotificationFailure,
  setNewNotificationSuccess,
} from './notificationActions';
import { notificationService } from 'src/app/services/notification.service';

@Injectable()
export class notificationEffects {
  constructor(
    private actions$: Actions,
    private notificationService: notificationService
  ) {}

  setNewNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setNewNotification),
      switchMap(({ notification }) =>
        this.notificationService.setNewNotification(notification).pipe(
          map((notification) => setNewNotificationSuccess({ notification })),
          catchError((error) => of(setNewNotificationFailure({ error })))
        )
      )
    )
  );
  deleteNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteNotification),
      switchMap(({ notification }) =>
        this.notificationService.deleteNotification(notification).pipe(
          map(() => deleteNotificationSuccess()),
          catchError((error) => of(deleteNotificationFailure({ error })))
        )
      )
    )
  );
}
