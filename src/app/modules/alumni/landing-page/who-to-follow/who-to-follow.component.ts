import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { HttpClient } from '@angular/common/http';
import { ConnectionService } from 'src/app/services/connections/connection.service';
import { NotificationsService } from 'src/app/services/notification/notifications.service';
import { filesUrl } from 'config';

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['./who-to-follow.component.css']
})
export class WhoToFollowComponent implements OnInit {
  profiles: any[] = [];
  imageUrl = `${filesUrl}/uploads/pics/profiles`
  currentAccountId: string | null = null;

  constructor(private profileService: ProfileService, private http: HttpClient, private followService: ConnectionService, private notificationService: NotificationsService) {}

  ngOnInit() {
    // Assuming you store account_id in localStorage when the user logs in
    const storedAccountId = localStorage.getItem('account_id');

    if (storedAccountId) {
      this.currentAccountId = storedAccountId;
      console.log(this.currentAccountId);
    }

    this.profileService.getProfiles().subscribe(
      (data: any) => {
        // Filter out the profile with the current account_id
        this.profiles = data.profiles.filter((profile: any) => {
          return profile.account_id.toString() !== this.currentAccountId;
        });
      },
      error => {
        console.error('Error fetching profiles:', error);
      }
    );

  }

  getAlumniPicturePath(picFile: string): string {
    const defaultPicture = 'default-avatar.jpg';

    //return `${this.imageUrl}/${picFile}`;

    if (picFile && picFile.trim() !== '') {
      return `${this.imageUrl}/${picFile}`;
    } else {
      return `${this.imageUrl}/${defaultPicture}`;
    }
  }

  increaseFollowingCount(id : any): void {
    this.followService.increaseFollowingCount();

    this.connect(this.currentAccountId,id);
  } 

  connect(follower_id: any, following_id: any){
    //connect
    this.followService.connect(follower_id, following_id);


    //send notification
    const notification = {
      sender_id :0,
      receiver_id: following_id,
      message: localStorage.getItem('name') + ' ' + localStorage.getItem('surname') + ' has Followed You',
      date: new Date().toISOString()
    } 
    this.notificationService.sendNotification(notification).subscribe((response:any) => {
      //response
    });


  }

  
}
