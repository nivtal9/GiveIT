import { createReducer, on } from '@ngrx/store';
import { IImage } from 'src/interfaces/IImage';
import { IItem } from 'src/interfaces/IItem';
import { IStatus } from 'src/interfaces/IStatus';
import { ILocation } from 'src/interfaces/ILocation';
import {
  setCategories,
  setCategoriesFailure,
  setCategoriesSuccess,
  setItemsByFilter,
  setItemsByFilterFailure,
  setItemsByFilterSuccess,
  setLocations,
  setLocationsFailure,
  setLocationsSuccess,
  setStatuses,
  setStatusesFailure,
  setStatusesSuccess,
  setSubCategories,
  setSubCategoriesFailure,
  setSubCategoriesSuccess,
} from './homepageActions';
import { IFilterObject } from 'src/interfaces/IFilterObject';
import { ICategory } from 'src/interfaces/ICategory';
import { ISubCategory } from 'src/interfaces/ISubCategory';

export interface IHomePageState {
  items: IItem[];
  filterObject: IFilterObject;
  locations: ILocation[];
  statuses: IStatus[];
  imagesByItem: IImage[];
  categories: ICategory[];
  subCategories: ISubCategory[];
  error: any
}

export const initialState: IHomePageState = {
  items: [],
  locations: [],
  statuses: [],
  imagesByItem: [],
  filterObject: {
    SubCategory: null,
    SearchInput: '',
    ItemStatus: [],
    Location: [],
  },
  categories: [],
  subCategories: [],
  error: null
};

export const homePageReducer = createReducer(
  initialState,

  on(setItemsByFilter, (state, { filterObject }) => ({
    ...state,
    filterObject:
      filterObject === null ? initialState.filterObject : filterObject,
  })),
  on(setItemsByFilterSuccess, (state, { items }) => ({
    ...state,
    items,
  })),
  on(setItemsByFilterFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(setLocations, (state) => ({
    ...state,
  })),
  on(setLocationsSuccess, (state, { locations }) => ({
    ...state,
    locations,
  })),
  on(setLocationsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(setStatuses, (state) => ({
    ...state,
  })),
  on(setStatusesSuccess, (state, { statuses }) => ({
    ...state,
    statuses,
  })),
  on(setStatusesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(setCategories, (state) => ({
    ...state,
  })),
  on(setCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
  })),
  on(setCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(setSubCategories, (state) => ({
    ...state,
  })),
  on(setSubCategoriesSuccess, (state, { subCategories }) => ({
    ...state,
    subCategories,
  })),
  on(setSubCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
