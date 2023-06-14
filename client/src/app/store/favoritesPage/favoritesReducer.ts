import { createReducer, on } from '@ngrx/store';
import { IFavorite } from 'src/interfaces/IFavorite';
import { IItem } from 'src/interfaces/IItem';
import { IUser } from 'src/interfaces/IUser';
import { getUserFavoriteItems, getUserFavoriteItemsFailure, getUserFavoriteItemsSuccess, setFavorites, setFavoritesFailure, setFavoritesSuccess } from './favoritesActions';

export interface IFavoriteState {
  favorites: IFavorite;
  user: IUser;
  error: any
}

export const initialState: IFavoriteState = {
  favorites: {} as IFavorite,
  error: null,
  user: {} as IUser,
};

export const favoritesReducer = createReducer(
  initialState,

  on(setFavorites, (state) => ({
    ...state,
  })),
  on(setFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites,
  })),
  on(setFavoritesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(getUserFavoriteItems, (state) => ({
    ...state,
  })),
  on(getUserFavoriteItemsSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(getUserFavoriteItemsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
