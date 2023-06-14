import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/interfaces/IUser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  isLoggedIn!:boolean;
  isModalOpen = false;
  @Output() onSignInClick = new EventEmitter<boolean>();
  userToken: IUser[] | [] = [];

  constructor(private router: Router){
  }

  onLoginClick(){
    this.onSignInClick.emit(true);
  }

  closeSignInModal(){
    this.isModalOpen = false;
  }

  checkUser(){
    this.userToken = JSON.parse(sessionStorage.getItem('token') || '[]');

    if(sessionStorage.getItem('token')!=null && this.userToken.length != 0){
      this.isLoggedIn = true;
      this.router.navigate(['/create-ad-page-components'])
    }
    else{
      this.isLoggedIn = false;
      this.isModalOpen = !this.isModalOpen;
    }
  }
}
