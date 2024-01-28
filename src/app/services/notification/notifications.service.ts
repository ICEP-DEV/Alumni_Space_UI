import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'config';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiUrl = `${baseUrl}/notifications`;

  private notificationId: number = 0;
  private newNotificationReceived: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  updateNotificationId() {
    this.notificationId += 1;
    this.newNotificationReceived.next(true); // Trigger the notification flag
  }

  decreaseNotificationId(count: number) {
    if (this.notificationId >= count) {
      this.notificationId -= count;
    } else {
      this.notificationId = 0; // Ensure the notification ID doesn't go below 0
    }
  }
   

  getNotificationId(): number {
    return this.notificationId;
  }
  
  getNewNotificationReceived(): Subject<boolean> {
    return this.newNotificationReceived;
  }

  private unreadNotificationCountSource = new BehaviorSubject<number>(0);
  unreadNotificationCount$ = this.unreadNotificationCountSource.asObservable();

  updateUnreadNotificationCount(count: number): void {
    this.unreadNotificationCountSource.next(count);
  }

  sendNotification(notification: any){
    console.log('Services '+ notification)
    return this.http.post(`${this.apiUrl}/send`, notification);
  }

  getMyNotifications(): Observable<any> {
    const account_id = localStorage.getItem('account_id');
    return this.http.get<any>(`${this.apiUrl}/get_my_notifications/${account_id}`);
  }
}
