import { createAction, props } from '@ngrx/store';
import { IFavorite } from 'src/interfaces/IFavorite';
import { IItem } from 'src/interfaces/IItem';
import { IUser } from 'src/interfaces/IUser';

export const setFavorites = createAction(
  '[favorites] set Favorites',
  props<{ favorites: IFavorite }>()
);

export const setFavoritesSuccess = createAction(
  '[favorites] set Favorites Success',
  props<{ favorites: IFavorite }>()
);

export const setFavoritesFailure = createAction(
  '[favorites] set Favorites Failure',
  props<{ error: any }>()
);

export const getUserFavoriteItems = createAction(
  '[favorites] get User Favorite Items',
  props<{ userId: number }>()
);

export const getUserFavoriteItemsSuccess = createAction(
  '[favorites] get User Favorite Items Success',
  props<{ user: IUser }>()
);
export const getUserFavoriteItemsFailure = createAction(
  '[favorites] get User Favorite Items Failure',
  props<{ error: any }>()
);
