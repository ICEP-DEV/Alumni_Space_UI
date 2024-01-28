import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PeopleYouMayKnowComponent } from './people-you-may-know/people-you-may-know.component';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserProfileInfoComponent } from './user-profile-info/user-profile-info.component';
import { UserStorysComponent } from './user-storys/user-storys.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';
import { YourThoughtsComponent } from './your-thoughts/your-thoughts.component';



@NgModule({
  declarations: [
    PeopleYouMayKnowComponent,
    UserLandingPageComponent,
    UserNavbarComponent,
    UserPostComponent,
    UserProfileInfoComponent,
    UserStorysComponent,
    WhoToFollowComponent,
    YourThoughtsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '',component: UserLandingPageComponent },
    ]),
  ]
})
export class LandingPageModule { }
