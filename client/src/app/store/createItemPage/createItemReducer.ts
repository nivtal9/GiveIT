import { createReducer, on } from '@ngrx/store';
import { IItem } from 'src/interfaces/IItem';
import {
  setNewItem,
  setNewItemFailure,
  setNewItemSuccess,
} from './createItemActions';

export interface ICreateItemState {
  item: IItem;
  imageUrl: string;
  error: any;
}

export const initialState: ICreateItemState = {
  item: {} as IItem,
  imageUrl: '',
  error: null
};

export const createItemReducer = createReducer(
  initialState,

  on(setNewItem, (state) => ({
    ...state,
  })),
  on(setNewItemSuccess, (state) => ({
    ...state,
  })),
  on(setNewItemFailure, (state, { error }) => ({
    ...state,
    error,
  }))
  // on(loadImages, (state) => ({
  //   ...state,
  // })),
  // on(loadImagesSuccess, (state, { imageUrl }) => ({
  //   ...state,
  //   imageUrl,
  //   isLoading: true,
  // })),
  // on(loadImagesFailure, (state, { error }) => ({
  //   ...state,
  //   error,
  // }))
);
