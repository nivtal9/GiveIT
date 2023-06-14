import { Component } from '@angular/core';
import { IUser } from 'src/interfaces/IUser';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  user!: IUser;
  isEditProfile = false;
  isEditItems = false;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('token') || '[]');
  }

  editProfile() {
    this.isEditProfile = !this.isEditProfile;
    this.isEditItems = true;
  }

  editItems() {
    this.isEditProfile = false;
  }
}
