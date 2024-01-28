import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './components/home/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ServicesComponent } from './components/services/services.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AboutComponent } from './components/home/about/about.component';
import {SuccessComponent} from './components/success/success.component';
import {SuccessPasswordChangeComponent} from './components/auth/success-password-change/success-password-change.component';
import { RegisterComponent } from './components/register/register.component';
import { ApplyPageComponent } from './modules/alumni/jobs/apply-page/apply-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  //Home-module Components
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  
  
  //Alumni-module Components
  { path: 'alumni', loadChildren: () => import('./modules/alumni/alumni.module').then(m => m.AlumniModule) },

  //Admni-module Components
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  

  //auth
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },

  //Components
  { path: 'contacts', component: ContactsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  //
  { path: 'success', component: SuccessComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'success-password-change', component: SuccessPasswordChangeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'apply-page', component: ApplyPageComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
