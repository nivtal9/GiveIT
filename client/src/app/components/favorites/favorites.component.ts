import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFavorite } from 'src/interfaces/IFavorite';
import { IItem } from 'src/interfaces/IItem';
import { IState } from 'src/interfaces/IState';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: IItem[] | [] = [];
  isFavoriteEmpty= true;
  // userFavorites$: Observable<IFavorite>;

  constructor(private store: Store<IState>) {
    // this.userFavorites$ = this.store.select((state) => state.favoritesReducer.favorites);
  }
  
  ngOnInit(){
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (this.favorites.length) {
      this.isFavoriteEmpty= false;
    }
  }
}
