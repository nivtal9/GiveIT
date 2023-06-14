import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INotification } from 'src/interfaces/INotification';

@Injectable({
  providedIn: 'root',
})
export class notificationService {
  constructor(private http: HttpClient) {}
  setNewNotification(notification: INotification) {
    return this.http.post<any>(
      'https://localhost:5001/api/notifications',
      notification
    );
  }
  deleteNotification(notification: INotification) {
    return this.http.post<any>(
      'https://localhost:5001/api/notifications/delete',
      notification
    );
  }
}
