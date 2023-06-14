import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { CreateAdPageComponent } from '../components/create-ad-page/create-ad-page.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { EditUserProfileComponent } from '../components/edit-user-profile/edit-user-profile.component';
import { EditItemsComponent } from '../components/edit-items/edit-items.component';
import { NotificationPageComponent } from '../components/notification-page/notification-page.component';
import { FavoritesItemPageComponent } from '../components/favorites-item-page/favorites-item-page.component';
import { FilterBarComponent } from '../components/filter-bar/filter-bar.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'main-page-components', component: MainPageComponent },
  { path: 'home-page-components', component: HomePageComponent },
  { path: 'registration-page-components', component: RegistrationPageComponent, },
  { path: 'create-ad-page-components', component: CreateAdPageComponent },
  { path: 'profile-page-components', component: ProfilePageComponent },
  { path: 'edit-user-profile-components', component: EditUserProfileComponent },
  { path: 'edit-items-components', component: EditItemsComponent },
  { path: 'notification-page-components', component: NotificationPageComponent },
  { path: 'favorite-item-page-components', component: FavoritesItemPageComponent },
  { path: 'filter-bar-components', component: FilterBarComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
