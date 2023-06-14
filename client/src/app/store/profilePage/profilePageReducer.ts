import { createReducer, on } from '@ngrx/store';
import { IItem } from 'src/interfaces/IItem';
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

export interface IProfilePageState {
  items: IItem[];
  error: any;
}

export const initialState: IProfilePageState = {
  items: [],
  error: null,
};

export const profilePageReducer = createReducer(
  initialState,

  on(getUserItems, (state) => ({
    ...state,
  })),
  on(getUserItemsSuccess, (state, { items }) => ({
    ...state,
    items,
  })),
  on(getUserItemsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(updateUserItem, (state) => ({
    ...state,
  })),
  on(updateUserItemSuccess, (state) => ({
    ...state,
  })),
  on(updateUserItemFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(deleteUserItem, (state) => ({
    ...state,
  })),
  on(deleteUserItemSuccess, (state) => ({
    ...state,
  })),
  on(deleteUserItemFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
