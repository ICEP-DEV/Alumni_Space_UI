import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { MatDialog } from '@angular/material/dialog';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ProfileService } from '../../profile/profile.service';
import { postsUrl } from 'config';
import {filesUrl} from 'config';

@Component({
  selector: 'app-your-thoughts',
  templateUrl: './your-thoughts.component.html',
  styleUrls: ['./your-thoughts.component.css']
})
export class YourThoughtsComponent {
  
  //url='http://192.168.27.20:3000/uploads/pics/profiles/aboutPic.jpg';
  //myPic: any = localStorage;
  posts=[];
  newPost:any ={name:'', imageUrl:`${filesUrl}/uploads/pics/profiles/${localStorage.getItem('pic')}`,postData:'',dateTime:''};
  postData: string = '';
  currentDate:  Date = new Date();
  constructor(private http:HttpClient, public dialog: MatDialog, private ProfileService: ProfileService){}

  
getPosts() {
  this.http.get<any>(`${postsUrl}/posts`).subscribe(response => {
    this.posts = response;
  });
}
onSubmit() {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  this.newPost.name = ''+ localStorage.getItem('name')+' '+localStorage.getItem('surname');
  this.newPost.dateTime = new Date();
  this.newPost.imageUrl = `${filesUrl}/uploads/pics/profiles/${localStorage.getItem('pic')}`;
  this.http.post<any>(`${postsUrl}/posts`, this.newPost, { headers }).subscribe(response => {
    this.getPosts(); // Refresh the posts after a new post is created
    this.newPost = { name:'', imageUrl:'',postData:'',timeDate: ''}; // Reset the new post object
  });
  window.location.reload();
}


 // Custom function to calculate time difference and return the "posted ... ago" message
 getTimeDifference(datePosted: Date): string {
  const timeDiff = this.currentDate.getTime() - new Date(datePosted).getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return ` ${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return ` ${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return ` ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return ` a few seconds ago`;
  }
}

openPopup(): void {
  const dialogRef = this.dialog.open(ImageDisplayComponent, {
    width: '250px', // Set the width of the pop-up
  });

  // You can subscribe to the afterClosed event to get data when the pop-up is closed
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}


}
