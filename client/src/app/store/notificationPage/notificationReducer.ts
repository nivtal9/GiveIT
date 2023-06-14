import { createReducer, on } from '@ngrx/store';
import { INotification } from 'src/interfaces/INotification';
import {
  deleteNotification,
  deleteNotificationFailure,
  deleteNotificationSuccess,
  setNewNotification,
  setNewNotificationFailure,
  setNewNotificationSuccess,
} from './notificationActions';

export interface INotificationState {
  notification: INotification;
}

export const initialState: INotificationState = {
  notification: {} as INotification,
};

export const notificationReducer = createReducer(
  initialState,

  on(setNewNotification, (state) => ({
    ...state,
  })),
  on(setNewNotificationSuccess, (state, { notification }) => ({
    ...state,
    notification: notification,
  })),
  on(setNewNotificationFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(deleteNotification, (state) => ({
    ...state,
  })),
  on(deleteNotificationSuccess, (state) => ({
    ...state,
  })),
  on(deleteNotificationFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
