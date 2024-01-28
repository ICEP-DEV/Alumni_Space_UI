import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//import components
import { ApplicationsComponent } from './applications/applications.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '',component: ApplicationsComponent },
    ]),
  ]
})
export class JobApplicationsModule { }
