import { createAction, props } from '@ngrx/store';
import { IStatus } from 'src/interfaces/IStatus';
import { IFilterObject } from 'src/interfaces/IFilterObject';
import { ILocation } from 'src/interfaces/ILocation';
import { ICategory } from 'src/interfaces/ICategory';
import { ISubCategory } from 'src/interfaces/ISubCategory';
import { IItem } from 'src/interfaces/IItem';

export const setItemsByFilter = createAction(
  '[items] setItemsByFilter',
  props<{ filterObject: IFilterObject | null }>()
);
export const setItemsByFilterSuccess = createAction(
  '[items] setItemsByFilterSuccess',
  props<{ items: IItem[] }>()
);
export const setItemsByFilterFailure = createAction(
  '[items] setItemsByFilterFailure',
  props<{ error: any }>()
);

export const setLocations = createAction('setLocations');
export const setLocationsSuccess = createAction(
  '[locations] setLocations Success',
  props<{ locations: ILocation[] }>()
);
export const setLocationsFailure = createAction(
  '[locations] setLocations Failure',
  props<{ error: any }>()
);

export const setStatuses = createAction('set Statuses');
export const setStatusesSuccess = createAction(
  '[statuses] set Statuses Success',
  props<{ statuses: IStatus[] }>()
);
export const setStatusesFailure = createAction(
  '[statuses] set Statuses Failure',
  props<{ error: any }>()
);

export const setCategories = createAction('setCategories');
export const setCategoriesSuccess = createAction(
  '[categories] setCategories Success',
  props<{ categories: ICategory[] }>()
);
export const setCategoriesFailure = createAction(
  '[categories] setCategories Failure',
  props<{ error: any }>()
);
export const setSubCategories = createAction('setSubCategories');
export const setSubCategoriesSuccess = createAction(
  '[subCategories] setSubCategories Success',
  props<{ subCategories: ISubCategory[] }>()
);
export const setSubCategoriesFailure = createAction(
  '[subCategories] setSubCategories Failure',
  props<{ error: any }>()
);
