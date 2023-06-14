import { createAction, props } from '@ngrx/store';
import { IItem } from 'src/interfaces/IItem';

export const setNewItem = createAction(
  '[newItem] set new Item',
  props<{ item: FormData }>()
);

export const setNewItemSuccess = createAction(
  '[item] set new Item Success',
  props<{ item: IItem }>()
);
export const setNewItemFailure = createAction(
  '[item] set new Item Failure',
  props<{ error: any }>()
);
// export const loadImages = createAction(
//   '[formData] load new Image',
//   props<{ formData: FormData }>()
// );

// export const loadImagesSuccess = createAction('[Image] load new Image Success');
// export const loadImagesFailure = createAction(
//   '[Image] load new Image Failure',
//   props<{ error: any }>()
// );
