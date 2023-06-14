import { isDevMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FilterBarComponent } from '../components/filter-bar/filter-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInModalComponent } from '../components/sign-in-modal/sign-in-modal.component';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { homePageReducer } from '../store/homePage/homepageReducer';
import { homePageEffects } from '../store/homePage/homepageEffects';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IState } from 'src/interfaces/IState';
import { authenticationReducer } from '../store/authentication/authenticationReducer';
import { authenticationEffects } from '../store/authentication/authenticationEffects';
import { ItemsCardComponent } from '../components/items-card/items-card.component';
import { CreateAdPageComponent } from '../components/create-ad-page/create-ad-page.component';
import { AppComponent } from '../components/app/app.component';
import { SingleItemModalComponent } from '../components/single-item-modal/single-item-modal.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { createItemEffects } from '../store/createItemPage/createItemEffects';
import { createItemReducer } from '../store/createItemPage/createItemReducer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { favoritesEffects } from '../store/favoritesPage/favoritesEffects';
import { MatBadgeModule } from '@angular/material/badge';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { favoritesReducer } from '../store/favoritesPage/favoritesReducer';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { HeroComponent } from '../components/hero/hero.component';
import { EditUserProfileComponent } from '../components/edit-user-profile/edit-user-profile.component';
import { EditItemsComponent } from '../components/edit-items/edit-items.component';
import { NotificationPageComponent } from '../components/notification-page/notification-page.component';
import { notificationReducer } from '../store/notificationPage/notificationReducer';
import { notificationEffects } from '../store/notificationPage/notificationEffects';
import { profilePageReducer } from '../store/profilePage/profilePageReducer';
import { profilePageEffects } from '../store/profilePage/profilePageEffects';
import { FavoritesItemPageComponent } from '../components/favorites-item-page/favorites-item-page.component';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterBarComponent,
    MainPageComponent,
    SignInModalComponent,
    RegistrationPageComponent,
    HomePageComponent,
    NavbarComponent,
    ItemsCardComponent,
    CreateAdPageComponent,
    SingleItemModalComponent,
    FavoritesComponent,
    AboutUsComponent,
    UserInfoComponent,
    ProfilePageComponent,
    HeroComponent,
    EditUserProfileComponent,
    EditItemsComponent,
    NotificationPageComponent,
    FavoritesItemPageComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forRoot<IState>({
      homePageReducer,
      authenticationReducer,
      createItemReducer,
      favoritesReducer,
      notificationReducer,
      profilePageReducer,
    }),
    EffectsModule.forRoot([
      homePageEffects,
      authenticationEffects,
      createItemEffects,
      favoritesEffects,
      notificationEffects,
      profilePageEffects,
    ]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxDropzoneModule,
    NgxDropzoneModule,
    AngularToastifyModule,
    MatBadgeModule,
    MatDialogModule,
    AngularToastifyModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
  