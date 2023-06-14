import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class createItemService {
  constructor(private http: HttpClient) { }
  imageUrl: any;
  setNewItem(file: FormData) {
    return this.http.post<any>('https://localhost:5001/api/items', file);
  }
}
