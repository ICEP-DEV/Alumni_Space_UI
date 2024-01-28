import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProfileService } from '../../profile/profile.service';
import { ConnectionService } from 'src/app/services/connections/connection.service';

import { filesUrl } from 'config';
import { baseUrl } from 'config';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.css']
})
export class UserProfileInfoComponent {
  name: string = '';
  surname: string = '';

  //declare alumni
  alumni = {
    Name: "name placeholder",
    Location: "location placeholder",
    Qualification: "Qualification placeholder",
    Skills: "Skills placeholder",
    Experience: " Experience placeholder",
    Employment_Status: "Employment_Status placeholder",
    Academic_Transcript: "Academic_Transcript placeholder",
    Interest: "Interest placeholder",
    Bio: "bio placeholder",
    
  }

  images: File[] = [];
  followingCount: number = 0;
  followerCount: number = 0;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private ProfileService: ProfileService,private router: Router, private followService: ConnectionService){
    this.images = this.ProfileService.getImages();
    this.viewPictures();
  }
  
  ngOnInit() {
    this.followService.followingCount$.subscribe((count: number) => {
      this.followingCount = count;
    });
    const storedName = localStorage.getItem('name');
    const storedName2 = localStorage.getItem('surname');
    
    if (storedName && storedName2) {
      // Update the 'name' property if 'name' is found in localStorage
      this.name = storedName;
      this.surname = storedName2;
    }


    //get profile
    const user_id = localStorage.getItem('account_id');
    this.http.put(`${baseUrl}/profile/get_profile`, { user_id }).subscribe((response: any) => {
      console.log('Data sent to server:', response);

      //this.alumni.Skills = response.userprofile.skills;
      console.log(response.result[0].skills);

      
      //check if values are null
      if (response.result[0].skills !== 'null') {
        this.alumni.Skills = response.result[0].skills;
        this.alumni.Experience = response.result[0].experience;
        this.alumni.Interest = response.result[0].interest;
        this.alumni.Bio =  response.result[0].bio;

        this.alumni.Location = response.result[0].location;
        this.alumni.Qualification = response.result[0].qualification;
        this.alumni.Employment_Status = response.result[0].employment_status;

      }
    });

    //get following
    this.followService.getFollowingCount(user_id).subscribe(
      (response: any) => {
        console.log('Following Count:', response.followingCount);
        this.followingCount = response.followingCount;
      },
      (error: any) => {
        console.error('Error fetching following count:', error);
      }
    );

    //get
    this.followService.getFollowersCount(user_id).subscribe(
      (response: any) => {
        console.log('Following Count:', response.followerCount);
        this.followerCount = response.followerCount;
      },
      (error: any) => {
        console.error('Error fetching following count:', error);
      }
    );
  }

  getSafeUrl(image: File): SafeUrl {
    const objectURL = URL.createObjectURL(image);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }


  pictures: { filePath: string }[] = []; // Specify the type here
  
  //imageUrl = 'http://localhost:3000/uploads/pics/profiles';

  imageUrl = `${filesUrl}/uploads/pics/profiles`

  viewPictures() {
    this.ProfileService.getUploadedPictures().subscribe((data: { filePath: string }[]) => {
      this.pictures = data.map((item) => ({ filePath: `${this.imageUrl}/${item.filePath}` }) );
     //this.pictures = data.;
      console.log(this.pictures);
    });
    //localStorage.setItem('pic', item.filePath);
  }

  logout(){
    //clear localStorage data
    localStorage.clear();

    this.router.navigate(['/']);
  }

}
