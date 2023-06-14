import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/interfaces/IUser';

import {
  isLoggedIn,
  isLoggedInFailure,
  isLoggedInSuccess,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  setNewUser,
  setNewUserFailure,
  setNewUserSuccess,
  updateUserFailure,
  updateUserSuccess,
} from './authenticationActions';

export interface IAuthenticationState {
  user: IUser;
  error:any;
  isUserIn:boolean;
}

export const initialState: IAuthenticationState = {
  user: {} as IUser,
  error:null,
  isUserIn:false
};

export const authenticationReducer = createReducer(
  initialState,

  on(setNewUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(setNewUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(loginUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(isLoggedIn, (state) => ({
    ...state,
  })),
  on(isLoggedInSuccess, (state, { isUserIn }) => ({
    ...state,
    isUserIn,
  })),
  on(isLoggedInFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  
);
