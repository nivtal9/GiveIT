import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFavorite } from 'src/interfaces/IFavorite';
import { IItem } from 'src/interfaces/IItem';
import { IUser } from 'src/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private http: HttpClient) {}
  readonly ROOT_URL = 'https://localhost:5001/api';

  addFavorite(favorite: IFavorite) {
    return this.http.post<IFavorite>( 
      `https://localhost:5001/api/items/${favorite.itemId}/users/${favorite.userId}`,favorite
    );
  }

  getUserFavoriteItems(userId: number) {
    return this.http.get<IUser>(this.ROOT_URL + `/Account/${userId}`)
  }
}