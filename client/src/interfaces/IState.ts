import { IAuthenticationState } from 'src/app/store/authentication/authenticationReducer';
import { ICreateItemState } from 'src/app/store/createItemPage/createItemReducer';
import { IFavoriteState } from 'src/app/store/favoritesPage/favoritesReducer';
import { IHomePageState } from 'src/app/store/homePage/homepageReducer';
import { INotificationState } from 'src/app/store/notificationPage/notificationReducer';
import { IProfilePageState } from 'src/app/store/profilePage/profilePageReducer';

export interface IState {
  homePageReducer: IHomePageState;
  authenticationReducer: IAuthenticationState;
  createItemReducer: ICreateItemState;
  favoritesReducer: IFavoriteState;
  notificationReducer: INotificationState;
  profilePageReducer: IProfilePageState
}
