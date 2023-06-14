import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateUser } from 'src/app/store/authentication/authenticationActions';
import { IRegister } from 'src/interfaces/IRegister';
import { IState } from 'src/interfaces/IState';
import { IUser } from 'src/interfaces/IUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent {
  user!:IUser;
  form!: FormGroup;
  itemData: FormData = new FormData();

  constructor(private formBuilder: FormBuilder,private _store: Store<IState>,private router: Router){}
  
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('token') || '[]');

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(){
    var form = this.form.value;
    var user: IUser = {
      id:this.user.id,
      username:this.user.username,
      token:this.user.token,
      fullName: form.fullName,
      phoneNumber: form.phoneNumber,
      email: form.email,
      favoriteItems:[],
    };
    this._store.dispatch(updateUser({ newUser: user })); 
    Swal.fire({
      icon: 'success',
      title: "Successfully Saved",
    }); 
    }
  }

