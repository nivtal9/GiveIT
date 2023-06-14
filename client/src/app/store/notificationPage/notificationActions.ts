import { createAction, props } from '@ngrx/store';
import { INotification } from 'src/interfaces/INotification';

export const setNewNotification = createAction(
  '[New Notification] set New Notification',
  props<{ notification: INotification }>()
);

export const setNewNotificationSuccess = createAction(
  '[Notification] set New Notification Success',
  props<{ notification: INotification }>()
);
export const setNewNotificationFailure = createAction(
  '[Notification] set New Notification Failure',
  props<{ error: any }>()
);

export const deleteNotification = createAction(
  '[Notification] delete Notification',
  props<{ notification: INotification }>()
);

export const deleteNotificationSuccess = createAction(
  '[Notification] delete Notification Success'
);
export const deleteNotificationFailure = createAction(
  '[Notification] set New Notification Failure',
  props<{ error: any }>()
);