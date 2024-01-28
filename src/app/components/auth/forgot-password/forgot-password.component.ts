import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private router: Router) {}

  onForgot() {

    //pass the email
    localStorage.setItem('email',this.email.toString());
    this.router.navigate(['/reset-password']);
  }

}
