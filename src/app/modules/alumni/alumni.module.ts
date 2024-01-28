import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//import components
import { JobsComponent } from './jobs/jobs.component';
import { EventsComponent } from './events/events.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { JobDescriptionComponent } from './jobs/job-description/job-description.component';
import { ApplyPageComponent } from './jobs/apply-page/apply-page.component';
import { ChatComponent } from './chat/chat.component';
import { TractApplicationComponent } from './tract-application/tract-application.component';




@NgModule({
  declarations: [
    EventsComponent,
    NotificationsComponent,
    TractApplicationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
      { path: 'home', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
      { path: 'queries', loadChildren: () => import('./queries/queries.module').then(m => m.QueriesModule) },
      
      
    
      //components
      { path: 'jobs', component: JobsComponent },
      { path: 'events', component: EventsComponent},
      { path: 'notifications', component: NotificationsComponent},
      {path: 'job', component:JobDescriptionComponent},
      {path: 'apply-page', component:ApplyPageComponent},
      {path: 'chat', component:ChatComponent},
      {path: 'tract-application', component:TractApplicationComponent}
    ]),
  ]
})
export class AlumniModule { }
