import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserFavoriteItems } from 'src/app/store/favoritesPage/favoritesActions';
import { IItem } from 'src/interfaces/IItem';
import { IState } from 'src/interfaces/IState';
import { IUser } from 'src/interfaces/IUser';

@Component({
  selector: 'app-favorites-item-page',
  templateUrl: './favorites-item-page.component.html',
  styleUrls: ['./favorites-item-page.component.scss']
})
export class FavoritesItemPageComponent{
  userExist$: Observable<IUser>;
  userId!: number
  user!:IUser
  favorites!:IItem[];

  constructor(private store: Store<IState>) {

    this.userExist$ = this.store.select((state) => state.favoritesReducer.user);
  }
  ngOnInit(){
    this.userId = JSON.parse(sessionStorage.getItem('token') || '[]')?.id;

    this.userExist$.subscribe((activeUser) => (this.user = activeUser));
    this.favorites = this.user.favoriteItems!;
  }
}
