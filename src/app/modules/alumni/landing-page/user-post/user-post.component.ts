import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from 'service';
import { postsUrl } from 'config';


interface PostInfo{
        user_name: string;
        user_postion: string;
        institution: string;
        user_image: string;
        post_time:string;
        text_message:string;
        image_message: string;
}

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent {

  posts: any[] = [];
  events: any[] = [];
  currentDate: Date = new Date();
  newComment: any;
  likes: any=0;


  constructor(private service: EventService, private http:HttpClient) {
    this.events = this.service.getEvents();
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


 
  ngOnInit() {
    this.getLikes();
    this.getPosts();
  }

  getPosts() {
    this.http.get<any>(`${postsUrl}/posts`).subscribe(response => {
      this.posts = response.reverse();
    });
  }



  getLikes() {
    this.http.get<any>(`${postsUrl}/posts/likes`).subscribe(data => {
      this.likes = data.likes;
    });
  }

  incrementLikes() {
    this.http.patch(`${postsUrl}/posts/likes`, { likes: this.likes + 1 }).subscribe(() => {
      this.getLikes();
    });
  }

  addComment(post: any, newComment: any) {
    // Assign a unique ID to the new comment
    newComment.id = post.comments.length + 1;
    newComment.date = new Date().toISOString();
    
    // Add the new comment to the post's comments array
    post.comments.push(newComment);

    // Update the comments on the server
    this.http.patch(`${postsUrl}/posts/${post.id}`, { comments: post.comments }).subscribe(() => {
      this.getPosts();
    });
  }

}
