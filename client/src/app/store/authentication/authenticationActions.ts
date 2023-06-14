import { createAction, props } from '@ngrx/store';
import { ILogin } from 'src/interfaces/ILogin';
import { IRegister } from 'src/interfaces/IRegister';
import { IUser } from 'src/interfaces/IUser';

export const setNewUser = createAction(
  '[newUser] set new user]',
  props<{ newUser: IRegister }>()
);

export const setNewUserSuccess = createAction(
  '[newUser] set new user Success]',
  props<{ user: IUser }>()
);
export const setNewUserFailure = createAction(
  '[newUser] set new user Failure',
  props<{ error: any }>()
);

export const loginUser = createAction(
  '[user] login User]',
  props<{ loginUser: ILogin }>()
);
export const loginUserSuccess = createAction(
  '[user] login User Success]',
  props<{ user: IUser }>()
);
export const loginUserFailure = createAction(
  '[user] login User Failure',
  props<{ error: any }>()
);

export const isLoggedIn = createAction('isLoggedIn');
export const isLoggedInSuccess = createAction(
  '[isUserIn] is Logged In Success',
  props<{ isUserIn: boolean }>()
);
export const isLoggedInFailure = createAction(
  '[isUserIn] is Logged In Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[newUser] update User]',
  props<{ newUser: IUser }>()
);
export const updateUserSuccess = createAction(
  '[newUser] update User Success]',
  props<{ user: IUser }>()
);
export const updateUserFailure = createAction(
  '[newUser] update User Failure',
  props<{ error: any }>()
);