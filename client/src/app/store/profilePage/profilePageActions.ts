import { createAction, props } from '@ngrx/store';
import { IItem } from 'src/interfaces/IItem';

export const getUserItems = createAction(
  '[profilePage] get user Items',
  props<{ userId: number }>()
);

export const getUserItemsSuccess = createAction(
  '[profilePage] get user Items Success',
  props<{ items: IItem[] }>()
);
export const getUserItemsFailure = createAction(
  '[profilePage] get user Items Failure',
  props<{ error: any }>()
);

export const updateUserItem = createAction(
  '[profilePage] update user Items',
  props<{ itemId: number, formData: FormData }>()
);

export const updateUserItemSuccess = createAction('[profilePage] update user Items Success');
export const updateUserItemFailure = createAction(
  '[profilePage] update user Items Failure',
  props<{ error: any }>()
);
export const deleteUserItem = createAction(
  '[profilePage] delete user Item',
  props<{ itemId: number}>()
);

export const deleteUserItemSuccess = createAction('[profilePage] delete user Item Success');
export const deleteUserItemFailure = createAction(
  '[profilePage] delete user Item Failure',
  props<{ error: any }>()
);
