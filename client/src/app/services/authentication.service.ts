import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRegister } from 'src/interfaces/IRegister';
import { IUser } from 'src/interfaces/IUser';
import { ILogin } from 'src/interfaces/ILogin';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { isLoggedIn } from '../store/authentication/authenticationActions';
import { IState } from 'src/interfaces/IState';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class authenticationService {
  userToken: IUser[] | [] = [];

  constructor(private http: HttpClient,private store: Store<IState>) {}
  setNewUser(newUser: IRegister) {
    return this.http.post<IUser>(
      'https://localhost:5001/api/Account/register',
      newUser
    );
  }
  loginUser(user: ILogin) {

      return this.http
      .post<IUser>('https://localhost:5001/api/Account/login', user)


  }


  updateUser(newUser: IUser){
    return this.http.put<IUser>(
      `https://localhost:5001/api/Account/update-user/${newUser.id}/`,
      newUser
    );
  }

    logout() {
      localStorage.removeItem('TokenInfo');
      }

    checkUser(){
      this.userToken = JSON.parse(sessionStorage.getItem('token') || '[]');
      if(sessionStorage.getItem('token') != null && this.userToken.length != 0)
      {
        return of(true);
      }
      return of(false);
    }
}
