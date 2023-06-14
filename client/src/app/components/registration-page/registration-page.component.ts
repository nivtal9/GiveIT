import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  isLoggedIn,
  setNewUser,
} from 'src/app/store/authentication/authenticationActions';
import { IRegister } from 'src/interfaces/IRegister';
import { IState } from 'src/interfaces/IState';
import { IUser } from 'src/interfaces/IUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  form!: FormGroup;
  userExist$: Observable<IUser>;
  userIsLogged!: IUser;
  constructor(
    private formBuilder: FormBuilder,
    private _store: Store<IState>,
    private router: Router
  ) {
    this.userExist$ = this._store.select(
      (state) => state.authenticationReducer.user
    );
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
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }
  onSubmit() {
    var form = this.form.value;
    var user: IRegister = {
      username: form.username,
      password: form.password,
      fullName: form.fullName,
      phoneNumber: form.phoneNumber,
      email: form.email,
    };
    this._store.dispatch(setNewUser({ newUser: user }));
    this.checkUser();

    this.router.navigate(['/main-page-components']);
  }

  checkUser() {
    this.userExist$.subscribe((activeUser) => {
      (this.userIsLogged = activeUser),
        this._store.dispatch(isLoggedIn()),
        sessionStorage.setItem('token', JSON.stringify(this.userIsLogged))
        if(activeUser.fullName != null) {
          Swal.fire({
          icon: 'success',
          title: "Successfully Registered",
          }); 
        }
        this.router.navigate(['/home-page-components']);
    });
  }
}
