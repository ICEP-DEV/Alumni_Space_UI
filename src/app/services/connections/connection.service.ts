import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'config';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private followingCountSubject = new BehaviorSubject<number>(0);
  followingCount$ = this.followingCountSubject.asObservable();

  private apiUrl = `${baseUrl}/connections`
  constructor(private http: HttpClient) { }

  increaseFollowingCount() {
    const currentCount = this.followingCountSubject.value;
    this.followingCountSubject.next(currentCount + 1);
  }

  connect(follower_id: any, following_id: any) {
    const connectionData = { follower_id, following_id, status: 'active' };

    this.http.post(this.apiUrl, connectionData)
      .subscribe(
        (response: any) => {
          console.log('Connection successful:', response);
          // Assuming you want to increase the count after a successful connection
          this.increaseFollowingCount();
        },
        (error: any) => {
          console.error('Connection failed:', error);
          // Handle error, if needed
        }
      );
  }
  
  getFollowingCount(account_id: any) {
    return this.http.get(`${this.apiUrl}/following/${account_id}/count`);
  }

  getFollowersCount(account_id: any){
    return this.http.get(`${this.apiUrl}/followers/${account_id}/count`);
  }
}
