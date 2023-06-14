import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItem } from 'src/interfaces/IItem';

@Injectable({
  providedIn: 'root'
})
export class ProfilepageService {
  readonly ROOT_URL = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getUserItems(userId: number) {
    return this.http.get<IItem[]>(this.ROOT_URL + `/items/byUser/${userId}`)
  }

  updateUserItem(itemId: number, formData: FormData) {
    return this.http.put<IItem>(this.ROOT_URL + `/items/${itemId}`, formData)
  }
  deleteUserItem(itemId: number){
    return this.http.delete<any>(this.ROOT_URL + `/items/${itemId}`)
  }
}
