import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  isLoggedIn,
  loginUser,
  setNewUserFailure,
} from 'src/app/store/authentication/authenticationActions';
import { ILogin } from 'src/interfaces/ILogin';
import { IState } from 'src/interfaces/IState';
import { IUser } from 'src/interfaces/IUser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { getUserFavoriteItems } from 'src/app/store/favoritesPage/favoritesActions';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent implements OnInit {
  form!: FormGroup;
  @Output() closeClicked = new EventEmitter();
  userExist$: Observable<IUser>;
  userIsLogged!: IUser;
  error$: Observable<Error>;
  userId!: number

  constructor(
    private formBuilder: FormBuilder,
    private _store: Store<IState>,
    private router: Router
  ) {
    this.userExist$ = this._store.select(
      (state) => state.authenticationReducer.user
    );
    this.error$ = this._store.select(
      (state) => state.authenticationReducer.error
    );
  }

  closeSignInModal() {
    this.closeClicked.emit(false);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
        ],
      ],
    });
    this.error$.subscribe((error: any) => {
      if (error) {
        if (error.error != '') {
          Swal.fire({
            icon: 'error',
            title: error.error + " Try again...",
          });
        }
        this._store.dispatch(setNewUserFailure({ error: null }))
      }
    });
  }

  onSubmit() {
    var form = this.form.value;
    var user: ILogin = {
      username: form.username,
      password: form.password,
    };
    this._store.dispatch(loginUser({ loginUser: user }));
    this.closeSignInModal();
    this.checkUser();
  }

  checkUser() {
    this.userExist$.subscribe((activeUser) => {
      (this.userIsLogged = activeUser),
        this._store.dispatch(isLoggedIn()),
        sessionStorage.setItem('token', JSON.stringify(this.userIsLogged))
      if (activeUser.fullName != null) {
        Swal.fire({
          icon: 'success',
          title: "Successfully Login",
        });
      }
      this.userId = JSON.parse(sessionStorage.getItem('token') || '[]')?.id;
      this._store.dispatch(getUserFavoriteItems({ userId: this.userId }));
      this.router.navigate(['/home-page-components']);
    });
  }
}
