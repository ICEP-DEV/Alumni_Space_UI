import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
    
      //components
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]),
  ]
})
export class AuthModule { }
