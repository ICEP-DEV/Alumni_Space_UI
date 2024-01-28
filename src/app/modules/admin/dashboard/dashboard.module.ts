import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//import components
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LastFewNotificationsComponent } from './last-few-notifications/last-few-notifications.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '',component: AdminHomeComponent },
      { path: 'notifications', component: LastFewNotificationsComponent},
    ]),
  ]
})
export class DashboardModule { }
